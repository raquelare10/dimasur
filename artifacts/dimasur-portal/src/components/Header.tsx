import { Link } from "wouter";
import { useAppLogout } from "@/hooks/use-auth-guard";
import { LogOut, Home, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const { handleLogout, isPending } = useAppLogout();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <Link href="/portal" className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
              <span className="font-display font-bold text-xl text-primary-foreground tracking-tighter">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight leading-none text-foreground">DIMASUR</span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-medium">Portal Corporativo</span>
            </div>
          </Link>
        </div>

        {/* Center Title (hidden on small screens) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground">
            Sistema de Acceso Departamental
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/portal" 
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          
          <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
          
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive border border-white/5 hover:border-destructive/20 transition-all duration-300 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
