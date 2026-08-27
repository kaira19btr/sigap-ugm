import React, { useState, useMemo } from 'react';
import { SatuDataItem } from '../types';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { StageDetailModal } from '../components/StageDetailModal';
import { SatuDataProfileModal, getSampleHouseholdsForVillage, BeneficiaryHousehold } from '../components/SatuDataProfileModal';
import {
  Database,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  CheckCircle2,
  Clock,
  AlertOctagon,
  ArrowUpDown,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  User,
  MapPin,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

interface SatuDataViewProps {
  dataList: SatuDataItem[];
  onOpenConflictModal: (item: SatuDataItem) => void;
  onRefreshData: () => void;
}

export const SatuDataView: React.FC<SatuDataViewProps> = ({
  dataList,
  onOpenConflictModal,
  onRefreshData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Selesai' | 'Diproses' | 'Konflik Data'>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  // Stage Modal State
  const [selectedStageNumber, setSelectedStageNumber] = useState<number | null>(null);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);

  // Profile Modal State
  const [selectedProfileItem, setSelectedProfileItem] = useState<SatuDataItem | null>(null);
  const [selectedNikTarget, setSelectedNikTarget] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Build aggregated beneficiary index for fast NIK / Citizen name search
  const allBeneficiaries = useMemo(() => {
    const list: { item: SatuDataItem; household: BeneficiaryHousehold }[] = [];
    dataList.forEach((item) => {
      const households = getSampleHouseholdsForVillage(item.village);
      households.forEach((h) => {
        list.push({ item, household: h });
      });
    });
    return list;
  }, [dataList]);

  // Direct NIK or Person Name Instant Match
  const directBeneficiaryMatches = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term || term.length < 2) return [];
    return allBeneficiaries.filter(
      (b) =>
        b.household.nik.toLowerCase().includes(term) ||
        b.household.headName.toLowerCase().includes(term) ||
        b.household.noKk.toLowerCase().includes(term)
    );
  }, [searchTerm, allBeneficiaries]);

  // Filtered Regions Table
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      const term = searchTerm.toLowerCase();
      const matchesVillage =
        item.village.toLowerCase().includes(term) ||
        item.regency.toLowerCase().includes(term);

      // Also check if any beneficiary in this village matches
      const hasMatchingBeneficiary = getSampleHouseholdsForVillage(item.village).some(
        (h) =>
          h.nik.toLowerCase().includes(term) ||
          h.headName.toLowerCase().includes(term) ||
          h.noKk.toLowerCase().includes(term)
      );

      const matchesSearch = matchesVillage || hasMatchingBeneficiary;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, searchTerm, statusFilter]);

  const handleSyncTrigger = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onRefreshData();
    }, 1000);
  };

  const handleDownloadCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Wilayah,Kabupaten,Status,Sumber Data,Kelengkapan,RT Rentan\n' +
      filteredData
        .map(
          (d) =>
            `${d.id},"${d.village}","${d.regency}",${d.status},"${d.sources.join(';')}",${d.completeness}%,${d.vulnerableHouseholds}`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SIGAP_Satu_Data_Terpadu.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenStage = (stageNum: number) => {
    setSelectedStageNumber(stageNum);
    setIsStageModalOpen(true);
  };

  const handleOpenProfile = (item: SatuDataItem, nikTarget?: string) => {
    setSelectedProfileItem(item);
    setSelectedNikTarget(nikTarget || null);
    setIsProfileModalOpen(true);
  };

  return (
    <div id="satu-data-module" className="p-6 space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Modul 02 • Satu Data Terpadu (Targeting)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Satu Data Terpadu Perlindungan Sosial
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Integrasi data lintas kementerian dan lembaga untuk profil kerentanan yang akurat
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            id="btn-sync-dtks-nasional"
            onClick={handleSyncTrigger}
            disabled={isSyncing}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sinkronisasi...' : 'Sinkronkan DTKS'}</span>
          </button>
          <button
            id="btn-download-csv"
            onClick={handleDownloadCsv}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Pipeline / Funnel KPI Cards (Hover Expand + Click Detail + Number Count Animation) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tahapan Pipa Pemrosesan Data (Klik untuk melihat SOP & Detail Validasi)</span>
          </div>
          <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            Interaktif 4 Tahap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div
            id="stage-card-1"
            onClick={() => handleOpenStage(1)}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:ring-2 hover:ring-blue-400/30 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-blue-600 transition-colors">
                Tahap 1
              </div>
              <span className="text-[10px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Detail</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-blue-950">
              Registrasi Lapangan
            </div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={15755} duration={1200} suffix=" KK" />
            </div>
            <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Total terdata masuk</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200 group-hover:text-blue-100 font-mono text-3xl font-extrabold select-none transition-colors">
              01
            </div>
          </div>

          {/* Step 2 */}
          <div
            id="stage-card-2"
            onClick={() => handleOpenStage(2)}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-indigo-400 hover:ring-2 hover:ring-indigo-400/30 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-indigo-500 uppercase group-hover:text-indigo-700 transition-colors">
                Tahap 2
              </div>
              <span className="text-[10px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Detail</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-indigo-950">
              Pencocokan & Deduplikasi
            </div>
            <div className="text-2xl font-extrabold font-mono text-indigo-600 mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={89.2} duration={1200} decimals={1} suffix="%" />
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>14.053 KK klir NIK</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200 group-hover:text-indigo-100 font-mono text-3xl font-extrabold select-none transition-colors">
              02
            </div>
          </div>

          {/* Step 3 */}
          <div
            id="stage-card-3"
            onClick={() => handleOpenStage(3)}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/30 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-amber-500 uppercase group-hover:text-amber-700 transition-colors">
                Tahap 3
              </div>
              <span className="text-[10px] font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Detail</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-amber-950">
              Integrasi Profil Terbuka
            </div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={13210} duration={1200} suffix=" KK" />
            </div>
            <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Siap penyaluran bantuan</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200 group-hover:text-amber-100 font-mono text-3xl font-extrabold select-none transition-colors">
              03
            </div>
          </div>

          {/* Step 4 */}
          <div
            id="stage-card-4"
            onClick={() => handleOpenStage(4)}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-emerald-400 hover:ring-2 hover:ring-emerald-400/30 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-emerald-500 uppercase group-hover:text-emerald-700 transition-colors">
                Tahap 4
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Detail</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-emerald-950">
              Audit & Rekonsiliasi
            </div>
            <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={100} duration={1200} suffix="%" />
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Kepatuhan ISO/BPK</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200 group-hover:text-emerald-100 font-mono text-3xl font-extrabold select-none transition-colors">
              04
            </div>
          </div>
        </div>
      </div>

      {/* Main Table & Instant Search Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters & Toolbar */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-indigo-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="search-satu-data"
                  type="text"
                  placeholder="Cari wilayah, desa, NIK (16 digit), atau nama kepala keluarga..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 transition-all font-medium"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Semua Status
                </button>
                <button
                  onClick={() => setStatusFilter('Selesai')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    statusFilter === 'Selesai' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Selesai
                </button>
                <button
                  onClick={() => setStatusFilter('Diproses')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    statusFilter === 'Diproses' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Diproses
                </button>
                <button
                  onClick={() => setStatusFilter('Konflik Data')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    statusFilter === 'Konflik Data' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Konflik
                </button>
              </div>
            </div>
          </div>

          {/* Instant Citizen / NIK Search Match Ribbon */}
          {directBeneficiaryMatches.length > 0 && (
            <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-indigo-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>Hasil Instan Pencarian NIK / Warga ({directBeneficiaryMatches.length} Ditemukan)</span>
                </span>
                <span className="text-[10px] text-indigo-600 font-mono">
                  Kata Kunci: &quot;{searchTerm}&quot;
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {directBeneficiaryMatches.map(({ item, household }) => (
                  <div
                    key={household.nik}
                    className="p-2.5 bg-white rounded-lg border border-indigo-100 shadow-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">{household.headName}</div>
                      <div className="text-[10px] font-mono text-indigo-600 font-semibold">
                        NIK: {household.nik}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.village} • Desil {household.desilRegsosek}
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenProfile(item, household.nik)}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-md shadow-xs transition-colors shrink-0"
                    >
                      Buka Profil
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Wilayah / Kelurahan</th>
                <th className="py-3 px-4">Status Integrasi</th>
                <th className="py-3 px-4">Sumber Data Terkait</th>
                <th className="py-3 px-4">Tingkat Kelengkapan</th>
                <th className="py-3 px-4">RT Rentan Terdata</th>
                <th className="py-3 px-4 text-right">Aksi Profil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    <p className="text-sm font-semibold text-slate-600">Tidak ada data wilayah atau NIK yang cocok</p>
                    <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian desa, kabupaten, atau NIK lainnya.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.village}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.regency}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.status === 'Selesai' && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Selesai</span>
                        </span>
                      )}
                      {item.status === 'Diproses' && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>Diproses</span>
                        </span>
                      )}
                      {item.status === 'Konflik Data' && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 animate-pulse">
                          <AlertOctagon className="w-3 h-3" />
                          <span>Konflik Data</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.sources.map((src) => (
                          <span
                            key={src}
                            className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-800 mb-1">
                          <span>{item.completeness}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              item.completeness >= 90
                                ? 'bg-emerald-500'
                                : item.completeness >= 60
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${item.completeness}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {item.vulnerableHouseholds.toLocaleString('id-ID')} KK
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'Konflik Data' && (
                          <button
                            onClick={() => onOpenConflictModal(item)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors"
                          >
                            Selesaikan Konflik
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenProfile(item)}
                          className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-all border border-indigo-200 shadow-xs flex items-center gap-1.5"
                        >
                          <span>Lihat Profil</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Detail SOP & Validation Modal */}
      <StageDetailModal
        stepNumber={selectedStageNumber}
        isOpen={isStageModalOpen}
        onClose={() => setIsStageModalOpen(false)}
        onSelectStep={(num) => setSelectedStageNumber(num)}
      />

      {/* Rich Satu Data Profile Modal */}
      <SatuDataProfileModal
        item={selectedProfileItem}
        selectedNik={selectedNikTarget}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedNikTarget(null);
        }}
      />
    </div>
  );
};
