import React from 'react';
import {
  X,
  Shield,
  Zap,
  Heart,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Activity,
} from 'lucide-react';

interface LogoPhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoPhilosophyModal: React.FC<LogoPhilosophyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const elements = [
    {
      icon: Shield,
      color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      title: 'Perisai Ketahanan Sosial (Shield)',
      desc: 'Melambangkan perisai pelindung yang kokoh bagi masyarakat rentan dalam menghadapi guncangan bencana (shocks), krisis iklim, dan kerentanan ekonomi.',
    },
    {
      icon: Heart,
      color: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
      title: 'Sayap Merangkul & Empati Kemanusiaan',
      desc: 'Dua lengkungan yang membentuk hati dan sayap merangkul merepresentasikan kehadiran negara secara humanis untuk menjaga martabat seluruh penerima manfaat.',
    },
    {
      icon: Zap,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      title: 'Kilat Gerak Cepat (Adaptive Pulse)',
      desc: 'Simbol akselerasi tanggap darurat yang memangkas birokrasi penyaluran dari 30 hari menjadi < 4.2 hari berbasis deteksi dini otomatis & peringatan dini.',
    },
    {
      icon: Database,
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      title: 'Titik Inti Satu Data Terpadu',
      desc: 'Nukleus di tengah melambangkan interoperabilitas integrasi DTKS, Regsosek, dan telemetri multi-lembaga (Kemensos, BNPB, BMKG, BPS) tanpa redundansi.',
    },
  ];

  const colors = [
    {
      name: 'Rose & Crimson (#E11D48)',
      meaning: 'Keberanian tanggap darurat bencana, kegentingan perlindungan sosial, dan kehangatan rasa kemanusiaan.',
    },
    {
      name: 'Cobalt & Navy Blue (#1E3A8A)',
      meaning: 'Kedaulatan data nasional, kepatuhan regulasi UU PDP, transparansi audit, dan keandalan sistem pemerintahan digital.',
    },
    {
      name: 'Golden Amber & Orange (#F59E0B)',
      meaning: 'Harapan pemulihan ekonomi masyarakat, ketahanan pangan, dan optimisme pascabencana.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">
                Filosofi & Makna Logo SIGAP
              </h3>
              <p className="text-xs text-slate-400">
                Sistem Gerak Cepat Perlindungan Sosial Adaptif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Logo Showcase & Intro */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-slate-900 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-transparent to-blue-500/20 animate-sigap-aura"></div>
              <svg
                width="64"
                height="64"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-sigap-float drop-shadow-lg relative z-10"
              >
                <defs>
                  <linearGradient id="modalShieldGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E11D48" />
                    <stop offset="45%" stopColor="#BE123C" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>
                  <linearGradient id="modalHandsGrad" x1="20" y1="30" x2="80" y2="70" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                  <linearGradient id="modalPulseGrad" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                </defs>
                <path d="M50 6C65 6 86 12 90 26C90 56 68 84 50 94C32 84 10 56 10 26C14 12 35 6 50 6Z" fill="url(#modalShieldGrad)" />
                <g className="animate-sigap-wings">
                  <path d="M50 32C42 22 28 24 22 36C18 45 22 58 32 66C38 71 44 75 50 78C46 71 34 60 30 52C26 44 30 36 38 34C43 32 48 35 50 38Z" fill="url(#modalHandsGrad)" fillOpacity="0.9" />
                  <path d="M50 32C58 22 72 24 78 36C82 45 78 58 68 66C62 71 56 75 50 78C54 71 66 60 70 52C74 44 70 36 62 34C57 32 52 35 50 38Z" fill="url(#modalHandsGrad)" fillOpacity="0.9" />
                </g>
                <path d="M54 18L40 45H53L46 72L63 41H50L56 22L54 18Z" fill="url(#modalPulseGrad)" className="animate-sigap-lightning" />
                <circle cx="50" cy="46" r="7" className="animate-sigap-core-ping" fill="none" stroke="#FDE047" strokeWidth="1.5" />
                <circle cx="50" cy="46" r="3.5" fill="#FFFFFF" />
                <circle cx="50" cy="46" r="6" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.75" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-extrabold text-slate-900">
                Identitas Visual Sistem SIGAP
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dirancang khusus sebagai perwujudan ekosistem <strong>Perlindungan Sosial Adaptif (Adaptive Social Protection)</strong> yang menggabungkan kecepatan reaksi tanggap darurat dengan ketepatan satu data terpadu demi melindungi martabat warga negara.
              </p>
            </div>
          </div>

          {/* 4 Core Geometric Elements */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>4 Makna Simbol Geometris</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {elements.map((el, idx) => {
                const Icon = el.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border ${el.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">{el.title}</h5>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {el.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Meaning */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span>Harmonisasi Tri-Warna Kebangsaan & Kemanusiaan</span>
            </h4>
            <div className="space-y-2">
              {colors.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                >
                  <span className="font-bold text-slate-900 shrink-0 font-mono text-[11px]">
                    {c.name}
                  </span>
                  <span className="text-slate-600 text-[11px] sm:text-right">
                    {c.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Inovasi Digital Perlindungan Sosial Kemensos RI & BNPB
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
          >
            Tutup Filosofi
          </button>
        </div>
      </div>
    </div>
  );
};
