import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Smartphone, Building2, CreditCard, Search, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const cuentasBancarias = [
  {
    nombre: "Acayucan",
    cuentas: [
      { banco: "Santander", cuenta: "65502435282", clabe: "014905655024352827", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["aguirrecitlalli@dimasur.com.mx"],
    telefono: "",
    celular: "",
    direccion: "Carretera Costera del Golfo Km. 22.4 S/N, Col. Francisco Villa. Acayucan, Ver. C.P. 96020",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.2553914537766!2d-94.92163052629509!3d17.96685118585661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ea02c157e710eb%3A0x8b3780129d706f0!2sDIMASUR%20Acayucan%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791018959!5m2!1ses-419!2smx",
  },
  {
    nombre: "Campeche",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141628", clabe: "012905001841416288", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["laturneria13@hotmail.com", "laturneriaaremi@dimasur.com.mx"],
    telefono: "(981) 815 1056",
    celular: "981 750 3873",
    direccion: "Av. Heroe de Nacozari No. 258 Col. Sector Las Flores C.P. 24097",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.3954776813007!2d-90.51204752624102!3d19.823212628093458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f8316c7d2ca475%3A0x782944b21ad7a44e!2sDIMASUR%20Campeche%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791163868!5m2!1ses-419!2smx",
  },
  {
    nombre: "Cancún",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141474", clabe: "012905001841414743", moneda: "MXN" },
      { banco: "BBVA", cuenta: "0192752492", clabe: "0126905001927524926", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["lopezmarco@dimasur.com.mx"],
    telefono: "",
    celular: "",
    direccion: "Carr. Cancún Chetumal Km. 328 Mz.1 Lte.1 Sm. 29 Parque Industrial, Puerto Morelos Q. Roo C.P. 77580",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.0166871649535!2d-86.8789192262066!3d20.911648291793448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e87a4a34f135f%3A0x153ab323cb47a2d1!2sDIMASUR%20Canc%C3%BAn%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791231404!5m2!1ses-419!2smx",
  },
  {
    nombre: "Chetumal",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141377", clabe: "012905001841413773", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Avenida Insurgentes # 74 Othón P. Blanco C.P.77029",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2432819191627!2d-88.34431662627966!3d18.51790516925854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5bbb5fb6ad0001%3A0x6d3c588558bf6763!2sDIMASUR%20Chetumal%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791331933!5m2!1ses-419!2smx",
  },
  {
    nombre: "Comitán",
    cuentas: [
      { banco: "BBVA", cuenta: "0119012664", clabe: "012905001190126643", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Calle Aldama #21, Col. Miguel Aleman. Comitan de Domínguez, Chiapas C.P. 30090",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15323.401471668572!2d-92.14904151720337!3d16.2281305058627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858d3f45def7adc3%3A0x57f431cdd3672dc0!2sDimasur%20Comit%C3%A1n%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791372868!5m2!1ses-419!2smx",
  },
  {
    nombre: "Isla",
    cuentas: [
      { banco: "Banamex", cuenta: "5278277", clabe: "002905700052782779", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Prolongación Raul Sandoval #1301 Col. Isla, Centro. Isla, Veracruz C.P. 95640",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.74076130335!2d-95.53229932629314!3d18.037230683762637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ea02e78df14365%3A0x79f92a6c3e08ca2d!2sDIMASUR%20Isla%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791408419!5m2!1ses-419!2smx",
  },
  {
    nombre: "Mérida",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141539", clabe: "012905001841415399", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR SA DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["lopezjosemaria@dimasur.com.mx"],
    telefono: "",
    celular: "",
    direccion: "Calle 21 No. 416 Int. 3, Col. Cd. Industrial, Mérida, Yuc. C.P. 97288",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.527881296461!2d-89.67799342620596!3d20.931305891121408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56772a73c725cd%3A0x7498630b30b6836a!2sDIMASUR%20M%C3%A9rida%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791453469!5m2!1ses-419!2smx",
  },
  {
    nombre: "Puebla",
    cuentas: [
      { banco: "Santander", cuenta: "65510548643", clabe: "014905655105486434", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["mendezblanca@dimasur.com.mx"],
    telefono: "",
    celular: "",
    direccion: "Aut Puebla Orizaba KM 14.5, Chachapa, 72990 Parque Industrial Chachapa, Pue.",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9865684496494!2d-98.10300032626385!3d19.06432815234174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfeb0000214b01%3A0xc38d2f02267e65e1!2sDIMASUR%20Puebla%20(Distribuidor%20de%20Maquinaria%20del%20Sur!5e0!3m2!1ses-419!2smx!4v1766791501630!5m2!1ses-419!2smx",
  },
  {
    nombre: "Tapachula",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141911", clabe: "012905001841419117", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Carretera Costera Km. 244.5 S/N, Col. Tapachula, Centro Tapachula, Chiapas C.P. 30700",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3855.3336201362877!2d-92.27338472637096!3d14.918495069217656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858e0f2faeae983f%3A0x86a307e87e6127a7!2sDIMASUR%20Tapachula%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791530684!5m2!1ses-419!2smx",
  },
  {
    nombre: "Tierra Blanca",
    cuentas: [
      { banco: "BBVA", cuenta: "0186570836", clabe: "012905001865708367", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["ruizethel@dimasur.com.mx"],
    telefono: "",
    celular: "",
    direccion: "Prolongación Landero y Coss S/N Col. Hoja de Maiz, Tierra Blanca, Veracruz, C.P.95110",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5777752416716!2d-96.35707382628135!3d18.457470171101598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c3895dccc7f931%3A0x39613b31995b1ce9!2sDIMASUR%20Tierra%20Blanca%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791566356!5m2!1ses-419!2smx",
  },
  {
    nombre: "Tizimín",
    cuentas: [
      { banco: "BBVA", cuenta: "0191925156", clabe: "012905001919251566", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["camarajesus@dimasur.com.mx"],
    telefono: "",
    celular: "986 863 7203",
    direccion: "Calle Centro 50 No. 372, Centro, Tizimín, Yuc. C.P. 97700",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1498505755835!2d-88.15362932619892!3d21.146433983729302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f522b3c54a8a7a7%3A0x741aa3ae05c9eb72!2sDIMASUR%20Tizim%C3%ADn%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791614500!5m2!1ses-419!2smx",
  },
  {
    nombre: "Tuxtepec",
    cuentas: [
      { banco: "BBVA", cuenta: "0111636804", clabe: "012905001116368045", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["solisrolando@dimasur.com.mx"],
    telefono: "287 875 7647",
    celular: "951 226 1544",
    direccion: "Carretera Federal Tuxtepec-Ciudad Alemán, km 03 s/n Col. Víctor Bravo Ahuja, Tuxtepec Oaxaca C.P. 68376",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.487881053334!2d-96.13134462629155!3d18.09524758203085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c3e65f086dd921%3A0x6e2ff2d16e6a9c74!2sDIMASUR%20Tuxtepec%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791644155!5m2!1ses-419!2smx",
  },
  {
    nombre: "Tuxtla Gtz",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141709", clabe: "012905001841417096", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: ["lopezevelyn@dimasur.com.mx"],
    telefono: "",
    celular: "229 418 6420",
    direccion: "Libramiento Sur Oriente # 2642 Col. Rivera Cerro Hueco, Tuxtla Gutierrez, Chiapas. C.P. 29094",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.8720498457724!2d-93.09662002632774!3d16.733234821323144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ed273d474afdbd%3A0xc112a91d982098d!2sDimasur%20Tuxtla%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791682909!5m2!1ses-419!2smx",
  },
  {
    nombre: "Veracruz",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141792", clabe: "012905001841417928", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Carr. Fed. 140 Veracruz-Xalapa No. 7049 Col. Las Amapolas, Veracruz, Ver. C.P.91697",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.778054761591!2d-96.20604552626098!3d19.161190149295475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c34371834ad691%3A0xcea13531a0468e97!2sDIMASUR%20Veracruz%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791718652!5m2!1ses-419!2smx",
  },
  {
    nombre: "Villahermosa",
    cuentas: [
      { banco: "BBVA", cuenta: "0184141644", clabe: "012905001841416440", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Carretera Villahermosa-Cárdenas Km8+100 S/N. Col. Lázaro Cárdenas, CP.86280, Centro, Tabasco",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.878757983511!2d-93.0122781262946!3d17.98437688533595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ee77d8a47c39f7%3A0xac86f61fa31aa2e2!2sDimasur%20Villahermosa!5e0!3m2!1ses-419!2smx!4v1766791754299!5m2!1ses-419!2smx",
  },
  {
    nombre: "Zapata",
    cuentas: [
      { banco: "BBVA", cuenta: "0191794663", clabe: "", moneda: "MXN" },
      { banco: "", cuenta: "", clabe: "", moneda: "USD" },
    ],
    razonSocial: "DISTRIBUIDOR DE MAQUINARIA DEL SUR S.A DE CV",
    rfc: "DMS000928DF8",
    notificarPago: [],
    telefono: "",
    celular: "",
    direccion: "Carr. Emiliano Zapata Villahermosa km 6.5, Tierra y Libertad, 86994 Emiliano Zapata, Tab.",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.0725420494878!2d-91.78446352630127!3d17.74122079251844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f3cb906759a82b%3A0x269bf04c0d2daa32!2sDIMASUR%20Zapata%20(Distribuidor%20de%20Maquinaria%20del%20Sur)!5e0!3m2!1ses-419!2smx!4v1766791804036!5m2!1ses-419!2smx",
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="ml-1 p-0.5 rounded hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors"
      title="Copiar"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CuentasBancarias({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(cuentasBancarias[0]);

  const filtered = cuentasBancarias.filter((s) =>
    s.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-stretch justify-stretch bg-black/70 backdrop-blur-sm p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-6xl mx-auto rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-foreground">Cuentas Bancarias</h2>
                  <p className="text-xs text-muted-foreground">Distribuidoras Dimasur por sucursal</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden min-h-0">
              {/* Sidebar — sucursales */}
              <div className="w-52 border-r border-white/10 bg-black/20 flex flex-col flex-shrink-0">
                <div className="p-3 border-b border-white/10">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-foreground placeholder:text-white/20 focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                  {filtered.map((s) => (
                    <button
                      key={s.nombre}
                      onClick={() => setSelected(s)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all",
                        selected.nombre === s.nombre
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
                      )}
                    >
                      {s.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail panel */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 min-w-0">
                {/* Sucursal title */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">{selected.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{selected.razonSocial}</p>
                  <p className="text-xs text-primary/70 font-mono mt-0.5">RFC: {selected.rfc}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Left column */}
                  <div className="space-y-4">
                    {/* Cuentas */}
                    {selected.cuentas.filter(c => c.banco).map((c, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-foreground text-base">{c.banco}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-semibold",
                            c.moneda === "USD" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-primary/20 text-primary border border-primary/30"
                          )}>{c.moneda}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          {c.cuenta && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">No. Cuenta</span>
                              <div className="flex items-center font-mono text-foreground">
                                {c.cuenta}
                                <CopyButton value={c.cuenta} />
                              </div>
                            </div>
                          )}
                          {c.clabe && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">CLABE</span>
                              <div className="flex items-center font-mono text-foreground text-xs">
                                {c.clabe}
                                <CopyButton value={c.clabe} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Contact info */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Building2 className="w-4 h-4 text-primary" /> Información de contacto
                      </h4>
                      {selected.direccion && (
                        <div className="flex gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{selected.direccion}</span>
                        </div>
                      )}
                      {selected.telefono && (
                        <div className="flex gap-2 text-sm">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{selected.telefono}</span>
                        </div>
                      )}
                      {selected.celular && (
                        <div className="flex gap-2 text-sm">
                          <Smartphone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{selected.celular}</span>
                        </div>
                      )}
                      {selected.notificarPago.filter(Boolean).length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/5">
                          <p className="text-xs text-muted-foreground mb-1">Notificar pago a:</p>
                          {selected.notificarPago.filter(Boolean).map((email) => (
                            <p key={email} className="text-xs text-primary/80 font-mono">{email}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right column — Map */}
                  <div className="rounded-xl border border-white/10 overflow-hidden h-72 lg:h-auto min-h-[280px]">
                    <iframe
                      key={selected.nombre}
                      src={selected.mapsUrl}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa ${selected.nombre}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
