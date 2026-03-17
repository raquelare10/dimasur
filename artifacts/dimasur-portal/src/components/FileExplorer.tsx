import { useState, useMemo } from "react";
import { useGetDriveStructure } from "@workspace/api-client-react";
import { Folder, FileText, ChevronRight, File, Download, Search, Image as ImageIcon, FileSpreadsheet, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
  section: string;
}

// Utility to find node by ID recursively (if nested API response)
const findNodeById = (nodes: any[], id: string): any | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

const getFileIcon = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(ext || '')) return <ImageIcon className="w-8 h-8 text-blue-400" />;
  if (['xls', 'xlsx', 'csv'].includes(ext || '')) return <FileSpreadsheet className="w-8 h-8 text-green-400" />;
  if (['pdf'].includes(ext || '')) return <FileText className="w-8 h-8 text-red-400" />;
  return <File className="w-8 h-8 text-muted-foreground" />;
};

export function FileExplorer({ section }: FileExplorerProps) {
  const { data: nodes = [], isLoading, error } = useGetDriveStructure({ seccion: section });
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const rootFolders = useMemo(() => nodes.filter(n => n.type === "folder"), [nodes]);
  
  const currentFolder = useMemo(() => {
    if (!selectedFolderId) return null;
    return findNodeById(nodes, selectedFolderId);
  }, [selectedFolderId, nodes]);

  const displayedChildren = useMemo(() => {
    const children = currentFolder?.children || [];
    if (!searchQuery) return children;
    return children.filter((c: any) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [currentFolder, searchQuery]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] glass-panel rounded-2xl flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="font-medium animate-pulse">Sincronizando con Google Drive...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 glass-panel rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Error de conexión</h3>
        <p className="text-muted-foreground max-w-md">No pudimos acceder a los archivos de esta sección. Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white/10 shadow-2xl shadow-black/50">
      
      {/* Left Sidebar - Folder Navigation */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            Categorías
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Selecciona una carpeta para ver su contenido.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {rootFolders.length === 0 ? (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No hay carpetas disponibles.
            </div>
          ) : (
            rootFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group text-left",
                  selectedFolderId === folder.id 
                    ? "bg-primary/20 text-primary border border-primary/30 shadow-inner" 
                    : "hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Folder className={cn("w-5 h-5 flex-shrink-0", selectedFolderId === folder.id ? "fill-primary/20" : "")} />
                  <span className="font-medium truncate">{folder.name}</span>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform", 
                  selectedFolderId === folder.id ? "text-primary translate-x-1" : "opacity-0 group-hover:opacity-100"
                )} />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col bg-background/30">
        {currentFolder ? (
          <>
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>Directorio</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary font-medium">{currentFolder.name}</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">{currentFolder.name}</h2>
              </div>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Buscar archivo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg bg-black/40 border border-white/10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/20 text-foreground"
                />
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {displayedChildren.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-60">
                  <File className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">Carpeta vacía</p>
                  <p className="text-sm text-muted-foreground">No se encontraron archivos en este directorio.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {displayedChildren.map((child: any, idx: number) => (
                      <motion.div
                        key={child.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group flex flex-col p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
                        onClick={() => {
                          if (child.type === 'folder') {
                            setSelectedFolderId(child.id);
                          } else if (child.url) {
                            window.open(child.url, '_blank');
                          }
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                            {child.type === 'folder' ? <Folder className="w-8 h-8 text-primary fill-primary/20" /> : getFileIcon(child.name)}
                          </div>
                          {child.type === 'file' && (
                            <a 
                              href={child.url} 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-md hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors opacity-0 group-hover:opacity-100 shadow-lg"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        
                        <h4 className="font-medium text-foreground truncate mb-1 pr-2" title={child.name}>
                          {child.name}
                        </h4>
                        <span className="text-xs text-muted-foreground capitalize">
                          {child.type === 'folder' ? 'Carpeta' : 'Documento'}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-transparent to-black/20">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
              <Folder className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">Selecciona una categoría</h3>
            <p className="text-muted-foreground max-w-md">
              Explora la estructura de carpetas en el panel izquierdo para ver los documentos y recursos disponibles en esta sección.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
