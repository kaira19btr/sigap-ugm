import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from 'recharts';
import {
  TrendingDown,
  TrendingUp,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  SlidersHorizontal,
  Calendar,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Coins,
  Smile,
  Target,
} from 'lucide-react';

// Monthly timeline trend data (Jan - Des)
const monthlyEfficiencyData = [
  { month: 'Jan', manualDays: 22.5, sigapDays: 5.8, targetDays: 7.0, efficiency: 74.2, beneficiaries: 42000, funds: 25.2 },
  { month: 'Feb', manualDays: 21.0, sigapDays: 5.1, targetDays: 7.0, efficiency: 75.7, beneficiaries: 38500, funds: 23.1 },
  { month: 'Mar', manualDays: 20.8, sigapDays: 4.6, targetDays: 7.0, efficiency: 77.8, beneficiaries: 61200, funds: 36.7 },
  { month: 'Apr', manualDays: 23.0, sigapDays: 4.4, targetDays: 7.0, efficiency: 80.8, beneficiaries: 49000, funds: 29.4 },
  { month: 'Mei', manualDays: 21.5, sigapDays: 4.2, targetDays: 7.0, efficiency: 80.4, beneficiaries: 55000, funds: 33.0 },
  { month: 'Jun', manualDays: 19.8, sigapDays: 3.9, targetDays: 7.0, efficiency: 80.3, beneficiaries: 72000, funds: 43.2 },
  { month: 'Jul', manualDays: 22.0, sigapDays: 3.8, targetDays: 7.0, efficiency: 82.7, beneficiaries: 84000, funds: 50.4 },
  { month: 'Agu', manualDays: 20.4, sigapDays: 4.1, targetDays: 7.0, efficiency: 79.9, beneficiaries: 66000, funds: 39.6 },
  { month: 'Sep', manualDays: 21.2, sigapDays: 3.7, targetDays: 7.0, efficiency: 82.5, beneficiaries: 78000, funds: 46.8 },
  { month: 'Okt', manualDays: 22.8, sigapDays: 3.6, targetDays: 7.0, efficiency: 84.2, beneficiaries: 91000, funds: 54.6 },
  { month: 'Nov', manualDays: 24.0, sigapDays: 3.5, targetDays: 7.0, efficiency: 85.4, beneficiaries: 105000, funds: 63.0 },
  { month: 'Des', manualDays: 23.5, sigapDays: 3.4, targetDays: 7.0, efficiency: 85.5, beneficiaries: 118000, funds: 70.8 },
];

// Budget allocation & realization per disaster category
const budgetDisasterData = [
  { name: 'Gempa & Tsunami', alokasi: 4200, realisasi: 3950, kpm: 345000, pct: 94.0, color: '#3b82f6' },
  { name: 'Banjir & Lahar', alokasi: 3800, realisasi: 3590, kpm: 298000, pct: 94.5, color: '#06b6d4' },
  { name: 'Erupsi Vulkanik', alokasi: 2400, realisasi: 2210, kpm: 182000, pct: 92.1, color: '#f97316' },
  { name: 'Tanah Longsor', alokasi: 1600, realisasi: 1470, kpm: 124000, pct: 91.9, color: '#8b5cf6' },
  { name: 'Kekeringan / El Nino', alokasi: 1400, realisasi: 1180, kpm: 98000, pct: 84.3, color: '#eab308' },
];

// 6-Axis Multi-dimensional radar evaluation
const radarMetricsData = [
  { subject: 'Kecepatan Respon (SLA)', score: 96, standard: 75, fullMark: 100 },
  { subject: 'Akurasi NIK & DTKS', score: 98, standard: 80, fullMark: 100 },
  { subject: 'Transparansi Penyaluran', score: 95, standard: 70, fullMark: 100 },
  { subject: 'Efisiensi Biaya Operasional', score: 92, standard: 65, fullMark: 100 },
  { subject: 'Kepuasan Penerima Manfaat', score: 94, standard: 75, fullMark: 100 },
  { subject: 'Ketepatan Rekonsiliasi SP2D', score: 97, standard: 70, fullMark: 100 },
];

// Citizen satisfaction survey breakdown
const satisfactionBreakdown = [
  { rating: '5 Bintang (Sangat Puas)', count: 6080, percentage: 68.0, color: '#10b981', gradient: ['#10b981', '#059669'] },
  { rating: '4 Bintang (Puas)', count: 2145, percentage: 24.0, color: '#3b82f6', gradient: ['#3b82f6', '#2563eb'] },
  { rating: '3 Bintang (Cukup)', count: 447, percentage: 5.0, color: '#f59e0b', gradient: ['#f59e0b', '#d97706'] },
  { rating: '2 Bintang (Kurang)', count: 178, percentage: 2.0, color: '#f97316', gradient: ['#f97316', '#ea580c'] },
  { rating: '1 Bintang (Tidak Puas)', count: 90, percentage: 1.0, color: '#ef4444', gradient: ['#ef4444', '#dc2626'] },
];

// Custom Tooltip for Area/Bar charts
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-2xl text-white text-xs space-y-2 min-w-[210px] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="font-extrabold text-slate-200 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            Bulan {label}
          </span>
          <span className="text-[10px] font-mono bg-emerald-950/80 border border-emerald-700 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
            Efisiensi +{payload[0]?.payload?.efficiency}%
          </span>
        </div>

        <div className="space-y-1.5 pt-0.5 font-mono text-[11px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500"></span>
              Aktual SIGAP:
            </span>
            <span className="font-extrabold text-emerald-400">
              {payload.find((p: any) => p.dataKey === 'sigapDays')?.value} Hari
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400 font-sans">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Batas SLA Target:
            </span>
            <span className="font-semibold text-amber-300">
              {payload.find((p: any) => p.dataKey === 'targetDays')?.value} Hari
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400 font-sans">
              <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
              Metode Konvensional:
            </span>
            <span className="font-medium text-rose-400">
              {payload.find((p: any) => p.dataKey === 'manualDays')?.value} Hari
            </span>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-1.5 text-[10px] text-slate-400 flex items-center justify-between font-sans">
          <span>KPM Tersalur: <strong>{payload[0]?.payload?.beneficiaries.toLocaleString('id-ID')}</strong></span>
          <span className="text-blue-300">Rp {payload[0]?.payload?.funds} M</span>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Budget Bar Chart
const CustomBudgetTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-slate-950/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-2xl text-white text-xs space-y-2 min-w-[220px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="font-bold text-slate-200">{label}</span>
          <span className="text-[10px] font-mono bg-blue-950/80 border border-blue-700 text-blue-300 px-1.5 py-0.5 rounded font-bold">
            Realisasi {data.pct}%
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400 font-sans">Alokasi Anggaran:</span>
            <span className="font-bold">Rp {data.alokasi.toLocaleString('id-ID')} Miliar</span>
          </div>
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-emerald-300 font-sans">Terserap (Realisasi):</span>
            <span className="font-bold">Rp {data.realisasi.toLocaleString('id-ID')} Miliar</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-sans">Sisa Cadangan:</span>
            <span>Rp {(data.alokasi - data.realisasi).toLocaleString('id-ID')} Miliar</span>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-1.5 text-[10px] text-slate-400 font-sans flex justify-between">
          <span>Penerima Manfaat (KPM):</span>
          <span className="text-white font-bold">{data.kpm.toLocaleString('id-ID')} Jiwa</span>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Radar Chart
const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-slate-950/95 backdrop-blur-md border border-indigo-700/60 rounded-xl p-3 shadow-2xl text-white text-xs space-y-1.5">
        <div className="font-bold text-indigo-300">{data.subject}</div>
        <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
          <span className="text-slate-400 font-sans">Skor SIGAP AI:</span>
          <span className="text-emerald-400 font-bold">{data.score} / 100</span>
        </div>
        <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
          <span className="text-slate-400 font-sans">Standar Kemensos:</span>
          <span className="text-slate-300">{data.standard} / 100</span>
        </div>
        <div className="text-[10px] text-emerald-400 font-medium pt-1 border-t border-slate-800">
          Surplus Kinerja: +{data.score - data.standard} Poin di atas standar
        </div>
      </div>
    );
  }
  return null;
};

export const MonevCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'budget' | 'radar' | 'satisfaction'>('timeline');
  const [timeFilter, setTimeFilter] = useState<'all' | 'q1' | 'q2' | 'q3' | 'q4'>('all');
  const [showBenchmarks, setShowBenchmarks] = useState(true);

  // Filter timeline data based on selected quarter
  const filteredTimeline = monthlyEfficiencyData.filter((d, i) => {
    if (timeFilter === 'q1') return i >= 0 && i <= 2;
    if (timeFilter === 'q2') return i >= 3 && i <= 5;
    if (timeFilter === 'q3') return i >= 6 && i <= 8;
    if (timeFilter === 'q4') return i >= 9 && i <= 11;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
      {/* Top Banner Navigation Bar with Glassmorphic Gradient */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              Visualisasi Analitik Dampak & Efektivitas
            </h2>
            <span className="hidden sm:inline-flex text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
              Live Realtime Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Diagram dinamis pelacakan pemangkasan birokrasi, penyerapan anggaran darurat, dan audit kualitas layanan
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto select-none">
          <button
            type="button"
            id="tab-chart-timeline"
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>SLA Penyaluran</span>
          </button>

          <button
            type="button"
            id="tab-chart-budget"
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'budget'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Alokasi Anggaran</span>
          </button>

          <button
            type="button"
            id="tab-chart-radar"
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'radar'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Radar Kinerja BPKP</span>
          </button>

          <button
            type="button"
            id="tab-chart-satisfaction"
            onClick={() => setActiveTab('satisfaction')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'satisfaction'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Kepuasan Warga</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Chart Canvas Area */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* VIEW 1: SLA Penyaluran (Area Chart + Gradient Waves) */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Filter controls & KPI Summary Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  Periode Kuartal:
                </span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
                  {(['all', 'q1', 'q2', 'q3', 'q4'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setTimeFilter(q)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-colors uppercase ${
                        timeFilter === q
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {q === 'all' ? '1 Tahun Penuh' : q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={showBenchmarks}
                    onChange={(e) => setShowBenchmarks(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Tampilkan Garis Pembanding (Target SLA & Manual)</span>
                </label>
              </div>
            </div>

            {/* Recharts Area Canvas */}
            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredTimeline}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <defs>
                    {/* Emerald Gradient for SIGAP Realization */}
                    <linearGradient id="colorSigap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    {/* Rose Gradient for Conventional Baseline */}
                    <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    unit=" Hari"
                    domain={[0, 26]}
                  />
                  <Tooltip content={<CustomAreaTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '12px', fontSize: '12px', fontWeight: 600 }}
                  />

                  {/* Conventional Manual baseline (21-24 days) */}
                  {showBenchmarks && (
                    <Area
                      type="monotone"
                      name="Penyaluran Konvensional (Sebelum SIGAP)"
                      dataKey="manualDays"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#colorManual)"
                    />
                  )}

                  {/* Kemensos Target SLA (7 days threshold) */}
                  {showBenchmarks && (
                    <Line
                      type="monotone"
                      name="Batas SLA Permensos (Target 7 Hari)"
                      dataKey="targetDays"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      dot={false}
                      strokeDasharray="6 3"
                    />
                  )}

                  {/* Actual SIGAP Response Speed (3.4 - 5.8 days) */}
                  <Area
                    type="monotone"
                    name="Realisasi Kecepatan SIGAP (Rata-rata 4.2 Hari)"
                    dataKey="sigapDays"
                    stroke="#10b981"
                    strokeWidth={3.5}
                    fillOpacity={1}
                    fill="url(#colorSigap)"
                    activeDot={{ r: 7, strokeWidth: 3, stroke: '#ffffff', fill: '#059669' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Micro Highlights Pill Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  ⚡ 85%
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-900">Percepatan Waktu Total</div>
                  <div className="text-[10px] text-emerald-700">Dari 22 hari menjadi 3.4 hari di akhir periode</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  🛡️ 100%
                </div>
                <div>
                  <div className="text-[11px] font-bold text-blue-900">Kepatuhan Standar SLA</div>
                  <div className="text-[10px] text-blue-700">Tidak ada satupun wilayah melebihi target 7 hari</div>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  👥 865K
                </div>
                <div>
                  <div className="text-[11px] font-bold text-indigo-900">Keluarga Penerima Manfaat</div>
                  <div className="text-[10px] text-indigo-700">Menerima bansos tepat saat masa tanggap darurat</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Alokasi & Realisasi Anggaran (Composed Bar Chart) */}
        {activeTab === 'budget' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs font-extrabold text-slate-800">
                  Realisasi Anggaran Darurat per Klaster Bencana (Total Rp 13.4 T)
                </span>
                <p className="text-[11px] text-slate-500">
                  Perbandingan pagu alokasi cadangan APBN Kemensos terhadap realisasi SP2D tersalurkan
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Rata-rata Serapan: 92.4%
                </span>
              </div>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetDisasterData}
                  margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    unit=" M"
                  />
                  <Tooltip content={<CustomBudgetTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '12px', fontSize: '12px', fontWeight: 600 }}
                  />
                  <Bar
                    name="Pagu Alokasi APBN (Rp Miliar)"
                    dataKey="alokasi"
                    fill="#94a3b8"
                    radius={[6, 6, 0, 0]}
                    barSize={28}
                  />
                  <Bar
                    name="Realisasi Dana Tersalurkan (Rp Miliar)"
                    dataKey="realisasi"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    barSize={28}
                  >
                    {budgetDisasterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Cluster Table Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
              {budgetDisasterData.map((item) => (
                <div
                  key={item.name}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="text-xs font-mono font-extrabold text-blue-600">
                    Rp {item.realisasi.toLocaleString('id-ID')} M
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {item.kpm.toLocaleString('id-ID')} Penerima
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: Radar Kinerja Multidimensi (Radar Chart BPKP) */}
        {activeTab === 'radar' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs font-extrabold text-slate-800">
                  Radar Audit Kinerja & Kepatuhan Tata Kelola Bantuan (Standar BPKP / BPK)
                </span>
                <p className="text-[11px] text-slate-500">
                  Evaluasi 6 pilar utama efektivitas SIGAP dalam mencegah *inclusion/exclusion error* dan kebocoran dana
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                  Indeks Agregat: 95.3 / 100 (A+)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarMetricsData}>
                    <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                    <Tooltip content={<CustomRadarTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: '10px', fontSize: '11px', fontWeight: 600 }}
                    />
                    <Radar
                      name="Standar Minimal Kemensos"
                      dataKey="standard"
                      stroke="#94a3b8"
                      fill="#cbd5e1"
                      fillOpacity={0.3}
                      strokeDasharray="4 4"
                    />
                    <Radar
                      name="Pencapaian SIGAP Adaptif"
                      dataKey="score"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fill="#818cf8"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Breakdown Cards on the right */}
              <div className="lg:col-span-5 space-y-2.5">
                {radarMetricsData.map((item) => (
                  <div
                    key={item.subject}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-indigo-50/50 hover:border-indigo-200 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.subject}</div>
                      <div className="text-[10px] text-slate-500">Standar target: {item.standard} pts</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-extrabold text-indigo-600">{item.score} / 100</div>
                      <div className="text-[9px] font-bold text-emerald-600">+{item.score - item.standard} di atas standar</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: Kepuasan Warga (Pie Donut Chart + Sentiment Analysis) */}
        {activeTab === 'satisfaction' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs font-extrabold text-slate-800">
                  Distribusi Kepuasan Penerima Manfaat ({satisfactionBreakdown.reduce((a, b) => a + b.count, 0).toLocaleString('id-ID')} Responden)
                </span>
                <p className="text-[11px] text-slate-500">
                  Hasil umpan balik 2-arah melalui WhatsApp Bot, SMS blast interaktif, dan posko Tagana
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg flex items-center gap-1">
                  <span>Skor Rata-rata: 4.6 / 5.0</span>
                  <span className="text-amber-500">★</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Donut Chart with central counter */}
              <div className="lg:col-span-6 h-72 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={satisfactionBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="count"
                    >
                      {satisfactionBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any, name: any, item: any) => [
                        `${Number(val).toLocaleString('id-ID')} Responden (${item.payload.percentage}%)`,
                        item.payload.rating,
                      ]}
                      contentStyle={{
                        backgroundColor: '#020617',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Donut Central Metric Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <div className="text-3xl font-extrabold font-mono text-slate-900 flex items-center gap-0.5">
                    <span>4.6</span>
                    <span className="text-amber-500 text-xl">★</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    92% Kepuasan
                  </div>
                </div>
              </div>

              {/* Sentiment Progress Bars on the right */}
              <div className="lg:col-span-6 space-y-2.5">
                {satisfactionBreakdown.map((item) => (
                  <div key={item.rating} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                        {item.rating}
                      </span>
                      <span className="font-mono font-bold text-slate-700">
                        {item.count.toLocaleString('id-ID')} ({item.percentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
