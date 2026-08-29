import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import {
  Building2,
  Stethoscope,
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  Wifi,
  Sun,
  Truck,
  Users,
} from 'lucide-react';

interface SupplyIntervention {
  id: string;
  sector: 'Kesehatan' | 'Pendidikan';
  title: string;
  region: string;
  agency: string;
  targetUnit: string;
  currentProgress: number; // in %
  status: 'Belum Dimulai' | 'Sedang Berjalan' | 'Selesai';
  priority: 'Kritis' | 'Tinggi' | 'Sedang';
  estimatedCost: string;
  description: string;
}

const INITIAL_SUPPLY_ITEMS: SupplyIntervention[] = [
  // Sektor Kesehatan
  {
    id: 'sup-kes-01',
    sector: 'Kesehatan',
    title: 'Penempatan Nakes & Bidan Desa Pedalaman (Nusantara Sehat)',
    region: 'Kab. Sumba Timur (14 Desa)',
    agency: 'Kemenkes RI & Dinkes NTT',
    targetUnit: '28 Tenaga Kesehatan',
    currentProgress: 65,
    status: 'Sedang Berjalan',
    priority: 'Kritis',
    estimatedCost: 'Rp 1.4 M',
    description: 'Penugasan khusus nakes untuk pendampingan 1.000 Hari Pertama Kehidupan (HPK) dan deteksi stunting.',
  },
  {
    id: 'sup-kes-02',
    sector: 'Kesehatan',
    title: 'Puskesmas Pembantu (Pustu) Prima & Laboratorium Portabel',
    region: 'Kab. Cianjur (Kec. Cugenang)',
    agency: 'Kemenkes RI & PUPR',
    targetUnit: '6 Unit Pustu Prima',
    currentProgress: 100,
    status: 'Selesai',
    priority: 'Tinggi',
    estimatedCost: 'Rp 2.8 M',
    description: 'Pembangunan kembali fasilitas layanan primer pasca gempa lengkap dengan cold chain vaksin.',
  },
  {
    id: 'sup-kes-03',
    sector: 'Kesehatan',
    title: 'Layanan Mobile Health Clinic & Perahu Medis Sungai',
    region: 'Kab. Asmat (Papua Selatan)',
    agency: 'Kemenkes & Pemkab Asmat',
    targetUnit: '4 Unit Speedboat Ambulans',
    currentProgress: 35,
    status: 'Sedang Berjalan',
    priority: 'Kritis',
    estimatedCost: 'Rp 3.2 M',
    description: 'Jangkauan pelayanan kesehatan ibu-anak ke distrik rawa terpencil tanpa akses jalan darat.',
  },
  {
    id: 'sup-kes-04',
    sector: 'Kesehatan',
    title: 'Platform Telemedicine Terpadu Puskesmas-RSUD',
    region: 'Kab. Flores Timur & Lembata',
    agency: 'Kemenkes & Kemenkomdigi',
    targetUnit: '18 Titik Puskesmas',
    currentProgress: 15,
    status: 'Sedang Berjalan',
    priority: 'Sedang',
    estimatedCost: 'Rp 850 Juta',
    description: 'Konsultasi spesialis anak & obstetri jarak jauh via satelit BAKTI Kominfo.',
  },

  // Sektor Pendidikan
  {
    id: 'sup-dik-01',
    sector: 'Pendidikan',
    title: 'Program Guru Penggerak Afirmasi & Tunjangan Khusus',
    region: 'Kab. Sumba Timur & Flores Timur',
    agency: 'Kemendikbudristek',
    targetUnit: '64 Guru Afirmasi',
    currentProgress: 80,
    status: 'Sedang Berjalan',
    priority: 'Tinggi',
    estimatedCost: 'Rp 2.1 M',
    description: 'Pemberian insentif retensi guru di daerah 3T untuk mencegah angka putus sekolah anak KPM PKH.',
  },
  {
    id: 'sup-dik-02',
    sector: 'Pendidikan',
    title: 'Penyaluran BOS Afirmasi & Digitalisasi Bahan Belajar',
    region: 'Kab. Asmat & Kab. Demak',
    agency: 'Kemendikbudristek',
    targetUnit: '42 Sekolah Dasar/SMP',
    currentProgress: 100,
    status: 'Selesai',
    priority: 'Tinggi',
    estimatedCost: 'Rp 4.5 M',
    description: 'Bantuan kuota belajar dan perangkat chromebook untuk sekolah berakreditasi C di kantong kemiskinan.',
  },
  {
    id: 'sup-dik-03',
    sector: 'Pendidikan',
    title: 'Pembangkit Listrik Surya (PLTS) & Akses Internet Sekolah 3T',
    region: 'Kab. Sumba Timur (10 SD Pedalaman)',
    agency: 'Kemenkomdigi & ESDM',
    targetUnit: '10 Paket Panel Surya & VSAT',
    currentProgress: 20,
    status: 'Sedang Berjalan',
    priority: 'Kritis',
    estimatedCost: 'Rp 1.9 M',
    description: 'Penyediaan daya listrik mandiri agar proses asesmen nasional dan belajar digital berjalan lancar.',
  },
  {
    id: 'sup-dik-04',
    sector: 'Pendidikan',
    title: 'Pendidikan Kesetaraan Kejar Paket A/B/C & Vokasi Remaja',
    region: 'Kab. Cianjur & Kab. Brebes',
    agency: 'Kemendikbudristek & Dinsos',
    targetUnit: '1.200 Peserta Remaja Putus Sekolah',
    currentProgress: 45,
    status: 'Sedang Berjalan',
    priority: 'Sedang',
    estimatedCost: 'Rp 1.1 M',
    description: 'Menarik kembali anak dari keluarga miskin DTSEN ke jalur pendidikan formal dan sertifikasi keahlian.',
  },
];

interface ConvergeSupplySideViewProps {
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const ConvergeSupplySideView: React.FC<ConvergeSupplySideViewProps> = ({
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  const [items, setItems] = useState<SupplyIntervention[]>(INITIAL_SUPPLY_ITEMS);
  const [sectorFilter, setSectorFilter] = useState<'all' | 'Kesehatan' | 'Pendidikan'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Belum Dimulai' | 'Sedang Berjalan' | 'Selesai'>('all');

  const filteredItems = items.filter((item) => {
    const matchSector = sectorFilter === 'all' || item.sector === sectorFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSector && matchStatus;
  });

  const handleUpdateProgress = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = Math.min(100, Math.max(0, item.currentProgress + delta));
          const nextStatus = next === 100 ? 'Selesai' : next === 0 ? 'Belum Dimulai' : 'Sedang Berjalan';
          return { ...item, currentProgress: next, status: nextStatus };
        }
        return item;
      })
    );
  };

  const totalHealthProgress = Math.round(
    items.filter((i) => i.sector === 'Kesehatan').reduce((acc, i) => acc + i.currentProgress, 0) /
      items.filter((i) => i.sector === 'Kesehatan').length
  );

  const totalEducationProgress = Math.round(
    items.filter((i) => i.sector === 'Pendidikan').reduce((acc, i) => acc + i.currentProgress, 0) /
      items.filter((i) => i.sector === 'Pendidikan').length
  );

  return (
    <div id="converge-supply-side-module" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>SIGAP CONVERGE • Pilar Q2 • Supply-Side Equalization Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Pemerataan Intervensi Supply-Side (Kesehatan &amp; Pendidikan)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pelacakan kesiapan fasilitas primer, distribusi nakes, retensi guru, sarana listrik &amp; internet sekolah di wilayah prioritas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
            Supply-Side Matrix
          </div>
        </div>
      </div>

      {/* Aggregate Readiness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kesehatan */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Sektor Layanan Kesehatan</h3>
                <p className="text-[11px] text-slate-500">Puskesmas, Posyandu Prima, Nakes &amp; Gizi</p>
              </div>
            </div>
            <span className="text-2xl font-extrabold font-mono text-rose-600">
              {totalHealthProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${totalHealthProgress}%` }}
              className="bg-rose-500 h-full rounded-full transition-all"
            ></div>
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between font-mono">
            <span>4 Program Strategis Aktif</span>
            <span>Target Selesai: Triwulan II 2026</span>
          </div>
        </div>

        {/* Pendidikan */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Sektor Layanan Pendidikan</h3>
                <p className="text-[11px] text-slate-500">Guru 3T, BOS Afirmasi, PLTS &amp; Internet</p>
              </div>
            </div>
            <span className="text-2xl font-extrabold font-mono text-blue-600">
              {totalEducationProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${totalEducationProgress}%` }}
              className="bg-blue-600 h-full rounded-full transition-all"
            ></div>
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between font-mono">
            <span>4 Program Strategis Aktif</span>
            <span>Target Selesai: Triwulan III 2026</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1">Filter Sektor:</span>
          <button
            onClick={() => setSectorFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sectorFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Sektor
          </button>
          <button
            onClick={() => setSectorFilter('Kesehatan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sectorFilter === 'Kesehatan' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Kesehatan
          </button>
          <button
            onClick={() => setSectorFilter('Pendidikan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sectorFilter === 'Pendidikan' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Pendidikan
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1">Status:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              statusFilter === 'all' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setStatusFilter('Sedang Berjalan')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              statusFilter === 'Sedang Berjalan' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'
            }`}
          >
            Berjalan
          </button>
          <button
            onClick={() => setStatusFilter('Selesai')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              statusFilter === 'Selesai' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'
            }`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Grid of Supply Interventions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                    item.sector === 'Kesehatan'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.sector} • {item.agency}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                    item.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Sedang Berjalan'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">Lokasi Wilayah:</span>
                  <span className="font-semibold text-slate-800">{item.region}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Target Kuantitatif:</span>
                  <span className="font-semibold text-slate-800">{item.targetUnit}</span>
                </div>
              </div>

              {/* Progress and controls */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 font-medium">Realisasi Lapangan:</span>
                  <span className="font-bold text-slate-900">{item.currentProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${item.currentProgress}%` }}
                    className={`h-full rounded-full transition-all ${
                      item.currentProgress === 100
                        ? 'bg-emerald-500'
                        : item.sector === 'Kesehatan'
                        ? 'bg-rose-500'
                        : 'bg-blue-600'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Quick Update Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-400 font-mono">Estimasi: {item.estimatedCost}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateProgress(item.id, -10)}
                    disabled={item.currentProgress <= 0}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-lg"
                  >
                    -10%
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(item.id, 10)}
                    disabled={item.currentProgress >= 100}
                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-40 text-emerald-800 text-xs font-bold rounded-lg"
                  >
                    +10%
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
