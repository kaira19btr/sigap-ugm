import React from 'react';
import { RegionRiskData } from '../types';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  X,
  Radio,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  Activity,
  Layers,
  MapPin,
} from 'lucide-react';

interface RegionRadarChartModalProps {
  region: RegionRiskData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEmergencyAction?: (region: RegionRiskData) => void;
}

export const RegionRadarChartModal: React.FC<RegionRadarChartModalProps> = ({
  region,
  isOpen,
  onClose,
  onOpenEmergencyAction,
}) => {
  if (!isOpen || !region) return null;

  const { sevenIndicators } = region;
  const totalScore =
    sevenIndicators.shockIntensity +
    sevenIndicators.infraDamage +
    sevenIndicators.vulnerableRatio +
    sevenIndicators.dependencyRatio +
    sevenIndicators.fiscalDeficit +
    sevenIndicators.supplyChainDistruption +
    sevenIndicators.crisisDuration;

  const radarData = [
    {
      indicator: 'Intensitas Shock',
      fullName: '1. Intensitas Shock/Bencana Fisik (BMKG/PVMBG)',
      value: sevenIndicators.shockIntensity,
      nationalAvg: 6.5,
      fullMark: 15,
    },
    {
      indicator: 'Kerusakan Fisik',
      fullName: '2. Kerusakan Infrastruktur & Aksesibilitas Posko',
      value: sevenIndicators.infraDamage,
      nationalAvg: 5.8,
      fullMark: 15,
    },
    {
      indicator: 'RT Rentan (DTKS)',
      fullName: '3. Proporsi Rumah Tangga Rentan (DTKS Desil 1-2 & Regsosek)',
      value: sevenIndicators.vulnerableRatio,
      nationalAvg: 7.2,
      fullMark: 15,
    },
    {
      indicator: 'Beban Ketergantungan',
      fullName: '4. Rasio Beban Ketergantungan (Lansia, Balita, Disabilitas)',
      value: sevenIndicators.dependencyRatio,
      nationalAvg: 6.0,
      fullMark: 15,
    },
    {
      indicator: 'Kapasitas Fiskal',
      fullName: '5. Keterbatasan Kapasitas Fiskal & Logistik Daerah',
      value: sevenIndicators.fiscalDeficit,
      nationalAvg: 5.5,
      fullMark: 15,
    },
    {
      indicator: 'Rantai Pasok',
      fullName: '6. Gangguan Rantai Pasok Pangan Pokok & Pasar Lokal',
      value: sevenIndicators.supplyChainDistruption,
      nationalAvg: 6.1,
      fullMark: 15,
    },
    {
      indicator: 'Durasi Krisis',
      fullName: '7. Proyeksi Durasi Krisis & Risiko Bencana Susulan',
      value: sevenIndicators.crisisDuration,
      nationalAvg: 5.9,
      fullMark: 15,
    },
  ];

  const isDarurat = region.status === 'darurat';
  const isSiaga = region.status === 'siaga';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 ${
                isDarurat
                  ? 'bg-gradient-to-tr from-rose-600 to-red-500'
                  : isSiaga
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
                  : 'bg-gradient-to-tr from-emerald-500 to-teal-500'
              }`}
            >
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                    isDarurat
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : isSiaga
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {isDarurat ? 'Status: DARURAT (Level 3)' : isSiaga ? 'Status: SIAGA (Level 2)' : 'Status: NORMAL (Level 1)'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Target SLA: {region.slaTargetDays} Hari
                </span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                Analisis Matriks 7 Indikator Risiko • {region.name}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {region.regency}, {region.province} • {region.crisisType}
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Recharts Radar Chart */}
            <div className="lg:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Grafik Radar 7 Dimensi Kerentanan (Skala 1-15 per Aksis)
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Skor: <strong className="text-slate-900">{totalScore}</strong> / 105 Poin
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="indicator" tick={{ fill: '#475569', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 15]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                    <Radar
                      name="Wilayah Terpilih"
                      dataKey="value"
                      stroke={isDarurat ? '#e11d48' : isSiaga ? '#d97706' : '#059669'}
                      fill={isDarurat ? '#f43f5e' : isSiaga ? '#f59e0b' : '#10b981'}
                      fillOpacity={0.45}
                    />
                    <Radar
                      name="Rata-rata Nasional"
                      dataKey="nationalAvg"
                      stroke="#64748b"
                      fill="#94a3b8"
                      fillOpacity={0.2}
                    />
                    <Tooltip
                      formatter={(val: number) => [`${val} / 15 Poin`, 'Nilai Parameter']}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.5rem',
                        fontSize: '11px',
                        color: '#f8fafc',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isDarurat ? 'bg-rose-500' : isSiaga ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  ></span>
                  <span>{region.name} ({totalScore}/105 Poin)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                  <span>Benchmark Rata-rata Nasional (43.1/105 Poin)</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Parameter Breakdown */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block border-b border-slate-100 pb-2">
                  Rincian Nilai 7 Parameter (Bobot 1-15)
                </span>

                <div className="space-y-2 text-xs">
                  {radarData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-slate-600 text-[11px] truncate max-w-[200px]" title={item.fullName}>
                        {item.fullName}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              item.value >= 12
                                ? 'bg-rose-500'
                                : item.value >= 8
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${(item.value / 15) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-bold font-mono text-slate-800 text-[11px] w-8 text-right">
                          {item.value}/15
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {onOpenEmergencyAction && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenEmergencyAction(region);
                  }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Aktivasi Tindakan Respons Darurat Wilayah</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Data telemetri disinkronisasi setiap 15 menit dari BMKG, DTKS Kemensos, dan Laporan Tagana.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
