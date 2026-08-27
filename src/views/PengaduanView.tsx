import React, { useState } from 'react';
import { GrievanceItem } from '../types';
import { GrievanceDetailModal } from '../components/GrievanceDetailModal';
import { soundEffects } from '../utils/soundEffects';
import {
  MessageSquareWarning,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Check,
  User,
  Phone,
  Building,
  Sparkles,
  MapPin,
  FileText,
  ExternalLink,
  Layers,
  LayoutGrid,
  List,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

interface PengaduanViewProps {
  grievances: GrievanceItem[];
  onAddGrievance: (g: Omit<GrievanceItem, 'id' | 'timestamp' | 'status'>) => void;
  onUpdateStatus: (id: string, status: 'Baru' | 'Diproses' | 'Selesai') => void;
}

export const PengaduanView: React.FC<PengaduanViewProps> = ({
  grievances,
  onAddGrievance,
  onUpdateStatus,
}) => {
  const [category, setCategory] = useState('Bantuan Tidak Tepat Sasaran');
  const [village, setVillage] = useState('Ds. Sukamaju');
  const [senderPhone, setSenderPhone] = useState('+62 812-3344-5566');
  const [summary, setSummary] = useState('');
  const [selectedGrievance, setSelectedGrievance] = useState<GrievanceItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filters & search
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Baru' | 'Diproses' | 'Selesai'>('Semua');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    soundEffects.playSuccessChime();

    onAddGrievance({
      category,
      village,
      summary,
      senderPhone,
    });

    setSummary('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3000);
  };

  const handleOpenDetail = (g: GrievanceItem) => {
    soundEffects.playModalOpen();
    setSelectedGrievance(g);
    setIsDetailModalOpen(true);
  };

  const newCount = grievances.filter((g) => g.status === 'Baru').length;
  const inProgressCount = grievances.filter((g) => g.status === 'Diproses').length;
  const resolvedCount = grievances.filter((g) => g.status === 'Selesai').length;

  // Filtered grievances
  const filteredGrievances = grievances.filter((g) => {
    const matchesStatus = statusFilter === 'Semua' || g.status === statusFilter;
    const query = searchKeyword.toLowerCase().trim();
    const matchesQuery =
      !query ||
      g.id.toLowerCase().includes(query) ||
      g.category.toLowerCase().includes(query) ||
      g.village.toLowerCase().includes(query) ||
      g.summary.toLowerCase().includes(query) ||
      (g.senderPhone && g.senderPhone.toLowerCase().includes(query));
    return matchesStatus && matchesQuery;
  });

  return (
    <div id="pengaduan-module" className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600">
          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          <span>Modul 06 • Whistleblowing System &amp; Aspirasi Warga</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Whistleblowing System &amp; Aspirasi Warga
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kanal pelaporan terproteksi &amp; aspirasi penerima manfaat untuk mitigasi kecurangan, pungli, koreksi data, dan transparansi bansos
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Terhubung SP4N-LAPOR! &amp; WBS Terenkripsi Kemensos</span>
          </div>
        </div>
      </div>

      {/* 3 Metric Badges (Expandable on Hover & Clickable to Filter) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Laporan Baru */}
        <div
          id="stat-laporan-baru"
          onClick={() => {
            soundEffects.playTabSwitch();
            setStatusFilter(statusFilter === 'Baru' ? 'Semua' : 'Baru');
          }}
          className={`p-4 rounded-xl border transition-all duration-300 transform cursor-pointer group hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${
            statusFilter === 'Baru'
              ? 'bg-gradient-to-br from-rose-100/90 via-rose-50 to-amber-50/40 border-rose-400 ring-2 ring-rose-400/40 shadow-md'
              : 'bg-gradient-to-br from-white via-rose-50/50 to-amber-50/20 border-rose-200/80 hover:border-rose-300 shadow-xs'
          }`}
          title="Klik untuk menyaring laporan baru"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700 group-hover:text-rose-700 transition-colors">
                  Laporan Pengaduan Baru
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              </div>
              <div className="text-2xl font-black font-mono text-rose-600 mt-1">
                {newCount} <span className="text-xs font-medium font-sans text-slate-500">Laporan</span>
              </div>
              <p className="text-[10px] text-slate-500 group-hover:text-rose-600 transition-colors mt-0.5 flex items-center gap-1">
                <span>Perlu verifikasi faktual lapangan</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-100/70 text-rose-600 border border-rose-200/60 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all shadow-xs">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Sedang Ditindaklanjuti */}
        <div
          id="stat-laporan-proses"
          onClick={() => {
            soundEffects.playTabSwitch();
            setStatusFilter(statusFilter === 'Diproses' ? 'Semua' : 'Diproses');
          }}
          className={`p-4 rounded-xl border transition-all duration-300 transform cursor-pointer group hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${
            statusFilter === 'Diproses'
              ? 'bg-gradient-to-br from-amber-100/90 via-amber-50 to-rose-50/40 border-amber-400 ring-2 ring-amber-400/40 shadow-md'
              : 'bg-gradient-to-br from-white via-amber-50/50 to-rose-50/20 border-amber-200/80 hover:border-amber-300 shadow-xs'
          }`}
          title="Klik untuk menyaring laporan yang sedang diproses"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-800 transition-colors">
                  Sedang Ditindaklanjuti
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-amber-600 mt-1">
                {inProgressCount} <span className="text-xs font-medium font-sans text-slate-500">Laporan</span>
              </div>
              <p className="text-[10px] text-slate-500 group-hover:text-amber-700 transition-colors mt-0.5 flex items-center gap-1">
                <span>Investigasi Posko &amp; Tagana</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-100/70 text-amber-600 border border-amber-200/60 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Terselesaikan */}
        <div
          id="stat-laporan-selesai"
          onClick={() => {
            soundEffects.playTabSwitch();
            setStatusFilter(statusFilter === 'Selesai' ? 'Semua' : 'Selesai');
          }}
          className={`p-4 rounded-xl border transition-all duration-300 transform cursor-pointer group hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg ${
            statusFilter === 'Selesai'
              ? 'bg-gradient-to-br from-emerald-100/90 via-emerald-50 to-blue-50/40 border-emerald-400 ring-2 ring-emerald-400/40 shadow-md'
              : 'bg-gradient-to-br from-white via-emerald-50/50 to-blue-50/20 border-emerald-200/80 hover:border-emerald-300 shadow-xs'
          }`}
          title="Klik untuk menyaring laporan yang telah selesai"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-800 transition-colors">
                  Terselesaikan (Klir)
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-600 mt-1">
                {resolvedCount} <span className="text-xs font-medium font-sans text-slate-500">Laporan</span>
              </div>
              <p className="text-[10px] text-slate-500 group-hover:text-emerald-700 transition-colors mt-0.5 flex items-center gap-1">
                <span>Berita acara &amp; bantuan tersalur</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-emerald-600 border border-emerald-200/60 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Create / Simulator Form */}
        <div className="lg:col-span-4 bg-gradient-to-br from-white via-slate-50/80 to-rose-50/20 rounded-xl border border-rose-200/60 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <MessageSquareWarning className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Kirim Aduan Lapangan (Simulasi WBS)
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              Kanal WBS &amp; AI
            </span>
          </div>

          {justSubmitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Laporan baru berhasil dicatat &amp; masuk antrean investigasi WBS!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Laporan
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-rose-200/80 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800 font-medium shadow-2xs"
              >
                <option value="Bantuan Tidak Tepat Sasaran">Bantuan Tidak Tepat Sasaran</option>
                <option value="Pungutan Liar / Pemotongan Bantuan">Pungutan Liar / Pemotongan Bantuan</option>
                <option value="Keterlambatan Penyaluran">Keterlambatan Penyaluran</option>
                <option value="Infrastruktur Rusak / Akses Tertutup">Infrastruktur Rusak / Akses Tertutup</option>
                <option value="Data Ganda / Duplikasi NIK">Data Ganda / Duplikasi NIK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lokasi Desa / Kelurahan
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Contoh: Ds. Sukamaju, Kec. Cugenang"
                className="w-full p-2 text-xs bg-white border border-rose-200/80 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Kontak Pelapor (WhatsApp Terverifikasi)
              </label>
              <input
                type="text"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                className="w-full p-2 text-xs font-mono bg-white border border-rose-200/80 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rincian Keluhan / Kronologi Faktual
              </label>
              <textarea
                rows={4}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Jelaskan kendala, lokasi RT/RW, dan nama oknum bila ada pemotongan bantuan..."
                className="w-full p-2 text-xs bg-white border border-rose-200/80 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
              />
            </div>

            <button
              id="btn-submit-grievance"
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-blue-600 hover:from-rose-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Laporan Pengaduan ke Sistem</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Report Directory with Expandable Hover & Click Modal */}
        <div className="lg:col-span-8 bg-gradient-to-br from-white via-slate-50/70 to-rose-50/20 rounded-xl border border-rose-200/60 shadow-sm overflow-hidden flex flex-col">
          {/* Controls Bar: Search, Status Filter & View Toggle */}
          <div className="p-4 border-b border-rose-100/80 space-y-3 bg-gradient-to-r from-white via-rose-50/20 to-amber-50/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Daftar Laporan Pengaduan Masuk Real-Time
                </span>
                <p className="text-[11px] text-slate-500">
                  Arahkan kursor ke kotak laporan untuk pratinjau, klik untuk melihat rincian lengkap.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-1 rounded-lg">
                  {filteredGrievances.length} Laporan Ditampilkan
                </span>
                <div className="flex items-center bg-white border border-rose-200/80 rounded-lg p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'cards'
                        ? 'bg-rose-100 text-rose-700 font-bold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Tampilan Kartu Interaktif"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'table'
                        ? 'bg-rose-100 text-rose-700 font-bold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Tampilan Tabel"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Cari ID laporan, kategori, nomor telepon, desa..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-rose-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto text-[11px] font-medium shrink-0 no-scrollbar">
                {(['Semua', 'Baru', 'Diproses', 'Selesai'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setStatusFilter(st);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors shrink-0 cursor-pointer ${
                      statusFilter === st
                        ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white font-bold shadow-2xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st === 'Semua' ? 'Semua Status' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Body Content: Interactive Expandable Cards or Table */}
          <div className="p-4 flex-1 overflow-y-auto max-h-[580px]">
            {filteredGrievances.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700">Tidak ada laporan yang sesuai filter</p>
                <p className="text-[11px] text-slate-400">
                  Coba ubah status filter atau kata kunci pencarian.
                </p>
              </div>
            ) : viewMode === 'cards' ? (
              /* CARD GRID VIEW with HOVER EXPANSION */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredGrievances.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => handleOpenDetail(g)}
                    className="p-4 rounded-xl bg-gradient-to-br from-white via-slate-50/60 to-rose-50/20 border border-rose-200/70 hover:border-rose-400 shadow-2xs hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top status indicator strip */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        g.status === 'Baru'
                          ? 'bg-rose-500'
                          : g.status === 'Diproses'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs text-slate-900 group-hover:text-rose-700 transition-colors">
                            {g.id}
                          </span>
                          <span className="text-[10px] text-slate-400">• {g.timestamp}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            g.status === 'Baru'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : g.status === 'Diproses'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {g.status}
                        </span>
                      </div>

                      {/* Category & Village */}
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-purple-900 transition-colors leading-snug">
                        {g.category}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span>{g.village}</span>
                      </p>

                      {/* Summary with clamp */}
                      <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                        &quot;{g.summary}&quot;
                      </p>
                    </div>

                    {/* Card Footer Info */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-mono">
                        Pelapor: {g.senderPhone || 'Terverifikasi Bot'}
                      </span>
                      <span className="font-bold text-purple-600 group-hover:text-purple-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>Lihat Rincian</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* TABLE VIEW with HOVER ROW EXPANSION */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">ID Laporan &amp; Waktu</th>
                      <th className="py-3 px-4">Kategori &amp; Lokasi</th>
                      <th className="py-3 px-4">Rincian Kronologi</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Rincian &amp; Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredGrievances.map((g) => (
                      <tr
                        key={g.id}
                        onClick={() => handleOpenDetail(g)}
                        className="hover:bg-purple-50/60 transition-all duration-200 cursor-pointer group"
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-slate-900 group-hover:text-purple-700 transition-colors block">
                            {g.id}
                          </span>
                          <span className="text-[10px] text-slate-400">{g.timestamp}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-800 block">{g.category}</span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>{g.village}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 text-[11px]">{g.summary}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          {g.status === 'Baru' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              Baru
                            </span>
                          )}
                          {g.status === 'Diproses' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              Diproses
                            </span>
                          )}
                          {g.status === 'Selesai' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Selesai
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div
                            className="flex items-center justify-end gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(g)}
                              className="px-2.5 py-1 text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 flex items-center gap-1"
                            >
                              <Info className="w-3 h-3" />
                              <span>Rincian</span>
                            </button>

                            {g.status === 'Baru' && (
                              <button
                                type="button"
                                onClick={() => {
                                  soundEffects.playClick();
                                  onUpdateStatus(g.id, 'Diproses');
                                }}
                                className="px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                              >
                                Proses
                              </button>
                            )}

                            {g.status !== 'Selesai' && (
                              <button
                                type="button"
                                onClick={() => {
                                  soundEffects.playSuccessChime();
                                  onUpdateStatus(g.id, 'Selesai');
                                }}
                                className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                              >
                                Selesaikan
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rich Grievance Detail Modal with Comprehensive Info */}
      <GrievanceDetailModal
        item={selectedGrievance}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedGrievance(null);
        }}
        onUpdateStatus={(id, status) => {
          onUpdateStatus(id, status);
          if (selectedGrievance && selectedGrievance.id === id) {
            setSelectedGrievance({ ...selectedGrievance, status });
          }
        }}
      />
    </div>
  );
};
