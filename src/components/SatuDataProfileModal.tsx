import React, { useState } from 'react';
import { SatuDataItem } from '../types';
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
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  const [activeTab, setActiveTab] = useState<'beneficiaries' | 'vulnerability' | 'audit'>('beneficiaries');
  const [householdSearch, setHouseholdSearch] = useState(selectedNik || '');
  const [inspectHousehold, setInspectHousehold] = useState<BeneficiaryHousehold | null>(null);

  const sampleHouseholds = getSampleHouseholdsForVillage(item.village);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
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
                <span>{item.regency} • Interoperabilitas DTKS, Regsosek & BNPB</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              title="Unduh JSON Profil"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
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

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-white">
          <button
            onClick={() => {
              setActiveTab('beneficiaries');
              setInspectHousehold(null);
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
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
              setActiveTab('vulnerability');
              setInspectHousehold(null);
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
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
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
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
                      <th className="py-2.5 px-3.5">Desil Regsosek</th>
                      <th className="py-2.5 px-3.5">Status Bansos Reguler</th>
                      <th className="py-2.5 px-3.5">Bantuan Darurat SIGAP</th>
                      <th className="py-2.5 px-3.5 text-right">Rincian</th>
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
                          <button
                            onClick={() => setInspectHousehold(h)}
                            className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-200 inline-flex items-center gap-1"
                          >
                            <span>Detail</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INDIVIDUAL HOUSEHOLD DEEP INSPECTION */}
          {inspectHousehold && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setInspectHousehold(null)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                >
                  <span>&larr; Kembali ke Daftar KK {item.village}</span>
                </button>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  ID Verifikasi: #REG-{inspectHousehold.nik.slice(-6)}
                </span>
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
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Profil</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
