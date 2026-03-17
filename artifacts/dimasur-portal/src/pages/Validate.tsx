import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useValidateMagicLink } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { TechBackground } from "@/components/TechBackground";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Validate() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  const { isSuccess, isError, error } = useValidateMagicLink(
    { token: token as string },
    { query: { enabled: !!token, retry: false } }
  );

  useEffect(() => {
    if (isSuccess) {
      // Invalidate getMe query so auth guard picks up the new session
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      
      // Delay redirect slightly for visual feedback
      const timer = setTimeout(() => {
        setLocation("/portal");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, queryClient, setLocation]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative p-4">
      <TechBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 md:p-12 rounded-3xl max-w-sm w-full text-center shadow-2xl"
      >
        {!isSuccess && !isError && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Autenticando...</h2>
            <p className="text-sm text-muted-foreground">Verificando tu enlace seguro</p>
          </div>
        )}

        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">¡Sesión verificada!</h2>
            <p className="text-sm text-muted-foreground">Redirigiendo al portal...</p>
          </motion.div>
        )}

        {isError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Enlace inválido</h2>
            <p className="text-sm text-muted-foreground mb-6">
              El enlace ha expirado o ya fue utilizado.
            </p>
            <button 
              onClick={() => setLocation("/")}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-foreground font-medium transition-colors"
            >
              Volver a intentar
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
