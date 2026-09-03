import React, { useState, useEffect, useRef } from 'react';
import {
  UserProfile,
  AppModule,
  RegionRiskData,
  SatuDataItem,
  FieldQueueItem,
  GrievanceItem,
  ActivationProposal,
} from '../types';
import { Avatar } from './Avatar';
import { soundEffects } from '../utils/soundEffects';
import { GradientButton } from '@/components/ui/gradient-button';
import {
  Search,
  Bell,
  Layers,
  LogOut,
  ChevronDown,
  Globe,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
  X,
  MapPin,
  User,
  FileCheck,
  MessageSquare,
  Radio,
  Database,
  SlidersHorizontal,
  BarChart3,
  WifiOff,
  ArrowRight,
  Flame,
  Droplets,
  ExternalLink,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  currentModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  onGoToLanding: () => void;
  onLogout: () => void;
  onOpenAuditLog?: () => void;
  regions?: RegionRiskData[];
  satuData?: SatuDataItem[];
  fieldQueue?: FieldQueueItem[];
  grievances?: GrievanceItem[];
  proposals?: ActivationProposal[];
  onSelectRegion?: (region: RegionRiskData) => void;
}

type SearchCategory = 'all' | 'regions' | 'kependudukan' | 'proposals' | 'grievances' | 'modules';

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  currentModule,
  onSelectModule,
  onGoToLanding,
  onLogout,
  onOpenAuditLog,
  regions = [],
  satuData = [],
  fieldQueue = [],
  grievances = [],
  proposals = [],
  onSelectRegion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(soundEffects.getMuted());

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setShowUserMenu(false);
      }
      if (
        notifContainerRef.current &&
        !notifContainerRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Peringatan Anomali Iklim',
      desc: 'Sumba Timur mendeteksi defisit curah hujan ekstrem 12mm berturut-turut.',
      time: '10 mnt lalu',
      type: 'danger',
    },
    {
      id: 2,
      title: 'Usulan Baru Butuh Persetujuan',
      desc: 'BPBD Kab. Cianjur mengajukan aktivasi bantuan gempa.',
      time: '32 mnt lalu',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Sinkronisasi Lapangan Sukses',
      desc: '124 data KK terdampak dari Posko Cianjur berhasil diintegrasikan.',
      time: '1 jam lalu',
      type: 'info',
    },
  ];

  // List of all system modules & features for quick navigation
  const systemModules = [
    {
      id: 'early_warning' as AppModule,
      moduleNumber: '01',
      title: 'Deteksi Dini & Peringatan',
      sub: 'Multi-Sensor Sensing & Satelit BMKG',
      keywords: ['sensor', 'cuaca', 'bmkg', 'gempa', 'banjir', 'kekeringan', 'peta', 'early warning', 'sensing'],
      icon: Radio,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      id: 'satu_data' as AppModule,
      moduleNumber: '02',
      title: 'Satu Data Terpadu (DTSEN)',
      sub: 'Interoperabilitas DTSEN (DTKS, Regsosek, P3KE) & Geospasial',
      keywords: ['dtsen', 'dtks', 'regsosek', 'p3ke', 'kependudukan', 'nik', 'targeting', 'data', 'desa', 'kemensos'],
      icon: Database,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'risk_assessment' as AppModule,
      moduleNumber: '03',
      title: 'Penilaian Risiko & Aktivasi Kilat',
      sub: 'Simulasi Matriks 8 Indikator (120 Poin) & Confidence Score',
      keywords: ['risiko', 'simulasi', 'aktivasi', 'confidence', 'human in the loop', 'kalkulasi', 'skor 120', 'bantuan'],
      icon: SlidersHorizontal,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'contingency_financing' as AppModule,
      moduleNumber: '03b',
      title: 'Pembiayaan Kontinjensi (DRFI)',
      sub: 'Risk-Layered Funding: APBD BTT → APBN DSP → Pooling Fund Bencana',
      keywords: ['pembiayaan', 'kontinjensi', 'drfi', 'apbd', 'apbn', 'pfb', 'asuransi', 'pooling fund'],
      icon: Database,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      id: 'converge_vulnerability_map' as AppModule,
      moduleNumber: 'CV-1',
      title: 'Human Capital Vulnerability Map',
      sub: 'Peta Konvergensi Stunting, Partisipasi Sekolah & Rasio Nakes',
      keywords: ['stunting', 'pendidikan', 'apm', 'nakes', 'puskesmas', 'konvergensi', 'converge', 'kesehatan'],
      icon: Radio,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'converge_supply_side' as AppModule,
      moduleNumber: 'CV-2',
      title: 'Supply-Side Equalization Dashboard',
      sub: 'Pemerataan Fasilitas Primer, Guru 3T, Listrik & Internet Sekolah',
      keywords: ['supply', 'faskes', 'guru', 'sekolah', 'internet', 'plts', 'pustu', 'kesehatan'],
      icon: Layers,
      color: 'text-teal-600 bg-teal-50',
    },
    {
      id: 'rise_inclusion_tracker' as AppModule,
      moduleNumber: 'RS-1',
      title: 'Productive Inclusion Tracker',
      sub: '5-Stage Cohort Pipeline: Stabilize → Assess → Build → Connect → Graduate',
      keywords: ['rise', 'graduasi', 'pemberdayaan', 'modal', 'kur', 'kpm', 'pkh', 'usaha', 'inklusif'],
      icon: BarChart3,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'rise_graduation_scorecard' as AppModule,
      moduleNumber: 'RS-2',
      title: 'Graduation Scorecard',
      sub: 'Validasi 4 Pilar Kemandirian & Penerbitan Sertifikat Graduasi',
      keywords: ['scorecard', 'lulus', 'sertifikat', 'mandiri', 'garis kemiskinan', 'tabungan', 'aset'],
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'monev' as AppModule,
      moduleNumber: '04',
      title: 'Monitoring & Evaluasi Berkelanjutan',
      sub: 'Telemetry, SLA & Asisten AI Cerdas',
      keywords: ['monev', 'sla', 'evaluasi', 'dashboard', 'grafik', 'ai', 'chatbot', 'kecepatan', 'himbara'],
      icon: BarChart3,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'input_lapangan' as AppModule,
      moduleNumber: '05',
      title: 'Registrasi Lapangan Offline',
      sub: 'Antrean Sinkronisasi Tagana & Posko Darurat',
      keywords: ['offline', 'lapangan', 'tagana', 'antrean', 'posko', 'sync', 'kerusakan', 'nik'],
      icon: WifiOff,
      color: 'text-teal-600 bg-teal-50',
    },
    {
      id: 'pengaduan' as AppModule,
      moduleNumber: '06',
      title: 'Whistleblowing System & Aspirasi',
      sub: 'Laporan Whistleblowing Inklusi & Logistik',
      keywords: ['whistleblowing', 'wbs', 'pengaduan', 'warga', 'laporan', 'aduan', 'komplain', 'sp4n', 'hotline', 'bansos'],
      icon: MessageSquare,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'persetujuan' as AppModule,
      moduleNumber: '07',
      title: 'Antrean Persetujuan Otorisasi',
      sub: 'Otorisasi Menteri / Dirjen & Keputusan Cepat',
      keywords: ['persetujuan', 'otorisasi', 'menteri', 'dirjen', 'approval', 'usulan', 'anggaran', 'dana'],
      icon: FileCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'manajemen_pengguna' as AppModule,
      moduleNumber: '08',
      title: 'Manajemen Pengguna & Hak Akses',
      sub: 'RBAC Multi-Instansi Kemensos, Dinsos, Tagana',
      keywords: ['pengguna', 'user', 'rbac', 'admin', 'tagana', 'role', 'hak akses', 'akun'],
      icon: Layers,
      color: 'text-slate-600 bg-slate-100',
    },
    {
      id: 'privasi' as AppModule,
      moduleNumber: '09',
      title: 'Privasi & Tata Kelola SPBE',
      sub: 'Kepatuhan UU PDP No. 27/2022 & Izin Bagi Pakai',
      keywords: ['privasi', 'pdp', 'spbe', 'keamanan', 'consent', 'audit log', 'enkripsi', 'hukum'],
      icon: ShieldCheck,
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  // Perform search matching
  const query = searchQuery.trim().toLowerCase();

  // 1. Regions search
  const filteredRegions = regions.filter((r) => {
    if (!query) return true;
    return (
      r.name.toLowerCase().includes(query) ||
      r.regency.toLowerCase().includes(query) ||
      r.province.toLowerCase().includes(query) ||
      r.crisisType.toLowerCase().includes(query) ||
      r.status.toLowerCase().includes(query)
    );
  });

  // 2. Kependudukan (Satu Data + Field Queue)
  const filteredSatuData = satuData.filter((sd) => {
    if (!query) return true;
    return (
      sd.village.toLowerCase().includes(query) ||
      sd.regency.toLowerCase().includes(query) ||
      sd.status.toLowerCase().includes(query) ||
      sd.sources.some((s) => s.toLowerCase().includes(query))
    );
  });

  const filteredFieldQueue = fieldQueue.filter((fq) => {
    if (!query) return true;
    return (
      fq.name.toLowerCase().includes(query) ||
      fq.nik.toLowerCase().includes(query) ||
      fq.condition.toLowerCase().includes(query) ||
      fq.status.toLowerCase().includes(query) ||
      fq.villageCode.toLowerCase().includes(query)
    );
  });

  // 3. Proposals search
  const filteredProposals = proposals.filter((p) => {
    if (!query) return true;
    return (
      p.id.toLowerCase().includes(query) ||
      p.region.toLowerCase().includes(query) ||
      p.disasterType.toLowerCase().includes(query) ||
      p.proposer.toLowerCase().includes(query) ||
      p.status.toLowerCase().includes(query)
    );
  });

  // 4. Grievances search
  const filteredGrievances = grievances.filter((g) => {
    if (!query) return true;
    return (
      g.id.toLowerCase().includes(query) ||
      g.category.toLowerCase().includes(query) ||
      g.village.toLowerCase().includes(query) ||
      g.summary.toLowerCase().includes(query) ||
      g.status.toLowerCase().includes(query)
    );
  });

  // 5. System modules search
  const filteredModules = systemModules.filter((m) => {
    if (!query) return true;
    return (
      m.title.toLowerCase().includes(query) ||
      m.sub.toLowerCase().includes(query) ||
      m.moduleNumber.includes(query) ||
      m.keywords.some((kw) => kw.includes(query))
    );
  });

  // Audit log keyword check
  const isAuditLogMatch =
    query &&
    ('log audit'.includes(query) ||
      'audit log'.includes(query) ||
      'audit'.includes(query) ||
      'riwayat'.includes(query));

  // Count total matches
  const totalResultsCount =
    filteredRegions.length +
    filteredSatuData.length +
    filteredFieldQueue.length +
    filteredProposals.length +
    filteredGrievances.length +
    filteredModules.length +
    (isAuditLogMatch ? 1 : 0);

  // Quick suggestion tags
  const quickSearches = [
    { label: 'Kab. Cianjur', query: 'Cianjur' },
    { label: 'Sumba Timur', query: 'Sumba' },
    { label: 'NIK Warga', query: '3201' },
    { label: 'Erupsi Gunung', query: 'Erupsi' },
    { label: 'Banjir', query: 'Banjir' },
    { label: 'Usulan Menunggu', query: 'Menunggu' },
    { label: 'Log Audit', query: 'Audit' },
  ];

  const handleSelectRegion = (region: RegionRiskData) => {
    if (onSelectRegion) onSelectRegion(region);
    onSelectModule('early_warning');
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSelectModule = (mod: AppModule) => {
    onSelectModule(mod);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      id="top-header"
      className="h-16 bg-gradient-to-r from-[#0B0F19] via-[#1A0B22] to-[#0B1328] border-b border-rose-950/40 px-6 flex items-center justify-between z-40 shrink-0 sticky top-0 text-slate-100 shadow-md relative"
    >
      {/* Ambient gradient beam matching SIGAP logo (contained in clipped container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-16 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent blur-xl" />
        <div className="absolute top-0 right-0 w-80 h-16 bg-blue-600/10 blur-xl" />
      </div>

      {/* Left: Global Search with Interactive Dropdown */}
      <div ref={searchContainerRef} className="flex items-center gap-6 flex-1 max-w-2xl relative z-30">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-rose-300/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            id="global-search-input"
            type="text"
            placeholder="Cari wilayah, NIK, usulan bencana, atau laporan warga..."
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            className="w-full pl-10 pr-16 py-2 text-xs bg-slate-900/80 border border-slate-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/70 focus:bg-slate-900 transition-all text-slate-100 placeholder:text-slate-400 shadow-inner"
          />

          {/* Clear button or shortcut badge */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-semibold text-slate-400 bg-slate-800/90 border border-slate-700 rounded shadow-xs">
                Ctrl K
              </kbd>
            )}
          </div>

          {/* INTERACTIVE SEARCH RESULTS DROPDOWN */}
          {isSearchOpen && (
            <div
              id="global-search-dropdown"
              className="absolute left-0 top-full mt-2 w-full sm:w-[540px] md:w-[620px] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[82vh] flex flex-col"
            >
              {/* Filter Category Tabs */}
              <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-medium no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  Semua ({totalResultsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('regions')}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                    selectedCategory === 'regions'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>Wilayah ({filteredRegions.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('kependudukan')}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                    selectedCategory === 'kependudukan'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <User className="w-3 h-3" />
                  <span>NIK & DTKS ({filteredSatuData.length + filteredFieldQueue.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('proposals')}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                    selectedCategory === 'proposals'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <FileCheck className="w-3 h-3" />
                  <span>Usulan Bencana ({filteredProposals.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('grievances')}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                    selectedCategory === 'grievances'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Laporan Warga ({filteredGrievances.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('modules')}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                    selectedCategory === 'modules'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Modul ({filteredModules.length})</span>
                </button>
              </div>

              {/* Scrollable Results Body */}
              <div className="overflow-y-auto p-3 space-y-4 divide-y divide-slate-100 flex-1">
                {/* 1. Quick suggestion chips when query is empty */}
                {!query && (
                  <div className="space-y-2 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Rekomendasi Pencarian Cepat
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickSearches.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchQuery(s.query);
                            searchInputRef.current?.focus();
                          }}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-slate-700 transition-colors"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Audit Log Direct Match */}
                {(selectedCategory === 'all' || selectedCategory === 'modules') && isAuditLogMatch && onOpenAuditLog && (
                  <div className="pt-2">
                    <div
                      onClick={() => {
                        onOpenAuditLog();
                        setIsSearchOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-cyan-900">Buka Log Audit Interoperabilitas SPBE</p>
                          <p className="text-[11px] text-cyan-700">Audit trail kepatuhan data pertukaran Kemensos, BNPB & Pemda</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-cyan-700" />
                    </div>
                  </div>
                )}

                {/* 3. Wilayah & Titik Krisis Bencana */}
                {(selectedCategory === 'all' || selectedCategory === 'regions') && filteredRegions.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>Wilayah &amp; Titik Bencana ({filteredRegions.length})</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Modul 01 • Sensing</span>
                    </div>
                    <div className="space-y-1">
                      {filteredRegions.slice(0, 4).map((region) => (
                        <div
                          key={region.id}
                          onClick={() => handleSelectRegion(region)}
                          className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="min-w-0 flex-1 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {region.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                ({region.regency}, {region.province})
                              </span>
                              <span
                                className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                                  region.status === 'darurat'
                                    ? 'bg-rose-100 text-rose-700'
                                    : region.status === 'siaga'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {region.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {region.crisisType} • Kerentanan: <strong className="text-slate-700">{region.vulnerabilityIndex}/10</strong> • SLA: {region.slaTargetDays} Hari
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors">
                            <span className="text-[10px] font-semibold hidden sm:inline">Peta Deteksi</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Usulan Bencana & Otorisasi */}
                {(selectedCategory === 'all' || selectedCategory === 'proposals') && filteredProposals.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Usulan Bencana &amp; Otorisasi ({filteredProposals.length})</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Modul 07 • Approval</span>
                    </div>
                    <div className="space-y-1">
                      {filteredProposals.map((prop) => (
                        <div
                          key={prop.id}
                          onClick={() => {
                            onSelectModule('persetujuan');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="min-w-0 flex-1 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {prop.id}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-800">
                                {prop.region}
                              </span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                  prop.status === 'Disetujui'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : prop.status === 'Ditolak'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {prop.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {prop.disasterType} • Pengusul: {prop.proposer} • Skor Risiko: <strong className="text-slate-700">{prop.riskScore}/120</strong>
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Data Kependudukan & DTKS (Satu Data + Field Queue) */}
                {(selectedCategory === 'all' || selectedCategory === 'kependudukan') &&
                  (filteredSatuData.length > 0 || filteredFieldQueue.length > 0) && (
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Data Kependudukan &amp; NIK DTKS ({filteredSatuData.length + filteredFieldQueue.length})</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">Modul 02 &amp; 05</span>
                      </div>
                      <div className="space-y-1">
                        {/* Field queue entries */}
                        {filteredFieldQueue.slice(0, 3).map((fq) => (
                          <div
                            key={fq.id}
                            onClick={() => {
                              onSelectModule('input_lapangan');
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                                  {fq.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1 rounded">
                                  NIK: {fq.nik}
                                </span>
                                <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                                  {fq.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                Posko Desa {fq.villageCode} • {fq.familyMembers} Jiwa • Kondisi: <strong className="text-slate-700">{fq.condition}</strong>
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                          </div>
                        ))}

                        {/* Satu data regions */}
                        {filteredSatuData.slice(0, 3).map((sd) => (
                          <div
                            key={sd.id}
                            onClick={() => {
                              onSelectModule('satu_data');
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                                  Desa/Kel. {sd.village}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  ({sd.regency})
                                </span>
                                <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                                  {sd.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                Kelengkapan: <strong className="text-slate-700">{sd.completeness}%</strong> • {sd.vulnerableHouseholds.toLocaleString()} KK Rentan • Sumber: {sd.sources.join(', ')}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* 6. Laporan Whistleblowing & Aspirasi Warga */}
                {(selectedCategory === 'all' || selectedCategory === 'grievances') && filteredGrievances.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                        <span>Laporan Whistleblowing ({filteredGrievances.length})</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Modul 06 • Whistleblowing</span>
                    </div>
                    <div className="space-y-1">
                      {filteredGrievances.map((grv) => (
                        <div
                          key={grv.id}
                          onClick={() => {
                            onSelectModule('pengaduan');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="min-w-0 flex-1 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-purple-700">
                                {grv.id}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-800">
                                {grv.category}
                              </span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                  grv.status === 'Baru'
                                    ? 'bg-rose-100 text-rose-700'
                                    : grv.status === 'Diproses'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {grv.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {grv.village} • &quot;{grv.summary}&quot;
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Modul Sistem SIGAP */}
                {(selectedCategory === 'all' || selectedCategory === 'modules') && filteredModules.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span>Pintasan Modul &amp; Fitur ({filteredModules.length})</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Arsitektur SIGAP</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {filteredModules.map((mod) => {
                        const Icon = mod.icon;
                        return (
                          <div
                            key={mod.id}
                            onClick={() => handleSelectModule(mod.id)}
                            className="p-2 rounded-lg hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-2.5 group"
                          >
                            <div className={`p-1.5 rounded-md shrink-0 ${mod.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                                Modul {mod.moduleNumber} • {mod.title}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">{mod.sub}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {totalResultsCount === 0 && (
                  <div className="py-8 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Tidak ada data yang cocok dengan &quot;{searchQuery}&quot;</p>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Coba cari dengan kata kunci lain seperti nama kabupaten, nomor NIK, jenis krisis (Gempa, Banjir), atau nama modul.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer info bar */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span>Pencarian Cepat Terpadu:</span>
                  <strong className="text-slate-700">{totalResultsCount} item cocok</strong>
                </span>
                <span className="hidden sm:inline text-slate-400">Tekan ESC untuk menutup</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Pulse Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-emerald-300">
            Pusat Data Terhubung (Latensi 24ms)
          </span>
        </div>
      </div>

      {/* Right: Quick actions, notifications, user dropdown */}
      <div className="flex items-center gap-3 relative z-30">
        {/* Navigation shortcut to Landing */}
        <GradientButton
          id="btn-nav-landing-header"
          size="sm"
          variant="cobalt"
          onClick={onGoToLanding}
          className="hidden sm:inline-flex !min-w-[120px] !text-xs !py-1.5 !px-3"
        >
          <Globe className="w-3.5 h-3.5 mr-1 text-sky-300" />
          <span>Beranda Publik</span>
        </GradientButton>

        {/* Audit Log Button */}
        {onOpenAuditLog && (
          <GradientButton
            id="btn-quick-audit-log"
            size="sm"
            variant="amber"
            onClick={onOpenAuditLog}
            className="hidden md:inline-flex !min-w-[110px] !text-xs !py-1.5 !px-3"
          >
            <FileText className="w-3.5 h-3.5 mr-1 text-amber-200" />
            <span>Log Audit</span>
          </GradientButton>
        )}

        {/* Sound FX Toggle Button */}
        <button
          id="btn-header-sound-toggle"
          onClick={() => {
            const nextMuted = soundEffects.toggleMute();
            setIsSoundMuted(nextMuted);
          }}
          className={`p-2 rounded-xl transition-all relative border ${
            isSoundMuted
              ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-slate-800 bg-slate-900/60'
              : 'text-amber-300 hover:text-amber-200 bg-gradient-to-r from-rose-950/60 to-amber-950/60 border-amber-500/40 shadow-xs shadow-amber-500/10'
          }`}
          title={isSoundMuted ? 'Efek Suara: Bisu (Klik untuk aktifkan)' : 'Efek Suara: Aktif (Klik untuk matikan)'}
        >
          {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div ref={notifContainerRef} className="relative">
          <button
            id="btn-header-notifications"
            onClick={() => {
              soundEffects.playClick();
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 relative transition-colors border border-rose-950/60 bg-slate-900/50 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#1A0B22] shadow-[0_0_6px_#f43f5e]"></span>
          </button>

          {showNotifications && (
            <div
              id="dropdown-notifications-panel"
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800"
            >
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Notifikasi Sistem</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                  3 Baru
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                    onClick={() => {
                      setShowNotifications(false);
                      if (notif.id === 1) onSelectModule('early_warning');
                      if (notif.id === 2) onSelectModule('persetujuan');
                      if (notif.id === 3) onSelectModule('input_lapangan');
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        {notif.type === 'danger' && (
                          <AlertTriangle className="w-4 h-4 text-rose-500" />
                        )}
                        {notif.type === 'warning' && (
                          <Clock className="w-4 h-4 text-amber-500" />
                        )}
                        {notif.type === 'info' && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                          {notif.desc}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Quick Profile Dropdown */}
        <div ref={userMenuRef} className="relative">
          <button
            id="btn-header-profile"
            onClick={() => {
              soundEffects.playClick();
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors border border-slate-700/60 text-slate-200 cursor-pointer"
          >
            <Avatar
              name={userProfile.name}
              roleType={userProfile.roleType}
              size="sm"
              className="ring-1 ring-slate-600"
            />
            <div className="hidden xl:block text-left text-xs">
              <span className="font-semibold text-slate-200 block leading-none">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-400 leading-none">
                {userProfile.role}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div
              id="dropdown-user-menu"
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{userProfile.name}</p>
                <p className="text-[11px] text-slate-500">{userProfile.agency}</p>
                <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                  {userProfile.role} • {userProfile.region}
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSelectModule('privasi');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Keamanan &amp; Privasi Data</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSelectModule('manajemen_pengguna');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Kelola Akun Dinas</span>
                </button>
              </div>
              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-left font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

