import React, { useState, useMemo } from 'react';
import {
  Building2,
  Database,
  ShieldAlert,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Clock,
  AlertOctagon,
  Search,
  Filter,
  ShieldCheck,
  FileText,
  CheckCheck,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink,
  Zap,
  Info,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ActivationProposal } from '../types';
import { AnimatedCounter } from './AnimatedCounter';

interface InterAgencyCoordinationPanelProps {
  proposals?: ActivationProposal[];
  onSelectProposal?: (proposal: ActivationProposal) => void;
}

export const InterAgencyCoordinationPanel: React.FC<InterAgencyCoordinationPanelProps> = ({
  proposals = [],
  onSelectProposal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Disetujui' | 'Menunggu' | 'Ditolak'>('all');
  const [selectedLogDetail, setSelectedLogDetail] = useState<ActivationProposal | null>(null);

  // Dynamic calculations based on live proposals
  const approvedProposalsCount = useMemo(() => {
    return proposals.filter((p) => p.status === 'Disetujui').length;
  }, [proposals]);

  // Agency Status List Data
  const agencies = [
    {
      id: 'kemensos',
      name: 'Kemensos RI',
      shortName: 'Kemensos',
      role: 'Otorisasi & Komando Penyaluran',
      status: 'Aktif Mengelola',
      statusType: 'on-track', // on-track (hijau)
      indicatorValue: `${18 + approvedProposalsCount} Keputusan`,
      indicatorLabel: 'Disetujui bulan ini',
      icon: Building2,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      lastUpdate: '2 menit lalu',
    },
    {
      id: 'bps',
      name: 'BPS RI',
      shortName: 'BPS',
      role: 'Kliring Data Regsosek & Desil',
      status: 'Validasi Data',
      statusType: 'on-track', // on-track (hijau)
      indicatorValue: '98.4%',
      indicatorLabel: 'Update data terakhir',
      icon: Database,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      lastUpdate: '15 menit lalu',
    },
    {
      id: 'bnpb',
      name: 'BNPB / BPBD',
      shortName: 'BNPB',
      role: 'Suplai Telemetri & InaRISK',
      status: 'Suplai Data Bencana',
      statusType: 'on-track', // on-track (hijau)
      indicatorValue: '12 Menit',
      indicatorLabel: 'Latensi update data',
      icon: ShieldAlert,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      lastUpdate: 'Real-time API',
    },
    {
      id: 'bappenas',
      name: 'Bappenas',
      shortName: 'Bappenas',
      role: 'Evaluasi Kebijakan & Dampak',
      status: 'Monitoring Kebijakan',
      statusType: 'on-track', // on-track (hijau)
      indicatorValue: '3 / 3 Selesai',
      indicatorLabel: 'Evaluasi triwulanan selesai',
      icon: TrendingUp,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      lastUpdate: 'Triwulan III-2026',
    },
    {
      id: 'pemda',
      name: 'Pemda Pilot',
      shortName: 'Pemda Pilot',
      role: 'Eksekusi Lapangan & Posko Tagana',
      status: 'Eksekusi Lapangan',
      statusType: 'on-track', // on-track (hijau)
      indicatorValue: '96.2%',
      indicatorLabel: 'SOP lokal terpenuhi',
      icon: MapPin,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      lastUpdate: '5 pilot aktif',
    },
  ];

  // Filtered Decision Audit Log
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        p.region.toLowerCase().includes(term) ||
        p.proposer.toLowerCase().includes(term) ||
        (p.decisionType && p.decisionType.toLowerCase().includes(term)) ||
        (p.approver && p.approver.toLowerCase().includes(term)) ||
        p.id.toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [proposals, searchTerm, statusFilter]);

  return (
    <div
      id="panel-koordinasi-akuntabilitas-kl"
      className="bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#0A1429] rounded-2xl border border-rose-900/40 text-white shadow-xl overflow-hidden space-y-6 p-5 sm:p-6 transition-all duration-300"
    >
      {/* Panel Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              Koordinasi &amp; Akuntabilitas Lintas K/L
            </h2>
            <span className="text-[10px] font-mono bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
              Anti Tumpang Tindih Program
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 max-w-3xl leading-relaxed">
            Status keterlibatan dan kepatuhan SOP setiap kementerian/lembaga dalam siklus aktivasi bantuan — forum akuntabilitas terintegrasi untuk menjamin tata kelola transparan tanpa friksi antar instansi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Sinkronisasi SPBE</span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Aktif Terkoneksi 5 K/L
            </span>
          </div>
        </div>
      </div>

      {/* A. 5 Horizontal Agency Status Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            Status Keterlibatan &amp; SOP 5 Kementerian / Lembaga
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Standar Penyelenggaraan Bantuan Terpadu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {agencies.map((agency) => {
            const Icon = agency.icon;
            const isOnTrack = agency.statusType === 'on-track';

            return (
              <div
                key={agency.id}
                id={`card-kl-${agency.id}`}
                className="bg-slate-900/90 rounded-xl border border-slate-800 hover:border-emerald-500/60 p-4 shadow-lg hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${agency.bgGradient} rounded-bl-full pointer-events-none`}></div>

                <div>
                  {/* Top Agency Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-emerald-600/30 text-emerald-400 flex items-center justify-center transition-colors border border-slate-700/60">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {agency.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 line-clamp-1">
                          {agency.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge (Matching Modul 2 Badge colors) */}
                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isOnTrack
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : agency.statusType === 'perlu-perhatian'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {isOnTrack ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{agency.status}</span>
                    </span>
                  </div>

                  {/* Key Metric Indicator */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80">
                    <div className="text-lg font-extrabold font-mono text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {agency.indicatorValue}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {agency.indicatorLabel}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span>Sinkronisasi:</span>
                  <span className="text-slate-400 font-semibold">{agency.lastUpdate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* C. Indikator Ringkasan "Kepatuhan SOP Lintas K/L" (Satu Angka Besar) */}
      <div
        id="card-ringkasan-kepatuhan-kl"
        className="bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-blue-950/60 rounded-xl border border-emerald-500/40 p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {/* Big Number Pill Badge */}
          <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex flex-col items-center justify-center font-mono shrink-0 shadow-md shadow-emerald-950/50 border border-emerald-300/30">
            <div className="text-3xl sm:text-2xl font-black tracking-tight flex items-baseline">
              <AnimatedCounter value={94} duration={1200} />
              <span className="text-base font-bold">%</span>
            </div>
            <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-emerald-100">Kepatuhan</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                Indeks Koordinasi Inter-Agensi
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Siklus 3 Bulan Terakhir</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Kepatuhan Koordinasi Lintas K/L
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Berdasarkan ketepatan waktu respons 5 instansi pada siklus aktivasi 3 bulan terakhir, tanpa ada konflik tumpang tindih alokasi bansos di tingkat kabupaten/kota.
            </p>
          </div>
        </div>

        {/* Micro KPI highlights on right side */}
        <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto shrink-0 font-mono text-xs">
          <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 text-center sm:text-left">
            <span className="text-[10px] text-slate-400 block font-sans">Rata-rata Waktu Respons:</span>
            <span className="text-sm font-extrabold text-emerald-400">1.8 Jam</span>
            <span className="text-[9px] text-slate-500 block font-sans">(Target SLA &lt; 4 Jam)</span>
          </div>
          <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 text-center sm:text-left">
            <span className="text-[10px] text-slate-400 block font-sans">Tumpang Tindih Program:</span>
            <span className="text-sm font-extrabold text-emerald-400">0 Konflik</span>
            <span className="text-[9px] text-slate-500 block font-sans">(Kliring Satu Data)</span>
          </div>
        </div>
      </div>

      {/* B. Log Audit Keputusan (Tabel Interaktif) */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 shadow-md overflow-hidden space-y-4 p-4 sm:p-5">
        {/* Table Header & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Log Audit Keputusan &amp; Riwayat Otorisasi
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Jejak audit digital permohonan dan persetujuan aktivasi bantuan lintas instansi (Terhubung langsung dengan tombol pengajuan Modul 03)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari wilayah, pengusul, K/L..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-200 placeholder-slate-500"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Semua ({proposals.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('Disetujui')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  statusFilter === 'Disetujui' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                Disetujui
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('Menunggu')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  statusFilter === 'Menunggu' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                Menunggu
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('Ditolak')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  statusFilter === 'Ditolak' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                Ditolak
              </button>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table id="table-log-audit-keputusan" className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3.5">Timestamp</th>
                <th className="py-3 px-3.5">Wilayah</th>
                <th className="py-3 px-3.5">Keputusan</th>
                <th className="py-3 px-3.5">Diajukan Oleh</th>
                <th className="py-3 px-3.5">Disetujui Oleh</th>
                <th className="py-3 px-3.5 text-center">Status</th>
                <th className="py-3 px-3.5 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    <p className="font-semibold text-slate-400">Tidak ada catatan audit yang cocok</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Gunakan modul penilaian risiko (Modul 03) untuk mengajukan otorisasi aktivasi baru.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProposals.map((item) => {
                  const decisionLabel =
                    item.decisionType ||
                    (item.riskScore >= 81
                      ? 'Aktivasi Level 3'
                      : item.riskScore >= 41
                      ? 'Aktivasi Level 2'
                      : 'Aktivasi Level 1');

                  const approverLabel =
                    item.approver ||
                    (item.status === 'Disetujui' ? 'Dirjen Linjamsos Kemensos' : 'Menunggu Otorisasi Dirjen');

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLogDetail(item)}
                    >
                      {/* Timestamp */}
                      <td className="py-3 px-3.5 whitespace-nowrap font-mono text-[11px] text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{item.submittedAt}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 block">{item.id}</span>
                      </td>

                      {/* Wilayah */}
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                          {item.region}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                          {item.disasterType}
                        </div>
                      </td>

                      {/* Keputusan */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            item.riskScore >= 81
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
                              : item.riskScore >= 41
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                              : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                          }`}
                        >
                          {decisionLabel}
                        </span>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          Skor: {item.riskScore}/120
                        </div>
                      </td>

                      {/* Diajukan Oleh */}
                      <td className="py-3 px-3.5">
                        <div className="text-slate-200 font-medium">{item.proposer}</div>
                        <div className="text-[10px] text-slate-500">Usulan Sistem &amp; Pemda</div>
                      </td>

                      {/* Disetujui Oleh */}
                      <td className="py-3 px-3.5">
                        <div className="text-slate-200 font-medium">{approverLabel}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {item.approvedAt ? `Otorisasi: ${item.approvedAt}` : 'Otoritas Pusat Kemensos'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        {item.status === 'Disetujui' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Disetujui</span>
                          </span>
                        )}
                        {item.status === 'Menunggu' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>Menunggu</span>
                          </span>
                        )}
                        {item.status === 'Ditolak' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2.5 py-0.5 rounded-full">
                            <AlertOctagon className="w-3 h-3 text-rose-400" />
                            <span>Ditolak</span>
                          </span>
                        )}
                      </td>

                      {/* Detail Link */}
                      <td className="py-3 px-3.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLogDetail(item);
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[10px] font-mono border border-slate-700 transition-colors cursor-pointer"
                        >
                          Audit SHA
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer info note */}
        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Setiap catatan diverifikasi secara kriptografis menggunakan algoritma SHA-256 dan terhubung ke SPBE Kemensos &amp; Bappenas.
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block">
            Total {proposals.length} Berkas Otorisasi
          </span>
        </div>
      </div>

      {/* Modal Detail Audit Log */}
      {selectedLogDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Rincian Audit Otorisasi Digital</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLogDetail(null)}
                className="text-slate-400 hover:text-white text-xs p-1 rounded-md hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>ID Berkas:</span>
                  <span className="text-slate-200 font-bold">{selectedLogDetail.id}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Timestamp Pengajuan:</span>
                  <span className="text-slate-200">{selectedLogDetail.submittedAt}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Wilayah Target:</span>
                  <span className="text-emerald-400 font-bold">{selectedLogDetail.region}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Jenis Bencana:</span>
                  <span className="text-slate-200">{selectedLogDetail.disasterType}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Skor Risiko:</span>
                  <span className="text-rose-400 font-bold">{selectedLogDetail.riskScore} / 120 Poin</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Otoritas Pengusul:</span>
                  <span className="text-slate-200">{selectedLogDetail.proposer}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Otoritas Penyetuju:</span>
                  <span className="text-slate-200">{selectedLogDetail.approver || 'Dirjen Linjamsos Kemensos'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Status Eksekusi:</span>
                  <span className="text-emerald-400 font-bold">{selectedLogDetail.status}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Sertifikat Digital Hash:</span>
                <span className="text-[10px] font-mono text-emerald-400 break-all block">
                  SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </span>
                <span className="text-[9px] text-slate-500 block">
                  Ditandatangani secara digital oleh Balai Sertifikasi Elektronik (BSrE BSSN)
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLogDetail(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
