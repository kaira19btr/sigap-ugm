import React, { useState } from 'react';
import { SatuDataItem, AppModule } from '../types';
import {
  X,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Printer,
  ShieldCheck,
  Search,
  MapPin,
  Calendar,
  CreditCard,
  Layers,
  HeartHandshake,
  TrendingUp,
  Flame,
  Droplets,
  Zap,
  Info,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Sparkles,
  ArrowRight,
  Shield,
  HeartPulse,
  Briefcase,
  GitFork,
  Clock,
  Send,
  Check,
  AlertCircle,
  FileText,
  FileCheck,
} from 'lucide-react';

export interface BeneficiaryHousehold {
  nik: string;
  noKk: string;
  headName: string;
  address: string;
  rtRw: string;
  gender: 'L' | 'P';
  age: number;
  familyMembersCount: number;
  desilRegsosek: 1 | 2 | 3 | 4;
  dukcapilStatus: 'Padan & Valid' | 'Perlu Pembaruan' | 'Anomali';
  pkhStatus: 'Penerima Aktif' | 'Non-Penerima';
  bpntStatus: 'Penerima Aktif' | 'Non-Penerima';
  sigapEmergencyAid: 'Siap Salur (Tahap 1)' | 'Tersalurkan' | 'Proses Verifikasi';
  nominalAid: string;
  vulnerabilityNotes: string[];
  disabilityMembers: number;
  elderlyMembers: number;
  toddlerMembers: number;
  houseCondition: {
    floor: string;
    wall: string;
    roof: string;
    electricity: string;
    sanitation: string;
  };
}

interface SatuDataProfileModalProps {
  item: SatuDataItem | null;
  selectedNik?: string | null;
  initialTab?: 'beneficiaries' | 'vulnerability' | 'audit' | 'referrals';
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (module: AppModule) => void;
}

// Generate realistic mock household beneficiaries for each region
export const getSampleHouseholdsForVillage = (villageName: string): BeneficiaryHousehold[] => {
  return [
    {
      nik: '3201015509820001',
      noKk: '3201012304150009',
      headName: 'Sulaeman Iskandar',
      address: `Kp. Babakan RT 02/RW 04, ${villageName}`,
      rtRw: 'RT 02 / RW 04',
      gender: 'L',
      age: 48,
      familyMembersCount: 5,
      desilRegsosek: 1,
      dukcapilStatus: 'Padan & Valid',
      pkhStatus: 'Penerima Aktif',
      bpntStatus: 'Penerima Aktif',
      sigapEmergencyAid: 'Siap Salur (Tahap 1)',
      nominalAid: 'Rp 1.200.000 (Tunai Darurat + Sembako)',
      vulnerabilityNotes: ['Rumah rusak berat akibat gempa/bencana', 'Terdapat 1 balita gizi kurang', 'Lansia tunggal'],
      disabilityMembers: 0,
      elderlyMembers: 1,
      toddlerMembers: 1,
      houseCondition: {
        floor: 'Tanah / Semen Rusak',
        wall: 'Bambu Anyaman & Kayu',
        roof: 'Seng / Terpal Darurat',
        electricity: '450 VA Bersubsidi',
        sanitation: 'Jamban Bersama',
      },
    },
    {
      nik: '3201016208750004',
      noKk: '3201011802110045',
      headName: 'Siti Aminah Rostika',
      address: `Jl. Melati No. 14, RT 01/RW 02, ${villageName}`,
      rtRw: 'RT 01 / RW 02',
      gender: 'P',
      age: 52,
      familyMembersCount: 3,
      desilRegsosek: 1,
      dukcapilStatus: 'Padan & Valid',
      pkhStatus: 'Penerima Aktif',
      bpntStatus: 'Penerima Aktif',
      sigapEmergencyAid: 'Tersalurkan',
      nominalAid: 'Rp 1.200.000 (Top-up Kartu KKS)',
      vulnerabilityNotes: ['Kepala Keluarga Perempuan (Janda)', '1 Anggota Disabilitas Fisik'],
      disabilityMembers: 1,
      elderlyMembers: 0,
      toddlerMembers: 0,
      houseCondition: {
        floor: 'Plesteran Semen',
        wall: 'Tembok Retak Sedang',
        roof: 'Genteng Keramik',
        electricity: '900 VA Bersubsidi',
        sanitation: 'Jamban Pribadi',
      },
    },
    {
      nik: '3201014101900012',
      noKk: '3201010908180122',
      headName: 'Bambang Sudarmono',
      address: `Dusun Sukamukti RT 03/RW 01, ${villageName}`,
      rtRw: 'RT 03 / RW 01',
      gender: 'L',
      age: 36,
      familyMembersCount: 4,
      desilRegsosek: 2,
      dukcapilStatus: 'Padan & Valid',
      pkhStatus: 'Non-Penerima',
      bpntStatus: 'Penerima Aktif',
      sigapEmergencyAid: 'Siap Salur (Tahap 1)',
      nominalAid: 'Rp 900.000 (Voucher Logistik & Pangan)',
      vulnerabilityNotes: ['Kehilangan mata pencaharian pertanian akibat kekeringan/banjir', '2 Anak usia sekolah dasar'],
      disabilityMembers: 0,
      elderlyMembers: 0,
      toddlerMembers: 1,
      houseCondition: {
        floor: 'Plesteran Semen',
        wall: 'Semi Permanen',
        roof: 'Seng Gelombang',
        electricity: '450 VA',
        sanitation: 'Jamban Cemplung',
      },
    },
    {
      nik: '3201015003660008',
      noKk: '3201013010120888',
      headName: 'Endang Suherman',
      address: `Kp. Karanganyar RT 04/RW 03, ${villageName}`,
      rtRw: 'RT 04 / RW 03',
      gender: 'L',
      age: 68,
      familyMembersCount: 2,
      desilRegsosek: 1,
      dukcapilStatus: 'Padan & Valid',
      pkhStatus: 'Penerima Aktif',
      bpntStatus: 'Penerima Aktif',
      sigapEmergencyAid: 'Tersalurkan',
      nominalAid: 'Rp 1.500.000 (Atensi Lansia & Bantuan Adaptif)',
      vulnerabilityNotes: ['Lansia Usia Lanjut (>65 thn)', 'Penyakit menahun'],
      disabilityMembers: 0,
      elderlyMembers: 2,
      toddlerMembers: 0,
      houseCondition: {
        floor: 'Papan Kayu',
        wall: 'Bambu Anyaman',
        roof: 'Genteng Tradisional',
        electricity: '450 VA Numpang Tetangga',
        sanitation: 'MCK Komunal',
      },
    },
    {
      nik: '3201016812880023',
      noKk: '3201011405190543',
      headName: 'Mulyani Kurniawati',
      address: `Perum Grahacipta Blok C-4, ${villageName}`,
      rtRw: 'RT 05 / RW 06',
      gender: 'P',
      age: 41,
      familyMembersCount: 3,
      desilRegsosek: 2,
      dukcapilStatus: 'Padan & Valid',
      pkhStatus: 'Non-Penerima',
      bpntStatus: 'Penerima Aktif',
      sigapEmergencyAid: 'Proses Verifikasi',
      nominalAid: 'Rp 600.000 (Paket Stimulan Sembako)',
      vulnerabilityNotes: ['Pekerja informal sektor harian terdampak inflasi beras'],
      disabilityMembers: 0,
      elderlyMembers: 0,
      toddlerMembers: 0,
      houseCondition: {
        floor: 'Keramik Sederhana',
        wall: 'Tembok Plester',
        roof: 'Genteng',
        electricity: '900 VA',
        sanitation: 'Jamban Pribadi',
      },
    },
  ];
};

export const SatuDataProfileModal: React.FC<SatuDataProfileModalProps> = ({
  item,
  selectedNik,
  initialTab,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'beneficiaries' | 'vulnerability' | 'audit' | 'referrals'>(
    initialTab || 'beneficiaries'
  );
  const [householdSearch, setHouseholdSearch] = useState(selectedNik || '');
  const [inspectHousehold, setInspectHousehold] = useState<BeneficiaryHousehold | null>(null);

  // Sync initial tab & selected NIK when modal opens or props change
  React.useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      if (selectedNik) {
        setHouseholdSearch(selectedNik);
        if (item) {
          const matching = getSampleHouseholdsForVillage(item.village).find(
            (h) => h.nik === selectedNik
          );
          if (matching) setInspectHousehold(matching);
        }
      }
    }
  }, [isOpen, initialTab, selectedNik, item]);

  if (!isOpen || !item) return null;

  const sampleHouseholds = getSampleHouseholdsForVillage(item.village);

  // Default selected household for referrals tab if none inspected
  const activeReferralHousehold = inspectHousehold || sampleHouseholds[0];

  const filteredHouseholds = sampleHouseholds.filter((h) => {
    const term = householdSearch.toLowerCase();
    return (
      h.headName.toLowerCase().includes(term) ||
      h.nik.includes(term) ||
      h.noKk.includes(term) ||
      h.address.toLowerCase().includes(term)
    );
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Profil_SatuData_${item.village.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleNavigateToModule = (mod: AppModule) => {
    onClose();
    if (onNavigate) {
      onNavigate(mod);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Profil Wilayah */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between relative border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-600 flex items-center justify-center text-white font-extrabold shadow-lg shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                  Kode Wilayah: 32.03.01.2001
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'Selesai'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : item.status === 'Diproses'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  Status: {item.status.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                Profil Wilayah: {item.village}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{item.regency} • Interoperabilitas DTSEN &amp; Sinyal BNPB</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              title="Unduh JSON Profil"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-slate-50 border-b border-slate-200">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Total KK Rentan
            </span>
            <span className="text-base font-extrabold font-mono text-slate-900 mt-0.5 block">
              {item.vulnerableHouseholds.toLocaleString('id-ID')} KK
            </span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Kelengkapan Data
            </span>
            <span className="text-base font-extrabold font-mono text-indigo-600 mt-0.5 block">
              {item.completeness}%
            </span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Desil 1 (Sangat Miskin)
            </span>
            <span className="text-base font-extrabold font-mono text-rose-600 mt-0.5 block">
              {Math.round(item.vulnerableHouseholds * 0.42).toLocaleString('id-ID')} KK
            </span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              Klir Padan Dukcapil
            </span>
            <span className="text-base font-extrabold font-mono text-emerald-600 mt-0.5 block">
              {Math.round(item.vulnerableHouseholds * 0.94).toLocaleString('id-ID')} KK (94%)
            </span>
          </div>
        </div>

        {/* Tab Navigation (4 Tabs) */}
        <div className="flex items-center border-b border-slate-200 px-4 sm:px-6 bg-white overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('beneficiaries');
              setInspectHousehold(null);
            }}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'beneficiaries'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Daftar Kepala Keluarga & NIK ({filteredHouseholds.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('referrals');
            }}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'referrals'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="flex items-center gap-1.5">
              <span>Rekomendasi Program & Rujukan</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-600 text-white uppercase tracking-wider">
                Multi-Pilar
              </span>
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vulnerability');
              setInspectHousehold(null);
            }}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'vulnerability'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Parameter Sosial & Kerentanan Fisik</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('audit');
              setInspectHousehold(null);
            }}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'audit'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit Trail & Interoperabilitas API</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: BENEFICIARIES LIST */}
          {activeTab === 'beneficiaries' && !inspectHousehold && (
            <div className="space-y-4">
              {/* Search Bar within modal */}
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter NIK, Nomor KK, atau Nama Kepala Keluarga..."
                    value={householdSearch}
                    onChange={(e) => setHouseholdSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                  Menampilkan {filteredHouseholds.length} Kepala Keluarga
                </span>
              </div>

              {/* Households Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3.5">Nama & NIK</th>
                      <th className="py-2.5 px-3.5">Alamat / RT</th>
                      <th className="py-2.5 px-3.5">Desil DTSEN</th>
                      <th className="py-2.5 px-3.5">Status Bansos Reguler</th>
                      <th className="py-2.5 px-3.5">Bantuan Darurat SIGAP</th>
                      <th className="py-2.5 px-3.5 text-right">Rincian & Rujukan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHouseholds.map((h) => (
                      <tr key={h.nik} className="hover:bg-indigo-50/40 transition-colors">
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-slate-900">{h.headName}</div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            NIK: <span className="text-indigo-600 font-semibold">{h.nik}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            No. KK: {h.noKk} • {h.familyMembersCount} Jiwa
                          </div>
                        </td>
                        <td className="py-3 px-3.5">
                          <div className="font-semibold text-slate-800">{h.rtRw}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                            {h.address}
                          </div>
                        </td>
                        <td className="py-3 px-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                            h.desilRegsosek === 1
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            Desil {h.desilRegsosek} (Rentan)
                          </span>
                        </td>
                        <td className="py-3 px-3.5">
                          <div className="flex flex-wrap gap-1">
                            {h.pkhStatus === 'Penerima Aktif' && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                                PKH
                              </span>
                            )}
                            {h.bpntStatus === 'Penerima Aktif' && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                BPNT
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-xs text-slate-900">{h.sigapEmergencyAid}</div>
                          <div className="text-[10px] text-emerald-600 font-semibold">{h.nominalAid}</div>
                        </td>
                        <td className="py-3 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setInspectHousehold(h);
                                setActiveTab('referrals');
                              }}
                              className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-300 inline-flex items-center gap-1 cursor-pointer"
                              title="Lihat Pencocokan Kebutuhan & Rujukan K/L"
                            >
                              <Sparkles className="w-3 h-3 text-indigo-600" />
                              <span>Rujukan</span>
                            </button>
                            <button
                              onClick={() => setInspectHousehold(h)}
                              className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-300 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Detail</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INDIVIDUAL HOUSEHOLD DEEP INSPECTION */}
          {inspectHousehold && activeTab === 'beneficiaries' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setInspectHousehold(null)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>&larr; Kembali ke Daftar KK {item.village}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('referrals')}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lihat Rekomendasi Program &amp; Rujukan K/L</span>
                  </button>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    ID Verifikasi: #REG-{inspectHousehold.nik.slice(-6)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal & Family Card */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-3 bg-white shadow-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Identitas Kepala Keluarga
                    </h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Nama Lengkap:</span>
                      <span className="font-bold text-slate-900">{inspectHousehold.headName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">NIK (16 Digit):</span>
                      <span className="font-mono font-bold text-indigo-600">{inspectHousehold.nik}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Nomor Kartu Keluarga:</span>
                      <span className="font-mono font-bold text-slate-800">{inspectHousehold.noKk}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Status Padan Dukcapil:</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{inspectHousehold.dukcapilStatus}</span>
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Jumlah Tanggungan:</span>
                      <span className="font-bold text-slate-800">{inspectHousehold.familyMembersCount} Jiwa</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Alamat Lengkap:</span>
                      <span className="font-medium text-slate-800 text-right">{inspectHousehold.address}</span>
                    </div>
                  </div>
                </div>

                {/* Socio-Economic & Vulnerability Card */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-3 bg-white shadow-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <HeartHandshake className="w-4 h-4 text-rose-600" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Kerentanan & Bantuan Adaptif
                    </h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Desil Regsosek:</span>
                      <span className="font-bold text-rose-600 font-mono">Desil {inspectHousehold.desilRegsosek} (Sangat Rentan)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Status Bantuan Adaptif SIGAP:</span>
                      <span className="font-bold text-indigo-700">{inspectHousehold.sigapEmergencyAid}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Nominal Paket Bantuan:</span>
                      <span className="font-bold text-emerald-600">{inspectHousehold.nominalAid}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Anggota Rentan:</span>
                      <span className="font-semibold text-slate-800">
                        {inspectHousehold.elderlyMembers} Lansia • {inspectHousehold.toddlerMembers} Balita • {inspectHousehold.disabilityMembers} Disabilitas
                      </span>
                    </div>
                    <div className="py-1">
                      <span className="text-slate-500 block mb-1">Catatan Asesmen Lapangan:</span>
                      <div className="space-y-1">
                        {inspectHousehold.vulnerabilityNotes.map((note, idx) => (
                          <div key={idx} className="text-[11px] bg-rose-50 text-rose-800 px-2.5 py-1 rounded-md border border-rose-100">
                            • {note}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Housing Condition */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Kondisi Fisik Hunian & Sanitasi
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Lantai</span>
                    <span className="font-bold text-slate-800">{inspectHousehold.houseCondition.floor}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Dinding</span>
                    <span className="font-bold text-slate-800">{inspectHousehold.houseCondition.wall}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Atap</span>
                    <span className="font-bold text-slate-800">{inspectHousehold.houseCondition.roof}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Listrik</span>
                    <span className="font-bold text-slate-800">{inspectHousehold.houseCondition.electricity}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Sanitasi</span>
                    <span className="font-bold text-slate-800">{inspectHousehold.houseCondition.sanitation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REKOMENDASI PROGRAM & RUJUKAN KEMENTERIAN (TRIGGER ENGINE TO PROGRAM LAYER) */}
          {activeTab === 'referrals' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Selected Household Switcher Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center font-bold shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded border border-indigo-400/30 uppercase tracking-wider">
                        Kepala Keluarga Sasaran
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        NIK: {activeReferralHousehold.nik}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                      {activeReferralHousehold.headName} ({activeReferralHousehold.familyMembersCount} Jiwa) — {activeReferralHousehold.address}
                    </h3>
                  </div>
                </div>

                {/* Switcher dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">Pilih KK:</span>
                  <select
                    value={activeReferralHousehold.nik}
                    onChange={(e) => {
                      const found = sampleHouseholds.find((h) => h.nik === e.target.value);
                      if (found) setInspectHousehold(found);
                    }}
                    className="text-xs bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    {sampleHouseholds.map((h) => (
                      <option key={h.nik} value={h.nik}>
                        {h.headName} (Desil {h.desilRegsosek})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* BAGIAN A: PROFIL RISIKO 4 DIMENSI */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Bagian A • Profil Risiko 4 Dimensi (Input Trigger Engine)
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Skala Multi-Kriteria DTSEN &amp; Sensor Real-Time
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* 1. Poverty Score */}
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                        1. Poverty Score
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-600 text-white font-mono">
                        TINGGI
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xl font-extrabold font-mono text-rose-900">
                        Desil {activeReferralHousehold.desilRegsosek} <span className="text-xs font-normal text-rose-700">(Skor: 92/100)</span>
                      </div>
                      <p className="text-[11px] text-rose-800 leading-tight">
                        Pendapatan &lt; Garis Kemiskinan, lantai {activeReferralHousehold.houseCondition.floor.toLowerCase()}, daya listrik {activeReferralHousehold.houseCondition.electricity}.
                      </p>
                    </div>
                  </div>

                  {/* 2. Shock Exposure */}
                  <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                        2. Shock Exposure
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-600 text-white font-mono">
                        TINGGI
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xl font-extrabold font-mono text-blue-900">
                        96/120 <span className="text-xs font-normal text-blue-700">(Gempa Aktif)</span>
                      </div>
                      <p className="text-[11px] text-blue-800 leading-tight">
                        Rumah rusak berat, terdaftar di zona merah BNPB, radius 3.2 km dari episentrum guncangan.
                      </p>
                    </div>
                  </div>

                  {/* 3. Human Capital Risk */}
                  <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        3. Human Capital Risk
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-600 text-white font-mono">
                        TINGGI
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xl font-extrabold font-mono text-emerald-900">
                        84/100 <span className="text-xs font-normal text-emerald-700">(Gizi &amp; Didik)</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-tight">
                        Terdapat {activeReferralHousehold.toddlerMembers} balita gizi kurang/stunting dan anak usia sekolah rentan drop-out pasca guncangan.
                      </p>
                    </div>
                  </div>

                  {/* 4. Service Gap */}
                  <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        4. Service Gap
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-600 text-white font-mono">
                        SEDANG
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xl font-extrabold font-mono text-amber-900">
                        8.2 km <span className="text-xs font-normal text-amber-700">(Jarak Faskes)</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-tight">
                        Akses ke Puskesmas &gt; 30 menit perjalanan darurat, sanitasi berupa {activeReferralHousehold.houseCondition.sanitation.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN B: HASIL PENCOCOKAN (TRIGGER ENGINE OUTPUT - 3 PILAR) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Bagian B • Hasil Pencocokan Program (Trigger Engine Output)
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Satu keluarga dapat menerima rujukan multi-pilar secara simultan
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* KARTU 1 — SIGAP SHIELD (AKTIF) */}
                  <div className="p-4.5 rounded-2xl border-2 border-blue-300 bg-gradient-to-b from-blue-50/80 to-white shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Pilar 1</span>
                            <h5 className="text-sm font-extrabold text-blue-950 leading-tight">SIGAP SHIELD</h5>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-600 text-white uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          <span>AKTIF</span>
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-blue-100/70 text-blue-900 border border-blue-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider block text-blue-700">Alasan Aktivasi:</span>
                          <span className="font-semibold text-[11px]">"Shock Exposure Tinggi terdeteksi (Skor 96/120, Gempa Aktif &amp; Kerusakan Berat)"</span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Program Rekomendasi:</span>
                          <div className="font-bold text-slate-900 text-xs mt-0.5">
                            BLT Adaptif Kilat + Paket Logistik Tanggap Darurat (Rp 1.200.000)
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Instansi / Lembaga Pengampu:</span>
                          <div className="font-bold text-blue-900 text-xs mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Kementerian Sosial RI (Ditjen Jaminan Sosial)</span>
                          </div>
                        </div>

                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Status Rujukan:</span>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Menunggu Otorisasi PPK (Modul 07)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-blue-100">
                      <button
                        onClick={() => handleNavigateToModule('risk_assessment')}
                        className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Lihat Detail di Modul 03 (Penilaian Risiko)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleNavigateToModule('persetujuan')}
                        className="w-full py-1.5 px-3 bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs rounded-xl border border-blue-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Buka Antrean Otorisasi (Modul 07)</span>
                      </button>
                    </div>
                  </div>

                  {/* KARTU 2 — SIGAP CONVERGE (AKTIF) */}
                  <div className="p-4.5 rounded-2xl border-2 border-emerald-300 bg-gradient-to-b from-emerald-50/80 to-white shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                            <HeartPulse className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Pilar 2</span>
                            <h5 className="text-sm font-extrabold text-emerald-950 leading-tight">SIGAP CONVERGE</h5>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          <span>AKTIF</span>
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-700">Alasan Aktivasi:</span>
                          <span className="font-semibold text-[11px]">"Human Capital Risk Tinggi + Service Gap Sedang (1 Balita Kurang Gizi &amp; Jarak Faskes 8.2 km)"</span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Program Rekomendasi:</span>
                          <div className="font-bold text-slate-900 text-xs mt-0.5">
                            Rujukan Gizi Balita &amp; Outreach Posyandu Prima (PMT Pangan Lokal)
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Instansi / Lembaga Pengampu:</span>
                          <div className="font-bold text-emerald-900 text-xs mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Kemenkes RI &amp; Dinkes Kab. Cianjur (Puskesmas Setempat)</span>
                          </div>
                        </div>

                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Status Rujukan:</span>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-emerald-100 text-emerald-900 text-[11px] font-bold border border-emerald-300">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Terkirim ke Dinkes — Menunggu Tindak Lanjut Nakes</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-emerald-100">
                      <button
                        onClick={() => handleNavigateToModule('converge_vulnerability_map')}
                        className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Lihat Detail di Modul Vulnerability Map</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleNavigateToModule('converge_supply_side')}
                        className="w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Cek Ketersediaan Faskes (CV-2)</span>
                      </button>
                    </div>
                  </div>

                  {/* KARTU 3 — SIGAP RISE (BELUM AKTIF / DIJADWALKAN) */}
                  <div className="p-4.5 rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50/50 to-white shadow-sm flex flex-col justify-between space-y-4 opacity-90">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Pilar 3</span>
                            <h5 className="text-sm font-extrabold text-amber-950 leading-tight">SIGAP RISE</h5>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-700 uppercase tracking-wider">
                          DIJADWALKAN
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-amber-100/60 text-amber-900 border border-amber-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-700">Alasan Penjadwalan:</span>
                          <span className="font-semibold text-[11px]">"Menunggu status Shield stabil terlebih dahulu (prinsip Stabilize sebelum Assess)"</span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Program Rekomendasi:</span>
                          <div className="font-semibold text-slate-700 text-xs mt-0.5">
                            Pelatihan Vokasi, Bantuan Modal Usaha Mikro &amp; Graduasi Kemandirian
                          </div>
                          <span className="text-[10px] text-amber-700 font-medium italic block mt-0.5">
                            (Dijadwalkan setelah 3 bulan status darurat berakhir / Tahap Pemulihan)
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Instansi / Lembaga Pengampu:</span>
                          <div className="font-bold text-amber-900 text-xs mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Kemenko Perekonomian / Kemensos (Ditjen Pemberdayaan)</span>
                          </div>
                        </div>

                        <div className="pt-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Status Rujukan:</span>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-300">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>Belum Diaktifkan (Antrean Pipeline Pasca-Darurat)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-100">
                      <button
                        onClick={() => handleNavigateToModule('rise_inclusion_tracker')}
                        className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Buka Inklusi Produktif Tracker (RS-1)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN C: ALUR RUJUKAN & JEJAK KOORDINASI (HORIZONTAL PIPELINE) */}
              <div className="p-4.5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Bagian C • Alur Rujukan &amp; Jejak Koordinasi (Trigger Engine to Program Layer)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                    Protokol SPBE Terpadu
                  </span>
                </div>

                {/* Horizontal Connected Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 relative">
                  {/* Step 1 */}
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1 relative">
                    <span className="text-[9px] font-bold text-indigo-400 font-mono uppercase block">Langkah 1</span>
                    <div className="font-bold text-white text-xs">Profil Risiko Keluarga</div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      DTSEN + Sinyal Bencana + Data Dapodik &amp; SatuSehat
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 space-y-1 relative">
                    <span className="text-[9px] font-bold text-indigo-300 font-mono uppercase block">Langkah 2</span>
                    <div className="font-bold text-indigo-200 text-xs">Trigger Engine SIGAP</div>
                    <p className="text-[10px] text-indigo-300/80 leading-tight">
                      Skoring 120 Poin &amp; Pencocokan Kebutuhan Multi-Pilar
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1 relative">
                    <span className="text-[9px] font-bold text-emerald-400 font-mono uppercase block">Langkah 3</span>
                    <div className="font-bold text-white text-xs">Rujukan Multi-K/L</div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Instruksi API Resmi ke Kemensos, Kemenkes, &amp; Pemda
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1 relative">
                    <span className="text-[9px] font-bold text-amber-400 font-mono uppercase block">Langkah 4</span>
                    <div className="font-bold text-white text-xs">Eksekusi Program</div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Penyaluran BLT, PMT Nakes, &amp; Pendampingan Lapangan
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1 relative">
                    <span className="text-[9px] font-bold text-blue-400 font-mono uppercase block">Langkah 5</span>
                    <div className="font-bold text-white text-xs">Monitoring Balik</div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Log Feedback &amp; Evaluasi Dampak Graduasi ke SIGAP
                    </p>
                  </div>
                </div>

                {/* Important Formal Policy Disclaimer */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Prinsip Arsitektur SIGAP:</strong> SIGAP tidak menyalurkan bantuan secara langsung. Sistem menghitung kebutuhan, mengklasifikasi tingkat urgensi, lalu mengirim instruksi/rujukan resmi ke kementerian dan lembaga yang berwenang mengeksekusi program masing-masing sesuai kewenangannya (Kemensos untuk perlindungan sosial darurat, Kemenkes/Dinkes untuk layanan gizi dan posyandu, Kemendikbudristek untuk afirmasi pendidikan, dan Kemenko Perekonomian untuk graduasi ekonomi).
                  </p>
                </div>
              </div>

              {/* BAGIAN D: STATUS KOORDINASI LINTAS LEMBAGA */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Bagian D • Status Koordinasi Lintas Lembaga (Real-Time Service Log)
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ID Rujukan: #REF-2026-KK-{activeReferralHousehold.nik.slice(-4)}
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3.5">Lembaga / Instansi Pengampu</th>
                        <th className="py-2.5 px-3.5">Program Terkait</th>
                        <th className="py-2.5 px-3.5">Status Respons</th>
                        <th className="py-2.5 px-3.5">Waktu Respons &amp; SLA</th>
                        <th className="py-2.5 px-3.5 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3.5">
                          <div className="font-bold text-slate-900">Kementerian Sosial RI</div>
                          <div className="text-[10px] text-slate-400">Direktorat Jaminan Sosial Keluarga</div>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="font-semibold text-slate-800">BLT Adaptif Kilat + Top-up KKS</span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Disetujui PPK</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="font-mono font-semibold text-slate-800">2 Jam</span>
                          <span className="text-[10px] text-slate-400 block font-mono">(SLA: 4 Jam)</span>
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <button
                            onClick={() => handleNavigateToModule('persetujuan')}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          >
                            Buka Modul 07 &rarr;
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3.5">
                          <div className="font-bold text-slate-900">Dinas Kesehatan Kab. Cianjur</div>
                          <div className="text-[10px] text-slate-400">Seksi Kesehatan Keluarga &amp; Gizi</div>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="font-semibold text-slate-800">Rujukan Gizi &amp; Outreach Posyandu Prima</span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            <Clock className="w-3 h-3 text-blue-600" />
                            <span>Diproses Nakes</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="font-mono font-semibold text-slate-800">6 Jam</span>
                          <span className="text-[10px] text-slate-400 block font-mono">(SLA: 24 Jam)</span>
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <button
                            onClick={() => handleNavigateToModule('converge_vulnerability_map')}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 cursor-pointer"
                          >
                            Buka CV-1 &rarr;
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3.5">
                          <div className="font-bold text-slate-900">Puskesmas Cugenang / Cianjur</div>
                          <div className="text-[10px] text-slate-400">Bidan Desa &amp; Tim Medis Darurat</div>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="font-semibold text-slate-800">Kunjungan Lapangan &amp; PMT Pangan Lokal</span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Menunggu Jadwal</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="font-mono font-semibold text-slate-600">-</span>
                          <span className="text-[10px] text-slate-400 block font-mono">(Estimasi H+1)</span>
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span className="text-[11px] text-slate-400 font-mono">Terkonfirmasi</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VULNERABILITY PARAMETERS */}
          {activeTab === 'vulnerability' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h5 className="text-xs font-bold text-slate-800 mb-2">Distribusi Desil Wilayah</h5>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Desil 1 (Sangat Miskin):</span>
                      <span className="font-bold text-rose-600">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Desil 2 (Miskin):</span>
                      <span className="font-bold text-amber-600">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Desil 3-4 (Rentan):</span>
                      <span className="font-bold text-blue-600">23%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h5 className="text-xs font-bold text-slate-800 mb-2">Demografi Spesifik</h5>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Lansia Tunggal:</span>
                      <span className="font-bold text-slate-900">412 Jiwa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Penyandang Disabilitas:</span>
                      <span className="font-bold text-slate-900">184 Jiwa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Balita Usia &lt; 5 Thn:</span>
                      <span className="font-bold text-slate-900">890 Anak</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h5 className="text-xs font-bold text-slate-800 mb-2">Kesiapan Kanal Penyaluran</h5>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Kartu KKS / Bank Himbara:</span>
                      <span className="font-bold text-emerald-600">68.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Voucher Tunai PT Pos:</span>
                      <span className="font-bold text-indigo-600">31.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Akurasi Rekening:</span>
                      <span className="font-bold text-emerald-600">99.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT & API LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-2">
                <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>[API_LOG] Interoperabilitas Satu Data Terpadu</span>
                  <span>STATUS_CODE: 200 OK</span>
                </div>
                <p className="text-slate-400">
                  • 2026-08-24 09:12:04 [INFO] Batch sync DTKS Kemensos & Dukcapil API Gateway (Payload: 4,250 records).
                </p>
                <p className="text-slate-400">
                  • 2026-08-24 09:12:18 [SUCCESS] Hashing SHA-256 NIK selesai sesuai UU Perlindungan Data Pribadi No. 27/2022.
                </p>
                <p className="text-slate-400">
                  • 2026-08-24 09:12:35 [INFO] Rekonsiliasi data BNPB INARisk: 0 overlap penerima ganda terdeteksi.
                </p>
                <p className="text-slate-400">
                  • 2026-08-24 09:12:49 [VERIFIED] Daftar BNBA siap dieksekusi Surat Keputusan Pejabat Pembuat Komitmen (PPK).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Sumber Terverifikasi: Pusdatin Kesos Kemensos RI, Ditjen Dukcapil & BPS Regsosek
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Profil</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
