import { useState, useMemo } from "react";
import { useGetDriveStructure } from "@workspace/api-client-react";
import { Folder, FileText, ChevronRight, File, ExternalLink, Search, Image as ImageIcon, FileSpreadsheet, Loader2, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
  section: string;
}

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
  const ext = name.split(".").pop()?.toLowerCase();
  if (["png", "jpg", "jpeg", "svg", "gif"].includes(ext || "")) return <ImageIcon className="w-7 h-7 text-blue-400" />;
  if (["xls", "xlsx", "csv"].includes(ext || "")) return <FileSpreadsheet className="w-7 h-7 text-green-400" />;
  if (["pdf"].includes(ext || "")) return <FileText className="w-7 h-7 text-red-400" />;
  return <File className="w-7 h-7 text-muted-foreground" />;
};

export function FileExplorer({ section }: FileExplorerProps) {
  const { data: nodes = [], isLoading, error } = useGetDriveStructure({ seccion: section });
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const rootFolders = useMemo(() => nodes.filter((n) => n.type === "folder"), [nodes]);

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
        <p className="text-muted-foreground max-w-md">No pudimos acceder a los archivos. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Explorer Panel */}
      <div className="w-full glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white/10 shadow-2xl shadow-black/50">

        {/* Left Sidebar */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 flex flex-col">
          <div className="p-5 border-b border-white/10">
            <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <Folder className="w-5 h-5 text-primary" />
              Categorías
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {rootFolders.length === 0 ? (
              <div className="text-center p-4 text-sm text-muted-foreground">No hay carpetas disponibles.</div>
            ) : (
              rootFolders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => { setSelectedFolderId(folder.id); setPreviewFile(null); setSearchQuery(""); }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group text-left",
                    selectedFolderId === folder.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Folder className={cn("w-4 h-4 flex-shrink-0", selectedFolderId === folder.id ? "fill-primary/20" : "")} />
                    <span className="font-medium truncate text-sm">{folder.name}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform flex-shrink-0", selectedFolderId === folder.id ? "text-primary" : "opacity-0 group-hover:opacity-50")} />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col bg-background/30 min-w-0">
          {currentFolder ? (
            <>
              {/* Folder header */}
              <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span>Directorio</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary font-medium">{currentFolder.name}</span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground">{currentFolder.name}</h2>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-52 pl-9 pr-4 py-2 rounded-lg bg-black/40 border border-white/10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/20 text-foreground"
                  />
                </div>
              </div>

              {/* Content area — split when preview is active */}
              <div className="flex-1 flex overflow-hidden min-h-0">
                {/* File grid */}
                <div className={cn("overflow-y-auto p-5 transition-all", previewFile ? "w-72 border-r border-white/10 flex-shrink-0" : "flex-1")}>
                  {displayedChildren.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                      <File className="w-12 h-12 text-muted-foreground mb-3" />
                      <p className="font-medium text-foreground">Carpeta vacía</p>
                    </div>
                  ) : (
                    <div className={cn("grid gap-3", previewFile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                      <AnimatePresence>
                        {displayedChildren.map((child: any, idx: number) => (
                          <motion.div
                            key={child.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className={cn(
                              "group flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                              previewFile?.url === child.url
                                ? "bg-primary/15 border-primary/40 text-primary"
                                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 text-foreground"
                            )}
                            onClick={() => {
                              if (child.type === "folder") {
                                setSelectedFolderId(child.id);
                                setPreviewFile(null);
                              } else if (child.url) {
                                setPreviewFile({ name: child.name, url: child.url });
                              }
                            }}
                          >
                            <div className="flex-shrink-0">
                              {child.type === "folder"
                                ? <Folder className="w-6 h-6 text-primary fill-primary/20" />
                                : getFileIcon(child.name)
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{child.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{child.type === "folder" ? "Carpeta" : "Documento"}</p>
                            </div>
                            {child.type === "file" && (
                              <Eye className="w-4 h-4 opacity-0 group-hover:opacity-60 flex-shrink-0 transition-opacity" />
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Inline preview panel */}
                <AnimatePresence>
                  {previewFile && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex-1 flex flex-col min-w-0 bg-black/30"
                    >
                      {/* Preview toolbar */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 gap-3">
                        <p className="text-sm font-medium text-foreground truncate flex-1">{previewFile.name}</p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <a
                            href={previewFile.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-primary/30 text-xs font-medium text-foreground transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Abrir en Drive
                          </a>
                          <button
                            onClick={() => setPreviewFile(null)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {/* iframe */}
                      <div className="flex-1 relative">
                        <iframe
                          key={previewFile.url}
                          src={previewFile.url}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="fullscreen"
                          title={previewFile.name}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5 border border-white/10">
                <Folder className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Selecciona una categoría</h3>
              <p className="text-muted-foreground max-w-sm text-sm">
                Elige una carpeta del panel izquierdo para ver los documentos disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
