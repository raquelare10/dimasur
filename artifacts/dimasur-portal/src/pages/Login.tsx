import { useState } from "react";
import { useLocation } from "wouter";
import { useSendMagicLink } from "@workspace/api-client-react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { TechBackground } from "@/components/TechBackground";
import { Mail, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  
  // Will redirect if already authenticated
  useAuthGuard(false);

  const { mutateAsync: sendMagicLink, isPending, isSuccess } = useSendMagicLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    const fullEmail = `${username.trim()}@dimasur.com.mx`;
    try {
      await sendMagicLink({ data: { email: fullEmail } });
      setSubmittedEmail(fullEmail);
    } catch (error) {
      console.error("Failed to send magic link", error);
      // Let Tanstack Query handle toast via generic error handler if configured, 
      // otherwise user will be able to retry.
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      <TechBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden">
          {/* Decorative glow inside card */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="mb-8 text-center relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_hsla(152,85%,40%,0.3)] mb-6">
              <span className="text-3xl font-display font-bold text-primary-foreground">D</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground tracking-tight mb-2">Portal Dimasur</h1>
            <p className="text-muted-foreground text-sm">Acceso seguro para colaboradores</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1" htmlFor="username">
                  Usuario
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ej. juan.perez"
                    className="w-full pl-11 pr-[140px] py-4 bg-black/40 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-sm text-muted-foreground font-medium select-none">
                      @dimasur.com.mx
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending || !username.trim()}
                className="w-full relative overflow-hidden group px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_0_20px_hsla(152,85%,40%,0.3)] hover:shadow-[0_0_30px_hsla(152,85%,40%,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando enlace...
                    </>
                  ) : (
                    <>
                      Enviar enlace seguro
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
                <ShieldCheck className="w-4 h-4 text-primary/70" />
                <span>Autenticación sin contraseña</span>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4 relative z-10"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">Revisa tu correo</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Hemos enviado un enlace de acceso seguro a <br/>
                <strong className="text-foreground">{submittedEmail}</strong>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-6 pt-6 border-t border-white/5">
                Haz clic en el enlace del correo para iniciar sesión automáticamente. Puedes cerrar esta pestaña.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <div className="fixed bottom-6 text-center w-full text-xs text-muted-foreground font-medium tracking-wide">
        &copy; {new Date().getFullYear()} DIMASUR. Todos los derechos reservados.
      </div>
    </div>
  );
}
