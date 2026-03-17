import { Router, type IRouter } from "express";

const router: IRouter = Router();

const SESSION_DAYS = 7;
const SESSION_SECRET = process.env["MAGIC_LINK_SECRET"] || "dimasur-dev-secret-2024";

function signSession(email: string): string {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 })).toString("base64url");
  return payload;
}

function verifySession(token: string): { email: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64url").toString("utf-8")) as { email: string; exp: number };
    if (decoded.exp < Date.now()) return null;
    return { email: decoded.email };
  } catch {
    return null;
  }
}

router.post("/send-magic-link", (req, res) => {
  const { email } = req.body as { email?: string };

  if (!email) {
    res.status(400).json({ error: "Email requerido" });
    return;
  }

  const sessionToken = signSession(email);

  res.setHeader(
    "Set-Cookie",
    `auth_token=${sessionToken}; Max-Age=${SESSION_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax; HttpOnly`
  );

  res.json({ ok: true });
});

router.get("/validate", (req, res) => {
  res.json({ ok: true });
});

router.get("/me", (req, res) => {
  const cookies = req.headers.cookie || "";
  const tokenMatch = cookies.match(/auth_token=([^;]+)/);

  if (!tokenMatch) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  const payload = verifySession(tokenMatch[1]);
  if (!payload) {
    res.status(401).json({ error: "Sesión expirada" });
    return;
  }

  res.json({ email: payload.email, authenticated: true });
});

router.post("/logout", (_req, res) => {
  res.setHeader(
    "Set-Cookie",
    "auth_token=; Max-Age=0; Path=/; SameSite=Lax; HttpOnly"
  );
  res.json({ ok: true });
});

export default router;
