import { Link } from "wouter";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { Header } from "@/components/Header";
import { TechBackground } from "@/components/TechBackground";
import { motion } from "framer-motion";
import { Wrench, Package, Users, Cog, Building2 } from "lucide-react";

const DEPARTMENTS = [
  { id: "servicio", name: "Servicio", icon: Wrench, color: "text-blue-400", bg: "bg-blue-400/10", border: "hover:border-blue-400/50" },
  { id: "refacciones", name: "Refacciones", icon: Package, color: "text-amber-400", bg: "bg-amber-400/10", border: "hover:border-amber-400/50" },
  { id: "rh", name: "Recursos Humanos", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", border: "hover:border-purple-400/50" },
  { id: "maquinaria", name: "Maquinaria", icon: Cog, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "hover:border-emerald-400/50" },
  { id: "administracion", name: "Administración", icon: Building2, color: "text-rose-400", bg: "bg-rose-400/10", border: "hover:border-rose-400/50" },
];

export default function Dashboard() {
  const { user } = useAuthGuard(true);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (!user) return null; // Wait for guard

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <TechBackground />
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 z-10">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            Bienvenido, <span className="text-primary">{user.email.split('@')[0]}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Selecciona un departamento para acceder a sus documentos y herramientas operativas.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div key={dept.id} variants={item}>
                <Link 
                  href={`/portal/${dept.id}`}
                  className={`block h-full group glass-panel rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${dept.border}`}
                >
                  <div className={`w-16 h-16 rounded-2xl ${dept.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${dept.color}`} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{dept.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors mt-8">
                    <span className="font-medium">Acceder al área</span>
                    <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
