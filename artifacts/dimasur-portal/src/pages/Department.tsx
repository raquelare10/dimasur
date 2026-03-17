import { useParams, Link } from "wouter";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { Header } from "@/components/Header";
import { TechBackground } from "@/components/TechBackground";
import { FileExplorer } from "@/components/FileExplorer";
import { motion } from "framer-motion";
import { Wrench, Package, Users, Cog, Building2, ArrowLeft } from "lucide-react";

const DEPT_CONFIG: Record<string, { title: string, icon: any }> = {
  "servicio": { title: "Servicio", icon: Wrench },
  "refacciones": { title: "Refacciones", icon: Package },
  "rh": { title: "Recursos Humanos", icon: Users },
  "maquinaria": { title: "Maquinaria", icon: Cog },
  "administracion": { title: "Administración", icon: Building2 },
};

export default function Department() {
  useAuthGuard(true);
  const params = useParams<{ section: string }>();
  const sectionId = params.section || "";
  
  const config = DEPT_CONFIG[sectionId];
  
  // If invalid section, show 404-like state
  if (!config) {
    return (
      <div className="min-h-screen w-full relative flex flex-col">
        <TechBackground />
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center z-10 text-center px-4">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Departamento no encontrado</h1>
          <Link href="/portal" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <TechBackground />
      <Header />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 z-10 flex flex-col">
        
        {/* Breadcrumb & Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <Link 
              href="/portal" 
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Dashboard
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                  {config.title}
                </h1>
                <p className="text-muted-foreground mt-1">Gestor de documentos y archivos compartidos</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* File Explorer Region */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <FileExplorer section={sectionId} />
        </motion.div>
        
      </main>
    </div>
  );
}
