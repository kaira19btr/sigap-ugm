import React, { useState, useMemo } from 'react';
import { SatuDataItem, UserRole, UserProfile, AppModule } from '../types';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { StageDetailModal } from '../components/StageDetailModal';
import { SatuDataProfileModal, getSampleHouseholdsForVillage, BeneficiaryHousehold } from '../components/SatuDataProfileModal';
import { GradientButton } from '@/components/ui/gradient-button';
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
  FileQuestion,
  Scale,
  AlertTriangle,
  BellRing,
  HelpCircle,
  ShieldAlert,
  Lock,
  Building2,
  Network,
  ArrowRight,
  Share2,
  HeartPulse,
  Briefcase,
  Shield,
  Zap,
  Users,
  CheckCheck,
  Compass,
} from 'lucide-react';

interface SatuDataViewProps {
  dataList: SatuDataItem[];
  onOpenConflictModal: (item: SatuDataItem) => void;
  onRefreshData: () => void;
  currentRole?: UserRole;
  activeProfile?: UserProfile;
  onNavigate?: (module: AppModule) => void;
}

export const SatuDataView: React.FC<SatuDataViewProps> = ({
  dataList,
  onOpenConflictModal,
  onRefreshData,
  currentRole = 'admin_pusat',
  activeProfile,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Selesai' | 'Diproses' | 'Konflik Data'>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  // Role-Based Access Control (RBAC) Scoping
  const isDaerah = currentRole === 'admin_daerah';
  const targetRegionName = activeProfile?.region || 'Kab. Cianjur';

  const scopedDataList = useMemo(() => {
    if (isDaerah) {
      return dataList.filter((item) =>
        item.regency.toLowerCase().includes('cianjur') ||
        item.regency.toLowerCase().includes(targetRegionName.toLowerCase())
      );
    }
    return dataList;
  }, [dataList, isDaerah, targetRegionName]);

  // Stage Modal State
  const [selectedStageNumber, setSelectedStageNumber] = useState<number | null>(null);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);

  // Profile Modal State
  const [selectedProfileItem, setSelectedProfileItem] = useState<SatuDataItem | null>(null);
  const [selectedNikTarget, setSelectedNikTarget] = useState<string | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'beneficiaries' | 'vulnerability' | 'audit' | 'referrals'>('beneficiaries');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Dynamic funnel stats from scoped dataset
  const totalTargetKk = useMemo(() => scopedDataList.reduce((acc, i) => acc + (i.totalTarget || 0), 0), [scopedDataList]);
  const totalMatchedKk = useMemo(() => scopedDataList.reduce((acc, i) => acc + (i.matched || 0), 0), [scopedDataList]);
  const totalDiscrepanciesKk = useMemo(() => scopedDataList.reduce((acc, i) => acc + (i.discrepancies || 0), 0), [scopedDataList]);
  const matchPercentage = useMemo(() => {
    if (!totalTargetKk) return 89.2;
    return Math.round((totalMatchedKk / totalTargetKk) * 1000) / 10;
  }, [totalTargetKk, totalMatchedKk]);
  const readyKk = useMemo(() => totalMatchedKk - totalDiscrepanciesKk, [totalMatchedKk, totalDiscrepanciesKk]);

  // Build aggregated beneficiary index for fast NIK / Citizen name search
  const allBeneficiaries = useMemo(() => {
    const list: { item: SatuDataItem; household: BeneficiaryHousehold }[] = [];
    scopedDataList.forEach((item) => {
      const households = getSampleHouseholdsForVillage(item.village);
      households.forEach((h) => {
        list.push({ item, household: h });
      });
    });
    return list;
  }, [scopedDataList]);

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
    return scopedDataList.filter((item) => {
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
  }, [scopedDataList, searchTerm, statusFilter]);

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
    link.setAttribute('download', 'SIGAP_Satu_Data_Terpadu_DTSEN.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenStage = (stageNum: number) => {
    setSelectedStageNumber(stageNum);
    setIsStageModalOpen(true);
  };

  const handleOpenProfile = (
    item: SatuDataItem,
    nikTarget?: string,
    targetTab: 'beneficiaries' | 'vulnerability' | 'audit' | 'referrals' = 'beneficiaries'
  ) => {
    setSelectedProfileItem(item);
    setSelectedNikTarget(nikTarget || null);
    setModalInitialTab(targetTab);
    setIsProfileModalOpen(true);
  };

  // Sample curated households for the quick referral discovery bar
  const quickReferralHighlights = useMemo(() => {
    if (scopedDataList.length === 0) return [];
    const firstVillage = scopedDataList[0];
    const households = getSampleHouseholdsForVillage(firstVillage.village);
    return households.slice(0, 4).map((h) => ({
      household: h,
      item: firstVillage,
    }));
  }, [scopedDataList]);

  return (
    <div id="satu-data-module" className="p-6 space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Modul 02 • Satu Data Terpadu (Targeting)</span>
            {isDaerah && (
              <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Cakupan Wilayah Kerja: {targetRegionName}</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {isDaerah ? `Satu Data Terpadu • ${targetRegionName}` : 'Satu Data Terpadu Perlindungan Sosial'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            {isDaerah
              ? `Menyambungkan profil DTSEN wilayah ${targetRegionName} (${scopedDataList.length} kelurahan/desa) ke sinyal guncangan real-time dengan penanganan akurasi desil berbasis RBAC`
              : 'Menyambungkan DTSEN (basis data tunggal sejak Feb 2025) ke sinyal guncangan real-time, dengan penanganan akurasi klasifikasi desil'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <GradientButton
            id="btn-sync-dtks-nasional"
            size="sm"
            variant="variant"
            onClick={handleSyncTrigger}
            disabled={isSyncing}
            className="!text-xs !py-1.5 !px-3"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 text-sky-300 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sinkronisasi...' : isDaerah ? 'Sinkronkan DTSEN Wilayah' : 'Sinkronkan DTSEN'}</span>
          </GradientButton>
          <GradientButton
            id="btn-download-csv"
            size="sm"
            variant="cobalt"
            onClick={handleDownloadCsv}
            className="!text-xs !py-1.5 !px-3 shadow-xs shadow-indigo-600/20"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Ekspor CSV</span>
          </GradientButton>
        </div>
      </div>

      {/* RBAC Notification Banner */}
      {isDaerah && (
        <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50/50 border border-amber-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
            </div>
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900">Hak Akses Role-Based Access Control (Daerah): </span>
              <span>
                Menampilkan data penerima dan kelurahan di yurisdiksi <strong>{targetRegionName}</strong> ({activeProfile?.roleLabel || 'Dinas Sosial Daerah'}). Data wilayah luar dibatasi demi kepatuhan <em>Privacy by Design</em>.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold bg-amber-200/70 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
            {scopedDataList.length} Desa/Kelurahan
          </span>
        </div>
      )}

      {/* 4 Pipeline / Funnel KPI Cards (Hover Expand + Click Detail + Number Count Animation) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-600" />
            <span>Tahapan Pipa Pemrosesan Data (Klik untuk melihat SOP &amp; Detail Validasi)</span>
          </div>
          <span className="text-[10px] text-rose-700 font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            Interaktif 4 Tahap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div
            id="stage-card-1"
            onClick={() => handleOpenStage(1)}
            className="bg-gradient-to-br from-white via-blue-50/40 to-rose-50/20 p-4 rounded-xl border border-blue-200/80 shadow-xs relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:ring-2 hover:ring-blue-400/30 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-blue-600 uppercase group-hover:text-blue-700 transition-colors">
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
              <AnimatedCounter value={totalTargetKk || 15755} duration={1200} suffix=" KK" />
            </div>
            <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>{isDaerah ? `Profil DTSEN ${targetRegionName}` : 'Total profil DTSEN tersambung'}</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200/60 group-hover:text-blue-200/60 font-mono text-3xl font-extrabold select-none transition-colors">
              01
            </div>
          </div>

          {/* Step 2 */}
          <div
            id="stage-card-2"
            onClick={() => handleOpenStage(2)}
            className="bg-gradient-to-br from-white via-indigo-50/40 to-rose-50/20 p-4 rounded-xl border border-indigo-200/80 shadow-xs relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-indigo-400 hover:ring-2 hover:ring-indigo-400/30 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-rose-600"></div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-indigo-600 uppercase group-hover:text-indigo-700 transition-colors">
                Tahap 2
              </div>
              <span className="text-[10px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Detail</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-indigo-950">
              Pencocokan &amp; Deduplikasi
            </div>
            <div className="text-2xl font-extrabold font-mono text-indigo-600 mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={matchPercentage} duration={1200} decimals={1} suffix="%" />
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{totalMatchedKk.toLocaleString('id-ID')} KK klir NIK</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200/60 group-hover:text-indigo-200/60 font-mono text-3xl font-extrabold select-none transition-colors">
              02
            </div>
          </div>

          {/* Step 3 */}
          <div
            id="stage-card-3"
            onClick={() => handleOpenStage(3)}
            className="bg-gradient-to-br from-white via-amber-50/40 to-rose-50/20 p-4 rounded-xl border border-amber-200/80 shadow-xs relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/30 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500"></div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-amber-600 uppercase group-hover:text-amber-700 transition-colors">
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
              <AnimatedCounter value={readyKk > 0 ? readyKk : 13210} duration={1200} suffix=" KK" />
            </div>
            <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Siap penyaluran bantuan</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200/60 group-hover:text-amber-200/60 font-mono text-3xl font-extrabold select-none transition-colors">
              03
            </div>
          </div>

          {/* Step 4 */}
          <div
            id="stage-card-4"
            onClick={() => handleOpenStage(4)}
            className="bg-gradient-to-br from-white via-rose-50/40 to-amber-50/20 p-4 rounded-xl border border-rose-200/80 shadow-xs relative overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-rose-400 hover:ring-2 hover:ring-rose-400/30 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600"></div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-rose-600 uppercase group-hover:text-rose-700 transition-colors">
                Tahap 4
              </div>
              <span className="text-[10px] font-semibold text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Detail</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 group-hover:text-rose-950">
              Audit &amp; Rekonsiliasi
            </div>
            <div className="text-2xl font-extrabold font-mono text-rose-600 mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={100} duration={1200} suffix="%" />
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Kepatuhan ISO/BPK</span>
            </div>
            <div className="absolute top-3 right-3 text-slate-200/60 group-hover:text-rose-200/60 font-mono text-3xl font-extrabold select-none transition-colors">
              04
            </div>
          </div>
        </div>
      </div>

      {/* NEW PANEL D: Kualitas & Sanggah Klasifikasi DTSEN */}
      <div
        id="panel-kualitas-sanggah-dtsen"
        className="bg-white rounded-xl border border-rose-200/80 p-5 shadow-xs relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Kualitas &amp; Sanggah Klasifikasi DTSEN
                </h3>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <BellRing className="w-2.5 h-2.5" />
                  Mekanisme Sanggah Aktif
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
                Menampung dan menindaklanjuti kasus kesalahan klasifikasi desil (mengacu temuan Komisi X DPR RI, Mei 2026)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start">
            <span className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
              Siklus Validasi: <strong>Mei - Agustus 2026</strong>
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="p-3.5 bg-gradient-to-br from-rose-50/50 to-white rounded-xl border border-rose-200/70 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span>Kasus Sanggah Masuk Bulan Ini</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-rose-600 mt-1.5 flex items-baseline gap-1">
              <AnimatedCounter value={34} duration={1000} suffix=" Kasus" />
            </div>
            <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
              <span>Laporan salah desil &amp; exclusion error warga</span>
            </div>
          </div>

          <div className="p-3.5 bg-gradient-to-br from-emerald-50/50 to-white rounded-xl border border-emerald-200/70 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span>Sudah Diverifikasi Ulang</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-1.5 flex items-baseline gap-1">
              <AnimatedCounter value={28} duration={1000} suffix=" Kasus" />
              <span className="text-xs font-semibold text-slate-500 font-sans">(82.4%)</span>
            </div>
            <div className="text-[10px] text-emerald-700 mt-1 font-medium">
              Berhasil disesuaikan ke desil aktual di DTSEN
            </div>
          </div>

          <div className="p-3.5 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-200/70 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span>Dalam Verifikasi Lapangan</span>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-amber-600 mt-1.5 flex items-baseline gap-1">
              <AnimatedCounter value={6} duration={1000} suffix=" Kasus" />
            </div>
            <div className="text-[10px] text-amber-700 mt-1 font-medium">
              Proses kaji ulang bersama pendamping sosial
            </div>
          </div>
        </div>

        {/* Critical Policy Note on Confidence Score */}
        <div className="bg-gradient-to-r from-amber-50/80 via-rose-50/40 to-indigo-50/40 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <p className="font-bold text-amber-950 flex items-center gap-1.5">
              <span>Pengaruh Terhadap Alokasi Bansos Adaptif:</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-rose-900 font-semibold underline decoration-rose-300 underline-offset-2">
                Wilayah dengan riwayat sanggah tinggi otomatis mendapat Confidence Score lebih rendah di Modul 03
              </strong>
              , sehingga sistem otomatis menerapkan buffer mitigasi risiko untuk memastikan tidak ada korban rentan yang tertinggal (*no one left behind*).
            </p>
          </div>
        </div>
      </div>

      {/* NEW PROMINENT SECTION: PUSAT REKOMENDASI & RUJUKAN PROGRAM LINTAS K/L */}
      <div
        id="hub-rujukan-multi-kl"
        className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-700/60 p-5.5 text-white shadow-xl relative overflow-hidden"
      >
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 border-b border-indigo-900/60 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold shadow-lg shrink-0 ring-2 ring-indigo-400/30">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>Pusat Rujukan &amp; Rekomendasi Program Lintas K/L</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-400/40">
                    Trigger Engine Layer
                  </span>
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>SPBE Terpadu Aktif</span>
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 mt-1 max-w-3xl leading-relaxed">
                Basis data Satu Data DTSEN dikomputasi secara otomatis oleh mesin <em>Trigger Engine</em> menjadi tiket rekomendasi rujukan program intervensi spesifik ke 3 Pilar K/L teknis pengampu.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            {scopedDataList.length > 0 && (
              <button
                onClick={() => handleOpenProfile(scopedDataList[0], undefined, 'referrals')}
                className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-indigo-50 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-indigo-100 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Buka Panel Rujukan Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5 text-indigo-600" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-5 relative z-10">
          {/* Pilar 1: Kemensos / BNPB */}
          <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/60 rounded-xl p-4 transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs border border-rose-500/30">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-rose-300 uppercase block font-semibold">Pilar 01 • Kemensos / BNPB</span>
                  <span className="text-xs font-bold text-white group-hover:text-rose-200 transition-colors">SIGAP SHIELD (Proteksi Cepat)</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                92% Siap
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-2xl font-extrabold font-mono text-white">
                <AnimatedCounter value={3842} duration={1000} suffix=" KK" />
              </div>
              <span className="text-[11px] text-slate-300 font-sans">Rujukan BLT &amp; Logistik</span>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
              Top-up bansos darurat, buffer sembako kilat, dan transfer tunai adaptif pasca guncangan.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Target Salur: &lt; 48 Jam</span>
              {scopedDataList.length > 0 && (
                <button
                  onClick={() => handleOpenProfile(scopedDataList[0], undefined, 'referrals')}
                  className="text-[11px] font-bold text-rose-300 hover:text-rose-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Cek Rujukan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Pilar 2: Kemenkes / Dinkes */}
          <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/60 rounded-xl p-4 transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-300 uppercase block font-semibold">Pilar 02 • Kemenkes / Dinkes</span>
                  <span className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors">SIGAP CONVERGE (Gizi &amp; Sanitasi)</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                88% Outreach
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-2xl font-extrabold font-mono text-white">
                <AnimatedCounter value={1420} duration={1000} suffix=" Jiwa" />
              </div>
              <span className="text-[11px] text-slate-300 font-sans">Balita, Ibu Hamil &amp; Lansia</span>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
              Pemberian Makanan Tambahan (PMT) lokal, intervensi stunting gawat, dan renovasi jamban sehat.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Jalur: Posyandu Prima &amp; Puskesmas</span>
              {scopedDataList.length > 0 && (
                <button
                  onClick={() => handleOpenProfile(scopedDataList[0], undefined, 'referrals')}
                  className="text-[11px] font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Cek Rujukan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Pilar 3: Kemenko Perekonomian / Kemenkop / BUMN */}
          <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 rounded-xl p-4 transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase block font-semibold">Pilar 03 • Kemenko / BUMN</span>
                  <span className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">SIGAP RISE (Inklusi Produktif)</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                Pasca-Stabil
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-2xl font-extrabold font-mono text-white">
                <AnimatedCounter value={980} duration={1000} suffix=" KPM" />
              </div>
              <span className="text-[11px] text-slate-300 font-sans">Vokasi &amp; Graduasi KUR</span>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
              Pelatihan vokasi praktis, hibah aset produktif, dan fasilitasi pembiayaan mikro KUR perbankan Himbara.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Siklus: 18 Bulan Graduasi</span>
              {scopedDataList.length > 0 && (
                <button
                  onClick={() => handleOpenProfile(scopedDataList[0], undefined, 'referrals')}
                  className="text-[11px] font-bold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Cek Rujukan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Citizen Referral Shortcuts Bar */}
        <div className="mt-4 pt-4 border-t border-indigo-900/60 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-200">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Akses Cepat Hasil Pencocokan Rujukan per Kepala Keluarga Terdata:</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Klik nama keluarga di bawah untuk membuka kartu rujukan K/L langsung
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {quickReferralHighlights.map(({ household, item }) => (
              <div
                key={household.nik}
                onClick={() => handleOpenProfile(item, household.nik, 'referrals')}
                className="p-3 bg-slate-800/90 hover:bg-slate-700/90 rounded-xl border border-slate-700 hover:border-indigo-400 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-200 truncate">
                      {household.headName}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-700/60 shrink-0">
                      Desil {household.desilRegsosek}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-300/80 mt-0.5 truncate">
                    NIK: {household.nik}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {household.vulnerabilityNotes[0] || 'Keluarga rentan terindikasi'}
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Rujukan Multi-Pilar</span>
                  </span>
                  <span className="text-[10px] font-bold text-indigo-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span>Lihat</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table & Instant Search Section */}
      <div className="bg-gradient-to-br from-white via-slate-50/70 to-rose-50/20 rounded-xl border border-rose-200/60 shadow-sm overflow-hidden">
        {/* Table Filters & Toolbar */}
        <div className="p-4 border-b border-rose-100/80 space-y-3 bg-gradient-to-r from-white via-rose-50/20 to-amber-50/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-rose-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="search-satu-data"
                  type="text"
                  placeholder="Cari wilayah, desa, NIK (16 digit), atau nama kepala keluarga..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-rose-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-800 transition-all font-medium shadow-2xs"
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
              <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    statusFilter === 'all' ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Status
                </button>
                <button
                  onClick={() => setStatusFilter('Selesai')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    statusFilter === 'Selesai' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Selesai
                </button>
                <button
                  onClick={() => setStatusFilter('Diproses')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    statusFilter === 'Diproses' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Diproses
                </button>
                <button
                  onClick={() => setStatusFilter('Konflik Data')}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
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
            <div className="p-3 bg-gradient-to-r from-rose-50 via-amber-50/50 to-blue-50 border border-rose-200 rounded-xl space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-rose-950 font-bold">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-rose-600" />
                  <span>Hasil Instan Pencarian NIK / Warga ({directBeneficiaryMatches.length} Ditemukan)</span>
                </span>
                <span className="text-[10px] text-rose-600 font-mono">
                  Kata Kunci: &quot;{searchTerm}&quot;
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {directBeneficiaryMatches.map(({ item, household }) => (
                  <div
                    key={household.nik}
                    className="p-2.5 bg-white rounded-lg border border-rose-200/70 shadow-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">{household.headName}</div>
                      <div className="text-[10px] font-mono text-rose-600 font-semibold">
                        NIK: {household.nik}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.village} • Desil {household.desilRegsosek} (DTSEN)
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenProfile(item, household.nik, 'referrals')}
                        className="px-2.5 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        title="Buka Rujukan & Rekomendasi Program Langsung"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Rujukan</span>
                      </button>
                      <button
                        onClick={() => handleOpenProfile(item, household.nik, 'beneficiaries')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-md transition-colors cursor-pointer"
                        title="Lihat Profil Lengkap"
                      >
                        Profil
                      </button>
                    </div>
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
                <th className="py-3 px-4">
                  <div className="flex items-center gap-1 group/th relative cursor-help" title="Kelengkapan dihitung dari kelengkapan profil DTSEN + konektivitas ke data BNPB, ketenagakerjaan, dan harga pangan">
                    <span>Tingkat Kelengkapan</span>
                    <Info className="w-3 h-3 text-slate-400 group-hover/th:text-indigo-600 transition-colors" />
                  </div>
                </th>
                <th className="py-3 px-4">RT Rentan Terdata</th>
                <th className="py-3 px-4 text-right">Rujukan &amp; Aksi Profil</th>
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
                    {/* B. Sumber Data with DTSEN main badge + external shock sources + update note */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Main DTSEN badge representing DTKS + Regsosek + P3KE */}
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-indigo-900 text-indigo-100 px-2 py-0.5 rounded border border-indigo-700 shadow-2xs">
                            <Database className="w-2.5 h-2.5 text-indigo-300" />
                            <span>DTSEN</span>
                          </span>

                          {/* Companion shock/specialized sources not yet in DTSEN */}
                          {item.sources
                            .filter((src) => src !== 'DTSEN' && src !== 'DTKS' && src !== 'Regsosek')
                            .map((src) => {
                              const isBnpb = src.includes('BNPB');
                              const isPangan = src.includes('Pangan') || src.includes('Inflasi');
                              const isKerja = src.includes('Ketenagakerjaan') || src.includes('Informal');
                              return (
                                <span
                                  key={src}
                                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                                    isBnpb
                                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                                      : isPangan
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : isKerja
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : 'bg-slate-100 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  {src}
                                </span>
                              );
                            })}
                        </div>
                        <div className="text-[9px] text-slate-500 font-sans flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                          <span>Update otomatis: Dukcapil, BPJS Ketenagakerjaan, PLN</span>
                        </div>
                      </div>
                    </td>
                    {/* E. Tingkat Kelengkapan with Tooltip / Hover explainer */}
                    <td className="py-3.5 px-4">
                      <div
                        className="w-36 group/tooltip relative cursor-help"
                        title="Kelengkapan dihitung dari kelengkapan profil DTSEN + konektivitas ke data BNPB, ketenagakerjaan, dan harga pangan"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-800 mb-1">
                          <span>{item.completeness}%</span>
                          <span className="text-[9px] font-normal text-slate-400 group-hover/tooltip:text-indigo-600 transition-colors">
                            Hover info
                          </span>
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
                        <div className="text-[9px] text-slate-400 mt-1 truncate">
                          DTSEN + Sinyal Guncangan
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {item.vulnerableHouseholds.toLocaleString('id-ID')} KK
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === 'Konflik Data' && (
                          <GradientButton
                            size="sm"
                            variant="rose"
                            onClick={() => onOpenConflictModal(item)}
                            className="!min-w-0 !py-1 !px-2.5 !text-xs"
                          >
                            Selesaikan
                          </GradientButton>
                        )}
                        <GradientButton
                          size="sm"
                          variant="cobalt"
                          onClick={() => handleOpenProfile(item, undefined, 'referrals')}
                          className="!min-w-0 !py-1 !px-2.5 !text-xs"
                          title="Buka Pusat Rujukan Lintas K/L untuk Wilayah Ini"
                        >
                          <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
                          <span>Rujukan K/L</span>
                        </GradientButton>
                        <button
                          onClick={() => handleOpenProfile(item, undefined, 'beneficiaries')}
                          className="px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-all border border-slate-300 shadow-xs flex items-center gap-1 cursor-pointer"
                          title="Buka Profil Lengkap & Daftar NIK"
                        >
                          <span>Profil</span>
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
        initialTab={modalInitialTab}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedNikTarget(null);
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};

