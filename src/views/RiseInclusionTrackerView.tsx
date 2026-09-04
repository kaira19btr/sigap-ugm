import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import {
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Coins,
  ChevronRight,
  Filter,
  Search,
  UserCheck,
  Building,
  GraduationCap,
  Shield,
  HelpCircle,
  Eye,
  X,
  LayoutGrid,
  ListFilter,
  BarChart3,
  Calendar,
  MapPin,
  Store,
  FileCheck,
  Check,
} from 'lucide-react';

export type GraduationStage = 'Stabilize' | 'Assess' | 'Build' | 'Connect' | 'Graduate';

export interface BeneficiaryCohort {
  id: string;
  headName: string;
  nik: string;
  regency: string;
  village: string;
  stage: GraduationStage;
  businessSector: string;
  productiveAsset: string;
  incomeMonthly: number; // in IDR
  povertyLineRatio: number; // e.g. 1.35x
  durationMonths: number;
  mentorName: string;
  savingsBalance: number;
  trainingCompleted: string;
  marketAccess: string;
}

const INITIAL_COHORTS: BeneficiaryCohort[] = [
  // Stage 1: Stabilize
  {
    id: 'kpm-001',
    headName: 'Siti Aminah',
    nik: '3203015409820001',
    regency: 'Kab. Cianjur',
    village: 'Desa Nagrak',
    stage: 'Stabilize',
    businessSector: 'Olahan Keripik Singkong',
    productiveAsset: 'Paket Kompor & Wajan Industri',
    incomeMonthly: 1200000,
    povertyLineRatio: 0.85,
    durationMonths: 2,
    mentorName: 'Dadan Suhendar (Pendamping PKH)',
    savingsBalance: 450000,
    trainingCompleted: 'Modul Higienitas & Pengemasan Pangan',
    marketAccess: 'Warung Lokal & Posyandu Prima',
  },
  {
    id: 'kpm-002',
    headName: 'Umbu Maramba',
    nik: '5311021208790003',
    regency: 'Kab. Sumba Timur',
    village: 'Desa Palakahembi',
    stage: 'Stabilize',
    businessSector: 'Budidaya Jagung & Sorgum',
    productiveAsset: 'Bibit Unggul & Pompa Air Tenaga Surya',
    incomeMonthly: 950000,
    povertyLineRatio: 0.72,
    durationMonths: 3,
    mentorName: 'Yosep Ratu (Tenaga Pendamping)',
    savingsBalance: 320000,
    trainingCompleted: 'Konservasi Tanah & Irigasi Tetes',
    marketAccess: 'Pengepul Komoditas Desa',
  },

  // Stage 2: Assess
  {
    id: 'kpm-003',
    headName: 'Rukmana',
    nik: '3203041103850002',
    regency: 'Kab. Cianjur',
    village: 'Desa Cibulakan',
    stage: 'Assess',
    businessSector: 'Perbengkelan Sepeda Motor',
    productiveAsset: 'Kompresor & Toolset Mekanik',
    incomeMonthly: 1850000,
    povertyLineRatio: 1.05,
    durationMonths: 5,
    mentorName: 'Dadan Suhendar',
    savingsBalance: 1200000,
    trainingCompleted: 'Mekanik Mesin 4-Tak & Injeksi',
    marketAccess: 'Pelanggan Komuter Desa Cibulakan',
  },
  {
    id: 'kpm-004',
    headName: 'Maria Barek',
    nik: '5306014407900004',
    regency: 'Kab. Flores Timur',
    village: 'Desa Boru',
    stage: 'Assess',
    businessSector: 'Tenun Ikat Tradisional',
    productiveAsset: 'Alat Tenun Gedogan & Benang Sutra',
    incomeMonthly: 1600000,
    povertyLineRatio: 0.98,
    durationMonths: 4,
    mentorName: 'Sr. Fransiska',
    savingsBalance: 980000,
    trainingCompleted: 'Pewarnaan Alami & Pola Etnik',
    marketAccess: 'Sentra Tenun & Galeri Budaya Flores',
  },

  // Stage 3: Build
  {
    id: 'kpm-005',
    headName: 'Suryadi Pratama',
    nik: '3321051508880005',
    regency: 'Kab. Demak',
    village: 'Desa Sayung',
    stage: 'Build',
    businessSector: 'Budidaya Bandeng & Tambak Terpal',
    productiveAsset: 'Kolam Bioflok & Pakan Mandiri',
    incomeMonthly: 2600000,
    povertyLineRatio: 1.28,
    durationMonths: 9,
    mentorName: 'Agus Purnomo (Penyuluh Perikanan)',
    savingsBalance: 2400000,
    trainingCompleted: 'Manajemen Kualitas Air Bioflok',
    marketAccess: 'Pasar Ikan Tradisional Demak',
  },
  {
    id: 'kpm-006',
    headName: 'Yohanes Kambu',
    nik: '9304011202860007',
    regency: 'Kab. Asmat',
    village: 'Desa Agats',
    stage: 'Build',
    businessSector: 'Kerajinan Ukir Kayu Asmat',
    productiveAsset: 'Pahat Ukir & Workshop Komunal',
    incomeMonthly: 2300000,
    povertyLineRatio: 1.20,
    durationMonths: 8,
    mentorName: 'Marthin Waromi',
    savingsBalance: 1950000,
    trainingCompleted: 'Finishing Kayu & Standardisasi Souvenir',
    marketAccess: 'Dekranasda Papua & Wisatawan Asmat',
  },

  // Stage 4: Connect
  {
    id: 'kpm-007',
    headName: 'Eni Suryani',
    nik: '3203026504840001',
    regency: 'Kab. Cianjur',
    village: 'Desa Sarampad',
    stage: 'Connect',
    businessSector: 'Katering Makanan Sehat & Snack',
    productiveAsset: 'Etalase & Modal Kerja KUR Rp 10 Juta',
    incomeMonthly: 3800000,
    povertyLineRatio: 1.65,
    durationMonths: 14,
    mentorName: 'Dadan Suhendar & Bank BRI Unit',
    savingsBalance: 4600000,
    trainingCompleted: 'Pencatatan Keuangan Digital & QRIS',
    marketAccess: 'Suplai Makan Siang Sekolah & UMKM Mart',
  },
  {
    id: 'kpm-008',
    headName: 'Rambu Ana',
    nik: '5311035510870002',
    regency: 'Kab. Sumba Timur',
    village: 'Desa Lamboya',
    stage: 'Connect',
    businessSector: 'Peternakan Ayam Kampung & Telur',
    productiveAsset: 'Kandang 300 Ekor & Kemitraan Koperasi',
    incomeMonthly: 3400000,
    povertyLineRatio: 1.52,
    durationMonths: 16,
    mentorName: 'Yosep Ratu & Koperasi Sumba',
    savingsBalance: 3900000,
    trainingCompleted: 'Manajemen Pakan Mandiri & Biosecurity',
    marketAccess: 'Kemitraan Koperasi Produsen & Hotel Sumba',
  },

  // Stage 5: Graduate
  {
    id: 'kpm-009',
    headName: 'Bambang Irawan',
    nik: '3321021406830004',
    regency: 'Kab. Demak',
    village: 'Desa Karanganyar',
    stage: 'Graduate',
    businessSector: 'Bengkel Las & Konstruksi Baja Ringan',
    productiveAsset: 'Mesin Las Inverter & Truk Pick-up',
    incomeMonthly: 5800000,
    povertyLineRatio: 2.45,
    durationMonths: 22,
    mentorName: 'Telah Mandiri (Alumni Graduasi PKH)',
    savingsBalance: 7500000,
    trainingCompleted: 'Sertifikasi K3 & Fabrikasi Konstruksi',
    marketAccess: 'Kontraktor Perumahan & Toko Material Demak',
  },
  {
    id: 'kpm-010',
    headName: 'Ibu Halimah',
    nik: '3203054506810008',
    regency: 'Kab. Cianjur',
    village: 'Desa Sukamulya',
    stage: 'Graduate',
    businessSector: 'Grosir Sembako & Agen BRILink',
    productiveAsset: 'Toko Kelontong & EDC Mini ATM',
    incomeMonthly: 6200000,
    povertyLineRatio: 2.70,
    durationMonths: 24,
    mentorName: 'Telah Mandiri (Alumni Graduasi PKH)',
    savingsBalance: 8900000,
    trainingCompleted: 'Keagenan Perbankan & Manajemen Stok Retail',
    marketAccess: 'Warga 3 RW & Pelanggan Transaksi Online',
  },
];

export const STAGE_CONFIG: {
  key: GraduationStage;
  stepNumber: string;
  title: string;
  subtitle: string;
  timeframe: string;
  colorTheme: {
    border: string;
    bg: string;
    badge: string;
    text: string;
    accent: string;
    ring: string;
  };
  objective: string;
  deliverables: string[];
  agencyLead: string;
}[] = [
  {
    key: 'Stabilize',
    stepNumber: '01',
    title: 'Stabilize',
    subtitle: 'Stabilisasi & Jaring Pengaman',
    timeframe: 'Bulan 1 – 3',
    colorTheme: {
      border: 'border-blue-300',
      bg: 'bg-blue-50/50',
      badge: 'bg-blue-600 text-white',
      text: 'text-blue-900',
      accent: 'text-blue-600',
      ring: 'ring-blue-500',
    },
    objective: 'Menjamin pemenuhan konsumsi pokok dan bantalan darurat sebelum pelatihan dimulai.',
    deliverables: ['BLT Adaptif / Jaminan Sosial Pokok', 'Verifikasi DTSEN & ID Rekening', 'Stabilisasi Gizi Balita & Ibu'],
    agencyLead: 'Kemensos RI (Ditjen Jamsos) & Posyandu',
  },
  {
    key: 'Assess',
    stepNumber: '02',
    title: 'Assess',
    subtitle: 'Pemetaan Potensi & Minat',
    timeframe: 'Bulan 4 – 6',
    colorTheme: {
      border: 'border-indigo-300',
      bg: 'bg-indigo-50/50',
      badge: 'bg-indigo-600 text-white',
      text: 'text-indigo-900',
      accent: 'text-indigo-600',
      ring: 'ring-indigo-500',
    },
    objective: 'Mendiagnosis kapasitas keterampilan, aset produktif lokal, dan menyusun rencana bisnis keluarga.',
    deliverables: ['Pemetaan Profil Keahlian KPM', 'Rencana Usaha Keluarga (Family Business Plan)', 'Penetapan Pendamping Lapangan'],
    agencyLead: 'Pendamping PKH / TKSK & Kemenko Perekonomian',
  },
  {
    key: 'Build',
    stepNumber: '03',
    title: 'Build',
    subtitle: 'Transfer Aset & Vokasi',
    timeframe: 'Bulan 7 – 12',
    colorTheme: {
      border: 'border-amber-300',
      bg: 'bg-amber-50/50',
      badge: 'bg-amber-600 text-white',
      text: 'text-amber-900',
      accent: 'text-amber-600',
      ring: 'ring-amber-500',
    },
    objective: 'Pemberian hibah aset produktif modal kerja dan pelatihan teknis vokasi terapan berkelanjutan.',
    deliverables: ['Penyerahan Paket Aset Produktif Fisik', 'Pelatihan Teknis Vokasi Terapan', 'Pembiasaan Tabungan Mingguan (Rekening)'],
    agencyLead: 'Kemensos (Ditjen Dayasos) & BLK Komunitas',
  },
  {
    key: 'Connect',
    stepNumber: '04',
    title: 'Connect',
    subtitle: 'Inklusi Pasar & Kredit Formal',
    timeframe: 'Bulan 13 – 18',
    colorTheme: {
      border: 'border-purple-300',
      bg: 'bg-purple-50/50',
      badge: 'bg-purple-600 text-white',
      text: 'text-purple-900',
      accent: 'text-purple-600',
      ring: 'ring-purple-500',
    },
    objective: 'Mengintegrasikan usaha mikro KPM ke rantai pasok pasar, koperasi, dan pembiayaan perbankan (KUR).',
    deliverables: ['Penyaluran KUR Super Mikro (0% Subsidi)', 'Kemitraan Off-taker & Koperasi Produsen', 'Pencatatan Keuangan Digital (QRIS)'],
    agencyLead: 'Bank Himbara (BRI/Mandiri/BNI) & Kemenkop UKM',
  },
  {
    key: 'Graduate',
    stepNumber: '05',
    title: 'Graduate',
    subtitle: 'Mandiri Lepas Bansos',
    timeframe: 'Bulan 19 – 24',
    colorTheme: {
      border: 'border-emerald-400',
      bg: 'bg-emerald-50/60',
      badge: 'bg-emerald-600 text-white',
      text: 'text-emerald-950',
      accent: 'text-emerald-600',
      ring: 'ring-emerald-500',
    },
    objective: 'Validasi kelulusan 4 kriteria kemandirian finansial dan terminasi sukarela dari daftar bansos.',
    deliverables: ['Pendapatan > Garis Kemiskinan Standar', 'Tabungan Darurat > 3 Bulan Biaya Hidup', 'Penerbitan Sertifikat Graduasi DTSEN'],
    agencyLead: 'Kemensos RI & Sekretariat Satu Data DTSEN',
  },
];

interface RiseInclusionTrackerViewProps {
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const RiseInclusionTrackerView: React.FC<RiseInclusionTrackerViewProps> = ({
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  const [cohorts, setCohorts] = useState<BeneficiaryCohort[]>(INITIAL_COHORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegency, setSelectedRegency] = useState<string>('all');
  const [activeStageFilter, setActiveStageFilter] = useState<GraduationStage | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban' | 'table'>('timeline');
  const [inspectKpm, setInspectKpm] = useState<BeneficiaryCohort | null>(null);

  const handlePromoteStage = (id: string) => {
    const stageOrder: GraduationStage[] = ['Stabilize', 'Assess', 'Build', 'Connect', 'Graduate'];
    setCohorts((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const currentIndex = stageOrder.indexOf(c.stage);
          if (currentIndex < stageOrder.length - 1) {
            const nextStage = stageOrder[currentIndex + 1];
            return { ...c, stage: nextStage, durationMonths: c.durationMonths + 3 };
          }
        }
        return c;
      })
    );
  };

  const filteredCohorts = cohorts.filter((c) => {
    const matchSearch =
      c.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nik.includes(searchTerm) ||
      c.businessSector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRegency = selectedRegency === 'all' || c.regency === selectedRegency;
    const matchStage = activeStageFilter === 'ALL' || c.stage === activeStageFilter;
    return matchSearch && matchRegency && matchStage;
  });

  const graduatedCount = cohorts.filter((c) => c.stage === 'Graduate').length;
  const inPipelineCount = cohorts.filter((c) => c.stage !== 'Graduate').length;
  const avgIncomeGrowth = '+184%';

  const getStageIndex = (stage: GraduationStage) => {
    const stageOrder: GraduationStage[] = ['Stabilize', 'Assess', 'Build', 'Connect', 'Graduate'];
    return stageOrder.indexOf(stage);
  };

  return (
    <div id="rise-inclusion-tracker-module" className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
            <span>Tahap 3 • Graduate (Graduasi Produktif &amp; Kemandirian) • Modul RS-1</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Pelacak Graduasi Produktif &amp; Kemandirian Ekonomi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Arsitektur 5 Tahapan Terstruktur: <strong>Stabilize &rarr; Assess &rarr; Build &rarr; Connect &rarr; Graduate</strong> Berbasis DTSEN
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold font-mono shadow-2xs flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span>Tahap 3: Graduate</span>
          </div>
        </div>
      </div>

      {/* Conceptual Banner with Clear Principle */}
      <div className="p-4.5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white border border-purple-800/40 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-white">
              Prinsip Bertahap: Stabilize Before Assess &amp; Build Before Connect
            </h3>
            <p className="text-xs text-purple-200/90 leading-relaxed max-w-3xl">
              Bantuan sosial tunai difungsikan sebagai bantalan awal pada masa <em>Stabilize</em>. Setelah kondisi keluarga stabil, intervensi diarahkan pada pelatihan teknis, transfer aset modal, kemitraan pasar, hingga KPM mandiri secara permanen dan lulus (<em>Graduate</em>) dari daftar bansos.
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total KPM Terdaftar Pilot
          </span>
          <div className="text-2xl font-extrabold font-mono text-slate-900">
            {cohorts.length} <span className="text-xs font-normal text-slate-500">Keluarga</span>
          </div>
          <span className="text-[10px] text-slate-400">Tersebar di 5 Kabupaten Pilot</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider block">
            Dalam Pembinaan (Pipeline)
          </span>
          <div className="text-2xl font-extrabold font-mono text-purple-700">
            {inPipelineCount} <span className="text-xs font-normal text-purple-500">KPM Aktif</span>
          </div>
          <span className="text-[10px] text-purple-600/80">Tahap 1 s.d. Tahap 4</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
            Telah Lulus (Graduated)
          </span>
          <div className="text-2xl font-extrabold font-mono text-emerald-700">
            {graduatedCount} <span className="text-xs font-normal text-emerald-500">KPM Mandiri</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">100% Lepas Bansos Reguler</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
            Rata-rata Kenaikan Income
          </span>
          <div className="text-2xl font-extrabold font-mono text-blue-700">
            {avgIncomeGrowth} <span className="text-xs font-normal text-blue-500">vs Pra-Program</span>
          </div>
          <span className="text-[10px] text-blue-600">Retensi Kemandirian 96.4%</span>
        </div>
      </div>

      {/* THE 5 SEQUENTIAL STAGES STEPPER (CLEAN, SPACIOUS, AND INTERACTIVE) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Jalur 5 Tahap Akselerasi Kemandirian (Sequenced Roadmap)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik salah satu tahapan di bawah untuk memfilter atau melihat detail intervensi spesifik
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveStageFilter('ALL')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeStageFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Tahap ({cohorts.length})
            </button>
          </div>
        </div>

        {/* 5 Step Progress Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STAGE_CONFIG.map((stage, idx) => {
            const countInStage = cohorts.filter((c) => c.stage === stage.key).length;
            const isSelected = activeStageFilter === stage.key;

            return (
              <div
                key={stage.key}
                onClick={() => setActiveStageFilter(isSelected ? 'ALL' : stage.key)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 relative ${
                  isSelected
                    ? `${stage.colorTheme.bg} ${stage.colorTheme.border} ring-2 ${stage.colorTheme.ring} shadow-xs`
                    : 'bg-slate-50/70 hover:bg-white hover:border-slate-300 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md ${stage.colorTheme.badge}`}>
                      Tahap {stage.stepNumber}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {countInStage} KPM
                    </span>
                  </div>

                  <div className="mt-2">
                    <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                      {stage.title}
                    </h4>
                    <span className="text-[10px] font-medium text-slate-500 block">
                      {stage.subtitle}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-purple-700 mt-1 block">
                      <Clock className="w-2.5 h-2.5 inline mr-1" />
                      {stage.timeframe}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-600 line-clamp-2">
                  {stage.objective}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER, SEARCH, & VIEW MODE BAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Search & Filter */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama kepala keluarga, NIK, atau sektor usaha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Wilayah:</span>
            <select
              value={selectedRegency}
              onChange={(e) => setSelectedRegency(e.target.value)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="all">Semua Wilayah</option>
              <option value="Kab. Cianjur">Kab. Cianjur</option>
              <option value="Kab. Sumba Timur">Kab. Sumba Timur</option>
              <option value="Kab. Demak">Kab. Demak</option>
              <option value="Kab. Flores Timur">Kab. Flores Timur</option>
              <option value="Kab. Asmat">Kab. Asmat</option>
            </select>
          </div>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start lg:self-auto">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Fokus Tahapan</span>
          </button>

          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'kanban'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Papan Kolom</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Tabel Data</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: TIMELINE / FOKUS BERJENJANG (UN-CROWDED, EXPANDED CARDS WITH PROGRESS BARS) */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {STAGE_CONFIG.filter((s) => activeStageFilter === 'ALL' || activeStageFilter === s.key).map((stage) => {
            const stageCohorts = filteredCohorts.filter((c) => c.stage === stage.key);

            return (
              <div
                key={stage.key}
                className={`rounded-2xl border ${stage.colorTheme.border} bg-white shadow-xs overflow-hidden`}
              >
                {/* Stage Header Banner */}
                <div className={`p-4 ${stage.colorTheme.bg} border-b ${stage.colorTheme.border} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl ${stage.colorTheme.badge} flex items-center justify-center font-extrabold text-xs font-mono shrink-0`}>
                      {stage.stepNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">
                          Tahap {stage.stepNumber}: {stage.title} ({stage.subtitle})
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                          {stageCohorts.length} KPM Terdaftar
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {stage.objective}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Instansi Pengampu &amp; Mitra
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {stage.agencyLead}
                    </span>
                  </div>
                </div>

                {/* Cohorts Grid for this Stage */}
                <div className="p-4 sm:p-5">
                  {stageCohorts.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400">
                      Tidak ada KPM pada tahap ini yang sesuai dengan filter pencarian.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stageCohorts.map((cohort) => {
                        const stageIndex = getStageIndex(cohort.stage);
                        const progressPct = ((stageIndex + 1) / 5) * 100;

                        return (
                          <div
                            key={cohort.id}
                            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3.5"
                          >
                            {/* Card Top: Head Name & Regency */}
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                                    <span>{cohort.headName}</span>
                                    <span className="text-[10px] font-normal text-slate-400 font-mono">
                                      ({cohort.village})
                                    </span>
                                  </h4>
                                  <span className="text-[11px] font-mono text-slate-500">
                                    NIK: {cohort.nik}
                                  </span>
                                </div>

                                <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-md shrink-0">
                                  {cohort.regency}
                                </span>
                              </div>

                              {/* Progress bar towards Graduation */}
                              <div className="mt-3 space-y-1">
                                <div className="flex justify-between text-[10px] font-semibold">
                                  <span className="text-slate-500">
                                    Progres Graduasi (Tahap {stageIndex + 1} dari 5)
                                  </span>
                                  <span className="font-mono text-purple-700 font-bold">
                                    {progressPct}%
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      cohort.stage === 'Graduate' ? 'bg-emerald-500' : 'bg-purple-600'
                                    }`}
                                    style={{ width: `${progressPct}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Card Middle: Business & Financial Metrics (Spacious 2-column) */}
                            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 grid grid-cols-2 gap-2.5 text-xs">
                              <div>
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  Sektor Usaha
                                </span>
                                <span className="font-bold text-slate-800 block truncate">
                                  {cohort.businessSector}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  Aset Produktif
                                </span>
                                <span className="font-medium text-slate-700 block truncate text-[11px]">
                                  {cohort.productiveAsset}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  Pendapatan Bulanan
                                </span>
                                <span className="font-extrabold font-mono text-emerald-700 block">
                                  Rp {cohort.incomeMonthly.toLocaleString('id-ID')}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  Rasio Garis Miskin
                                </span>
                                <span
                                  className={`font-extrabold font-mono block ${
                                    cohort.povertyLineRatio >= 1.0 ? 'text-blue-700' : 'text-amber-700'
                                  }`}
                                >
                                  {cohort.povertyLineRatio.toFixed(2)}x GK {cohort.povertyLineRatio >= 1.0 ? '(Lolos)' : ''}
                                </span>
                              </div>
                            </div>

                            {/* Card Footer: Mentor & Action Buttons */}
                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                              <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                                <span className="font-medium">Pendamping: </span>
                                <span className="font-semibold text-slate-700">{cohort.mentorName}</span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => setInspectKpm(cohort)}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Detail</span>
                                </button>

                                {cohort.stage !== 'Graduate' ? (
                                  <button
                                    onClick={() => handlePromoteStage(cohort.id)}
                                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                                  >
                                    <span>Naik Tahap</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold inline-flex items-center gap-1 border border-emerald-200">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Lulus Mandiri</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: KANBAN BOARD (SPACIOUS, CLEAN COLUMNS) */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STAGE_CONFIG.map((stageInfo) => {
            const stageCohorts = filteredCohorts.filter((c) => c.stage === stageInfo.key);

            return (
              <div
                key={stageInfo.key}
                className={`p-4 rounded-2xl border ${stageInfo.colorTheme.border} ${stageInfo.colorTheme.bg} flex flex-col justify-between space-y-3 min-w-[280px] shadow-2xs`}
              >
                {/* Column Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${stageInfo.colorTheme.badge}`}>
                      Tahap {stageInfo.stepNumber}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {stageCohorts.length} KPM
                    </span>
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-snug">{stageInfo.title}</h3>
                  <span className="text-[10px] text-slate-500 font-medium block">{stageInfo.subtitle}</span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 max-h-[500px] overflow-y-auto pr-1">
                  {stageCohorts.length === 0 ? (
                    <div className="p-4 text-center rounded-xl bg-white/70 border border-dashed border-slate-200 text-[11px] text-slate-400">
                      Tidak ada KPM pada tahap ini
                    </div>
                  ) : (
                    stageCohorts.map((cohort) => (
                      <div
                        key={cohort.id}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5 hover:shadow-xs transition-all"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900">{cohort.headName}</h4>
                            <span className="text-[10px] font-mono text-slate-400 block">{cohort.nik}</span>
                          </div>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                            {cohort.regency}
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 rounded-lg text-[10px] space-y-1 font-mono text-slate-600">
                          <div className="flex justify-between">
                            <span>Usaha:</span>
                            <span className="font-bold text-slate-800 truncate max-w-[110px]">
                              {cohort.businessSector}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Income:</span>
                            <span className="font-bold text-emerald-700">
                              Rp {(cohort.incomeMonthly / 1000000).toFixed(1)} Jt
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rasio GK:</span>
                            <span className={`font-bold ${cohort.povertyLineRatio >= 1.0 ? 'text-blue-700' : 'text-amber-700'}`}>
                              {cohort.povertyLineRatio.toFixed(2)}x
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 pt-1">
                          <button
                            onClick={() => setInspectKpm(cohort)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold cursor-pointer"
                            title="Lihat Detail"
                          >
                            <Eye className="w-3 h-3" />
                          </button>

                          {stageInfo.key !== 'Graduate' ? (
                            <button
                              onClick={() => handlePromoteStage(cohort.id)}
                              className="flex-1 py-1.5 px-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Naik Tahap</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <div className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold text-center flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>Lulus Mandiri</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 3: COMPREHENSIVE DATA TABLE */}
      {viewMode === 'table' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Kepala Keluarga &amp; NIK</th>
                <th className="py-3 px-4">Wilayah</th>
                <th className="py-3 px-4">Tahap Saat Ini</th>
                <th className="py-3 px-4">Sektor Usaha &amp; Aset</th>
                <th className="py-3 px-4">Income &amp; Rasio GK</th>
                <th className="py-3 px-4">Pendamping</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCohorts.map((cohort) => {
                const stageCfg = STAGE_CONFIG.find((s) => s.key === cohort.stage);
                return (
                  <tr key={cohort.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-slate-900">{cohort.headName}</div>
                      <div className="font-mono text-[10px] text-slate-400">{cohort.nik}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{cohort.village}</div>
                      <div className="text-[10px] text-slate-400">{cohort.regency}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${stageCfg?.colorTheme.badge}`}>
                        Tahap {stageCfg?.stepNumber}: {cohort.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{cohort.businessSector}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[160px]">{cohort.productiveAsset}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-emerald-700">
                        Rp {cohort.incomeMonthly.toLocaleString('id-ID')}
                      </div>
                      <div className={`text-[10px] font-mono font-bold ${cohort.povertyLineRatio >= 1.0 ? 'text-blue-700' : 'text-amber-700'}`}>
                        {cohort.povertyLineRatio.toFixed(2)}x GK
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[11px] text-slate-700">{cohort.mentorName}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInspectKpm(cohort)}
                          className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Detail
                        </button>
                        {cohort.stage !== 'Graduate' && (
                          <button
                            onClick={() => handlePromoteStage(cohort.id)}
                            className="px-2.5 py-1 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer"
                          >
                            Naik Tahap
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAIL MODAL / DRAWER FOR INSPECTING KPM PROGRESS */}
      {inspectKpm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/40 text-purple-300 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded uppercase tracking-wider">
                    Profil Kohort Graduasi KPM
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">
                    {inspectKpm.headName}
                  </h3>
                  <span className="text-xs text-purple-200 font-mono">
                    NIK: {inspectKpm.nik} • {inspectKpm.village}, {inspectKpm.regency}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectKpm(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Stepper Progress */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Status Kemajuan 5 Tahap:
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {STAGE_CONFIG.map((s, i) => {
                    const currentIdx = getStageIndex(inspectKpm.stage);
                    const isDone = i <= currentIdx;
                    const isCurrent = i === currentIdx;

                    return (
                      <div
                        key={s.key}
                        className={`p-2 rounded-lg text-center border ${
                          isCurrent
                            ? 'bg-purple-600 text-white border-purple-700 font-bold'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        <span className="text-[9px] block">Tahap {s.stepNumber}</span>
                        <span className="text-[11px] block truncate">{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Economic & Asset Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Sektor Usaha</span>
                  <div className="font-bold text-slate-900 text-sm">{inspectKpm.businessSector}</div>
                  <p className="text-xs text-slate-600">Aset: {inspectKpm.productiveAsset}</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Kondisi Finansial</span>
                  <div className="font-mono font-extrabold text-emerald-700 text-sm">
                    Rp {inspectKpm.incomeMonthly.toLocaleString('id-ID')} / bulan
                  </div>
                  <p className="text-xs text-blue-700 font-mono font-bold">
                    Tabungan: Rp {inspectKpm.savingsBalance.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Training & Market Access */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Pelatihan Terselesaikan</span>
                  <span className="font-semibold text-slate-800">{inspectKpm.trainingCompleted}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Akses Pasar / Kemitraan</span>
                  <span className="font-semibold text-slate-800">{inspectKpm.marketAccess}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Tenaga Pendamping</span>
                  <span className="font-semibold text-slate-800">{inspectKpm.mentorName}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Durasi: {inspectKpm.durationMonths} Bulan Pembinaan</span>
              <div className="flex items-center gap-2">
                {inspectKpm.stage !== 'Graduate' && (
                  <button
                    onClick={() => {
                      handlePromoteStage(inspectKpm.id);
                      setInspectKpm((prev) => (prev ? { ...prev, stage: STAGE_CONFIG[getStageIndex(prev.stage) + 1].key, durationMonths: prev.durationMonths + 3 } : null));
                    }}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Naikkan ke Tahap Berikut &rarr;
                  </button>
                )}
                <button
                  onClick={() => setInspectKpm(null)}
                  className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

