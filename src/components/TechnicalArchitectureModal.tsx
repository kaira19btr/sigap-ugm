import React, { useState } from 'react';
import {
  X,
  Server,
  Database,
  Lock,
  Layers,
  Cpu,
  Radio,
  Share2,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  Workflow,
  CheckCircle2,
  FileCode,
  HardDrive,
  Globe,
  Smartphone,
  MessageSquare,
} from 'lucide-react';

interface TechnicalArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalArchitectureModal: React.FC<TechnicalArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'ingestion' | 'gateway' | 'engine' | 'storage' | 'egress'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Arsitektur Sistem Terintegrasi
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Decoupled &amp; Microservices v2.4
                </span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                Diagram Arsitektur Teknis &amp; Multi-Agency API Gateway
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Topologi aliran data, lapisan keamanan kriptografi AES-256 GCM, dan pemisahan Rules Engine dari Data Lake
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Layer Pills */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1">
            Sorot Lapisan:
          </span>
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayer === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Semua Lapisan (Full Stack)
          </button>
          <button
            onClick={() => setActiveLayer('ingestion')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayer === 'ingestion'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            1. Ingestion &amp; Edge Sensors
          </button>
          <button
            onClick={() => setActiveLayer('gateway')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayer === 'gateway'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            2. API Gateway &amp; Auth (PDP)
          </button>
          <button
            onClick={() => setActiveLayer('engine')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayer === 'engine'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            3. Core Rules Engine &amp; AI
          </button>
          <button
            onClick={() => setActiveLayer('storage')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayer === 'storage'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            4. Encrypted Data Lake &amp; DB
          </button>
          <button
            onClick={() => setActiveLayer('egress')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayer === 'egress'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            5. Egress &amp; Penyaluran Kilat
          </button>
        </div>

        {/* Modal Body Architecture Canvas */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Penyelarasan Esai Akademik (Bagian 4.1) Banner */}
          <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/60 border border-blue-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                <Workflow className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Penyelarasan Esai Akademik (Bagian 4.1): SIGAP Data &amp; Trigger Engine</span>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                    6 Lapisan Proses
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  6 Lapisan Konseptual Kebijakan esai (<em>Data Layer &rarr; Risk Engine &rarr; Trigger Engine &rarr; Intervention Matching &rarr; Program Layer &rarr; Outcome Monitoring</em>) diimplementasikan secara teknis ke dalam 5 lapisan decoupled arsitektur SPBE berikut.
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Visual Grid */}
          <div className="space-y-4">
            {/* LAYER 1: Ingestion & Telemetry Sources */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                activeLayer === 'all' || activeLayer === 'ingestion'
                  ? 'bg-blue-50/70 border-blue-200 ring-2 ring-blue-500/20'
                  : 'bg-slate-50/50 border-slate-200 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      Ingestion &amp; Edge Sensors (Telemetri Lapangan)
                    </h4>
                    <span className="text-[11px] font-bold text-blue-700 block">
                      Mengimplementasikan: Data Layer
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded">
                  HTTP/2 • MQTT • Offline-First Sync
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-slate-900">BMKG &amp; PVMBG</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Telemetri curah hujan (AWS/GSM), radar cuaca Doppler &amp; sensor seismograf real-time
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-xs text-slate-900">BPS PIHPS &amp; SP2KP</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Streaming harga 10 komoditas pangan pokok harian &amp; anomali lonjakan inflasi pasar
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-xs text-slate-900">Aplikasi Tagana PWA</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Input offline petugas lapangan (IndexedDB + ServiceWorker background sync)
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs text-slate-900">WhatsApp Webhook</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Laporan warga dua arah, pengaduan anomali &amp; survei kepuasan 360°
                  </p>
                </div>
              </div>
            </div>

            {/* Connecting Flow Arrow */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold border border-slate-200">
                <span>TLS 1.3 Ingress</span>
                <ArrowRight className="w-3 h-3 text-blue-600" />
              </div>
            </div>

            {/* LAYER 2: API Gateway & PDP Security */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                activeLayer === 'all' || activeLayer === 'gateway'
                  ? 'bg-indigo-50/70 border-indigo-200 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50/50 border-slate-200 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      API Gateway &amp; Auth (PDP) — UU PDP No. 27/2022
                    </h4>
                    <span className="text-[11px] font-medium text-indigo-700 block">
                      Lapisan keamanan &amp; interoperabilitas lintas lapisan
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-mono font-bold px-2 py-0.5 rounded">
                  Rate Limiting • JWT RBAC • Anonymizer
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-xs text-slate-900">Enkripsi AES-256 GCM</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Kriptografi simetris standar tinggi untuk melindungi NIK dan identitas personal subjek data
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-slate-900">RBAC &amp; Consent Manager</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Kontrol izin kementerian (Kemensos, BNPB, BPS, Pemda) dengan validasi role berlapis
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <FileCode className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-xs text-slate-900">Immutable Audit Trail</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Setiap request dicatat ke log permanen bertanda tangan SHA-256 untuk audit BPKP/Kemenkominfo
                  </p>
                </div>
              </div>
            </div>

            {/* Connecting Flow Arrow */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold border border-slate-200">
                <span>gRPC Inter-Service Bus</span>
                <ArrowRight className="w-3 h-3 text-indigo-600" />
              </div>
            </div>

            {/* LAYER 3 & 4: Core Parametric Rules Engine & Data Lake */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Rules Engine */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  activeLayer === 'all' || activeLayer === 'engine'
                    ? 'bg-amber-50/70 border-amber-200 ring-2 ring-amber-500/20'
                    : 'bg-slate-50/50 border-slate-200 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      03
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Core Rules Engine &amp; AI (Decoupled Parametric Engine)
                      </h4>
                      <span className="text-[11px] font-bold text-amber-800 block">
                        Mengimplementasikan: Risk Engine + Trigger Engine + Intervention Matching
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded shrink-0">
                    Stateless Engine
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Engine evaluasi 7 parameter risiko independen (Skala 105 Poin) yang dipisahkan dari layer penyimpanan agar dapat diskalakan horizontal tanpa membebani database operasional.
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200 text-[11px] space-y-1 font-mono text-slate-700">
                  <div className="flex justify-between">
                    <span>Threshold Trigger:</span>
                    <span className="font-bold text-amber-700">&gt;= 71 Poin (Level 3 Darurat)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Human-in-the-Loop:</span>
                    <span className="font-bold text-rose-600">Aktif jika Confidence &lt; 70%</span>
                  </div>
                </div>
              </div>

              {/* Encrypted Storage Lake */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  activeLayer === 'all' || activeLayer === 'storage'
                    ? 'bg-emerald-50/70 border-emerald-200 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/50 border-slate-200 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      04
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Encrypted Data Lake &amp; DB (Interoperable DTKS &amp; DTSEN)
                      </h4>
                      <span className="text-[11px] font-bold text-emerald-800 block">
                        Mengimplementasikan: Program Layer
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded shrink-0">
                    PostgreSQL Sharded • S3
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Sinkronisasi terpadu data kemiskinan ekstrem (DTKS Desil 1-2, Regsosek) dan peta spasial kerentanan daerah dengan indeks pencarian terdistribusi.
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-[11px] space-y-1 font-mono text-slate-700">
                  <div className="flex justify-between">
                    <span>Pemadanan NIK Otomatis:</span>
                    <span className="font-bold text-emerald-700">Dukcapil + Regsosek</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu Deduplikasi:</span>
                    <span className="font-bold text-emerald-700">&lt; 4 Detik / Batch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Flow Arrow */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold border border-slate-200">
                <span>Otorisasi &amp; Eksekusi SP2D</span>
                <ArrowRight className="w-3 h-3 text-emerald-600" />
              </div>
            </div>

            {/* LAYER 5: Egress & Fast Delivery */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                activeLayer === 'all' || activeLayer === 'egress'
                  ? 'bg-rose-50/70 border-rose-200 ring-2 ring-rose-500/20'
                  : 'bg-slate-50/50 border-slate-200 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                    05
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      Egress &amp; Penyaluran Kilat (Multi-Channel Delivery)
                    </h4>
                    <span className="text-[11px] font-bold text-rose-700 block">
                      Mengimplementasikan: Outcome Monitoring
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-mono font-bold px-2 py-0.5 rounded">
                  Open Banking API • PT Pos API • SMS Blast
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-rose-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-rose-600" />
                    <span className="font-bold text-xs text-slate-900">Himbara &amp; Bank Daerah</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Transfer otomatis bantuan langsung tunai (BLT Adaptif) langsung ke rekening KKS penerima manfaat
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-rose-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-xs text-slate-900">PT Pos Kilat Khusus</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Penyaluran tunai langsung door-to-door untuk daerah 3T dan warga lanjut usia/disabilitas
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-rose-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs text-slate-900">Command Center Dashboard</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Monitoring telemetri real-time, realisasi anggaran &amp; SLA penyaluran (Target 4.2 Hari)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 text-[11px]">
            Dokumentasi Arsitektur Spesifikasi Teknis SIGAP • Standar Interoperabilitas SPBE Nasional
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
          >
            Tutup Diagram
          </button>
        </div>
      </div>
    </div>
  );
};
