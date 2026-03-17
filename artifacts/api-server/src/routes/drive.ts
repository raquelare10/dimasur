import { Router, type IRouter } from "express";

const router: IRouter = Router();

const SECTION_DATA: Record<string, { id: string; name: string; type: "folder" | "file"; url?: string; children?: { id: string; name: string; type: "folder" | "file"; url?: string; children?: unknown[] }[] }[]> = {
  servicio: [
    {
      id: "serv-1",
      name: "Manuales de Servicio",
      type: "folder",
      children: [
        { id: "serv-1-1", name: "Manual General 2024.pdf", type: "file", url: "https://drive.google.com/file/d/example1", children: [] },
        { id: "serv-1-2", name: "Procedimientos de Taller.pdf", type: "file", url: "https://drive.google.com/file/d/example2", children: [] },
      ],
    },
    {
      id: "serv-2",
      name: "Órdenes de Trabajo",
      type: "folder",
      children: [
        { id: "serv-2-1", name: "OT Template.xlsx", type: "file", url: "https://drive.google.com/file/d/example3", children: [] },
      ],
    },
    {
      id: "serv-3",
      name: "Garantías",
      type: "folder",
      children: [
        { id: "serv-3-1", name: "Política de Garantías.pdf", type: "file", url: "https://drive.google.com/file/d/example4", children: [] },
      ],
    },
  ],
  refacciones: [
    {
      id: "ref-1",
      name: "Catálogos",
      type: "folder",
      children: [
        { id: "ref-1-1", name: "Catálogo General 2024.pdf", type: "file", url: "https://drive.google.com/file/d/example5", children: [] },
        { id: "ref-1-2", name: "Lista de Precios Q1.xlsx", type: "file", url: "https://drive.google.com/file/d/example6", children: [] },
      ],
    },
    {
      id: "ref-2",
      name: "Proveedores",
      type: "folder",
      children: [
        { id: "ref-2-1", name: "Directorio Proveedores.xlsx", type: "file", url: "https://drive.google.com/file/d/example7", children: [] },
      ],
    },
    {
      id: "ref-3",
      name: "Inventario",
      type: "folder",
      children: [
        { id: "ref-3-1", name: "Inventario Actual.xlsx", type: "file", url: "https://drive.google.com/file/d/example8", children: [] },
      ],
    },
  ],
  rh: [
    {
      id: "rh-1",
      name: "Políticas de Personal",
      type: "folder",
      children: [
        { id: "rh-1-1", name: "Reglamento Interno.pdf", type: "file", url: "https://drive.google.com/file/d/example9", children: [] },
        { id: "rh-1-2", name: "Código de Conducta.pdf", type: "file", url: "https://drive.google.com/file/d/example10", children: [] },
      ],
    },
    {
      id: "rh-2",
      name: "Nómina",
      type: "folder",
      children: [
        { id: "rh-2-1", name: "Proceso de Nómina.pdf", type: "file", url: "https://drive.google.com/file/d/example11", children: [] },
      ],
    },
    {
      id: "rh-3",
      name: "Capacitación",
      type: "folder",
      children: [
        { id: "rh-3-1", name: "Plan de Capacitación 2024.pdf", type: "file", url: "https://drive.google.com/file/d/example12", children: [] },
      ],
    },
  ],
  maquinaria: [
    {
      id: "maq-1",
      name: "Fichas Técnicas",
      type: "folder",
      children: [
        { id: "maq-1-1", name: "Ficha Técnica Excavadora.pdf", type: "file", url: "https://drive.google.com/file/d/example13", children: [] },
        { id: "maq-1-2", name: "Ficha Técnica Cargador.pdf", type: "file", url: "https://drive.google.com/file/d/example14", children: [] },
      ],
    },
    {
      id: "maq-2",
      name: "Mantenimiento Preventivo",
      type: "folder",
      children: [
        { id: "maq-2-1", name: "Programa de Mantenimiento.xlsx", type: "file", url: "https://drive.google.com/file/d/example15", children: [] },
      ],
    },
    {
      id: "maq-3",
      name: "Inventario de Equipos",
      type: "folder",
      children: [
        { id: "maq-3-1", name: "Inventario Equipos 2024.xlsx", type: "file", url: "https://drive.google.com/file/d/example16", children: [] },
      ],
    },
  ],
  administracion: [
    {
      id: "adm-1",
      name: "Contabilidad",
      type: "folder",
      children: [
        { id: "adm-1-1", name: "Balance General.xlsx", type: "file", url: "https://drive.google.com/file/d/example17", children: [] },
        { id: "adm-1-2", name: "Estado de Resultados.xlsx", type: "file", url: "https://drive.google.com/file/d/example18", children: [] },
      ],
    },
    {
      id: "adm-2",
      name: "Contratos",
      type: "folder",
      children: [
        { id: "adm-2-1", name: "Contratos Vigentes.pdf", type: "file", url: "https://drive.google.com/file/d/example19", children: [] },
      ],
    },
    {
      id: "adm-3",
      name: "Reportes Gerenciales",
      type: "folder",
      children: [
        { id: "adm-3-1", name: "Reporte Mensual.pdf", type: "file", url: "https://drive.google.com/file/d/example20", children: [] },
      ],
    },
  ],
};

router.get("/", (req, res) => {
  const { seccion } = req.query as { seccion?: string };

  if (!seccion) {
    res.status(400).json({ error: "Se requiere el parámetro seccion" });
    return;
  }

  const data = SECTION_DATA[seccion.toLowerCase()];

  if (!data) {
    res.json([]);
    return;
  }

  res.json(data);
});

export default router;
