import { Router, type IRouter } from "express";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const router: IRouter = Router();

const MAGIC_LINK_MINUTES = 20;
const SESSION_DAYS = 7;

function getResend() {
  const key = process.env["RESEND_API_KEY"];
  if (!key) throw new Error("RESEND_API_KEY not set");
  return new Resend(key);
}

function getMagicLinkSecret() {
  const secret = process.env["MAGIC_LINK_SECRET"];
  if (!secret) throw new Error("MAGIC_LINK_SECRET not set");
  return secret;
}

function getBaseUrl(req: { headers: { host?: string } }) {
  const host = req.headers.host || "localhost";
  const protocol = process.env["NODE_ENV"] === "production" ? "https" : "https";
  return process.env["BASE_URL"] || `${protocol}://${host}`;
}

router.post("/send-magic-link", async (req, res) => {
  try {
    const { email } = req.body as { email?: string };

    if (!email || !email.endsWith("@dimasur.com.mx")) {
      res.status(400).json({ error: "Dominio no permitido" });
      return;
    }

    const token = jwt.sign({ email }, getMagicLinkSecret(), {
      expiresIn: `${MAGIC_LINK_MINUTES}m`,
    });

    const magicLink = `${getBaseUrl(req)}/validate?token=${token}`;

    const resend = getResend();
    await resend.emails.send({
      from: "Portal Dimasur <portalrefacciones@dimasur.com.mx>",
      to: email,
      subject: "Acceso al portal Dimasur",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a5c2a;">Portal Corporativo Dimasur</h2>
          <p>Tu enlace de acceso está listo:</p>
          <a href="${magicLink}" style="display: inline-block; background-color: #1a5c2a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
            Acceder al portal
          </a>
          <p style="color: #666; font-size: 14px;">Este enlace expira en ${MAGIC_LINK_MINUTES} minutos.</p>
          <p style="color: #666; font-size: 12px;">Si no solicitaste este acceso, ignora este correo.</p>
        </div>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("send-magic-link error:", err);
    res.status(500).json({ error: "Error al enviar el enlace" });
  }
});

router.get("/validate", (req, res) => {
  const { token } = req.query as { token?: string };

  if (!token) {
    res.status(400).json({ error: "Token faltante" });
    return;
  }

  try {
    const payload = jwt.verify(token, getMagicLinkSecret()) as { email: string };

    res.setHeader(
      "Set-Cookie",
      `auth_token=${token}; Max-Age=${SESSION_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax; HttpOnly`
    );

    res.json({ ok: true, email: payload.email });
  } catch {
    res.status(401).json({ error: "Token expirado o inválido" });
  }
});

router.get("/me", (req, res) => {
  const cookies = req.headers.cookie || "";
  const tokenMatch = cookies.match(/auth_token=([^;]+)/);

  if (!tokenMatch) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  try {
    const payload = jwt.verify(tokenMatch[1], getMagicLinkSecret()) as { email: string };
    res.json({ email: payload.email, authenticated: true });
  } catch {
    res.status(401).json({ error: "Sesión expirada" });
  }
});

router.post("/logout", (_req, res) => {
  res.setHeader(
    "Set-Cookie",
    "auth_token=; Max-Age=0; Path=/; SameSite=Lax; HttpOnly"
  );
  res.json({ ok: true });
});

export default router;
