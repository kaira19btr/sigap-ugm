import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  Building2,
  MapPin,
  Users,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Lock,
  Calendar,
  Layers,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { ActivationProposal, UserProfile } from '../types';

interface LocalSopCompliancePanelProps {
  proposals?: ActivationProposal[];
  activeProfile?: UserProfile;
}

export const LocalSopCompliancePanel: React.FC<LocalSopCompliancePanelProps> = ({
  proposals = [],
  activeProfile,
}) => {
  const targetRegionName = activeProfile?.region || 'Kab. Cianjur';
  const [selectedSopIndex, setSelectedSopIndex] = useState<number | null>(null);

  const sopSteps = [
    {
      id: 'sop-01',
      number: 'SOP-01',
      title: 'Identifikasi Anomali & Penerbitan Rekomendasi Wilayah',
      pic: 'Posko Tagana & BPBD Kab. Cianjur',
      slaStandard: '< 6 Jam sejak pemicu',
      actualPerformance: '2.5 Jam',
      status: 'completed',
      completionRate: 100,
      description:
        'Verifikasi sensor curah hujan dan telemetri gempa bumi di Cugenang & Nagrak, konfirmasi status darurat tingkat kabupaten.',
      verificationNote: 'Berita Acara No. BA/042/DINSOS-CJR/2026 telah ditandatangani Kepala Dinsos.',
    },
    {
      id: 'sop-02',
      number: 'SOP-02',
      title: 'Sinkronisasi DTSEN & Pembersihan Data Ganda (Deduplikasi)',
      pic: 'Tim Data & IT Dinsos Kab. Cianjur',
      slaStandard: '< 12 Jam',
      actualPerformance: '4 Jam',
      status: 'completed',
      completionRate: 100,
      description:
        'Pencocokan NIK warga terdampak dengan basis data DTSEN (Desil 1–4 & perluasan darurat Desil 5–6), mencegah duplikasi penerima.',
      verificationNote: '5.240 KK lolos validasi otomatis dengan Dynamic Confidence Score 94.2%.',
    },
    {
      id: 'sop-03',
      number: 'SOP-03',
      title: 'Penyaluran Bantuan BLT Adaptif & Logistik Lapangan',
      pic: 'PT Pos Indonesia Cabang Cianjur & Dinsos',
      slaStandard: '< 5 Hari Kerja',
      actualPerformance: '3.2 Hari (On Track)',
      status: 'in-progress',
      completionRate: 88,
      description:
        'Distribusi dana darurat melalui kantor pos bergerak dan transfer terintegrasi ke 4 titik kelurahan/desa terdampak.',
      verificationNote: '4.610 dari 5.240 KK telah mencairkan dana tanpa potongan liar.',
    },
    {
      id: 'sop-04',
      number: 'SOP-04',
      title: 'Penanganan Sanggah Klasifikasi Desil & Exclusion Error',
      pic: 'Pendamping Sosial & Operator Desa',
      slaStandard: '< 48 Jam / aduan',
      actualPerformance: '24 Jam rata-rata',
      status: 'in-progress',
      completionRate: 83,
      description:
        'Menerima sanggahan warga yang jatuh miskin mendadak pasca-bencana untuk dimasukkan dalam alokasi buffer darurat.',
      verificationNote: '10 dari 12 aduan bulan ini telah diverifikasi lapangan dan disetujui.',
    },
    {
      id: 'sop-05',
      number: 'SOP-05',
      title: 'Rekonsiliasi SPJ, Berita Acara & Kesiapan Audit BPK',
      pic: 'Inspektorat Daerah & Dinsos Cianjur',
      slaStandard: 'T+14 Hari pasca-salur',
      actualPerformance: 'Dokumen 95% Siap',
      status: 'ready-audit',
      completionRate: 95,
      description:
        'Penyusunan laporan pertanggungjawaban digital dengan geotagging penerima dan timestamp transaksi penarikan.',
      verificationNote: 'Semua berkas tersimpan pada repositori terenkripsi sesuai standar ISO 27001.',
    },
  ];

  return (
    <div
      id="panel-status-kepatuhan-sop-daerah"
      className="bg-white rounded-xl border border-rose-200/80 p-5 shadow-xs relative overflow-hidden space-y-5"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-600 to-rose-600"></div>

      {/* Header Panel */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Status Kepatuhan SOP Wilayah Kami
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Yurisdiksi: {targetRegionName}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Indeks Kepatuhan 98.6%</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pemantauan kepatuhan standar operasional prosedur, audit berjenjang, dan pemenuhan SLA penyaluran khusus wilayah kerja {targetRegionName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
            Petugas Aktif: <strong>{activeProfile?.name || 'Admin Dinsos'}</strong>
          </span>
        </div>
      </div>

      {/* 4 Summary Local Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 bg-gradient-to-br from-emerald-50/60 to-white rounded-xl border border-emerald-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
            <span>SOP Selesai / Terpenuhi</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-1 flex items-baseline gap-1">
            <AnimatedCounter value={5} duration={1000} />
            <span className="text-xs font-sans font-bold text-slate-500">dari 5 Tahapan</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">
            100% tahapan memenuhi protokol darurat
          </div>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-blue-50/60 to-white rounded-xl border border-blue-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
            <span>Rata-rata SLA Wilayah</span>
            <Clock className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-blue-600 mt-1 flex items-baseline gap-1">
            <AnimatedCounter value={3.2} duration={1000} decimalPlaces={1} />
            <span className="text-xs font-sans font-bold text-slate-500">Hari Kerja</span>
          </div>
          <div className="text-[10px] text-blue-700 font-medium mt-1">
            Lebih cepat dari target SLA 5 hari
          </div>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-amber-50/60 to-white rounded-xl border border-amber-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
            <span>Sanggah Desil Tuntas</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-600 mt-1 flex items-baseline gap-1">
            <AnimatedCounter value={83.3} duration={1000} decimalPlaces={1} suffix="%" />
          </div>
          <div className="text-[10px] text-amber-700 font-medium mt-1">
            10 dari 12 sanggahan terverifikasi
          </div>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-purple-50/60 to-white rounded-xl border border-purple-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
            <span>Kesiapan Dokumen SPJ</span>
            <FileCheck className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-600 mt-1 flex items-baseline gap-1">
            <AnimatedCounter value={95} duration={1000} suffix="%" />
          </div>
          <div className="text-[10px] text-purple-700 font-medium mt-1">
            Siap diverifikasi BPK &amp; Inspektorat
          </div>
        </div>
      </div>

      {/* SOP Checklist Table / Interactive Cards */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Matriks Kepatuhan 5 Tahapan SOP Penyaluran Wilayah {targetRegionName}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-normal">Klik baris untuk membuka catatan verifikasi</span>
        </div>

        <div className="space-y-2.5">
          {sopSteps.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => setSelectedSopIndex(selectedSopIndex === idx ? null : idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedSopIndex === idx
                  ? 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-400/20 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 rounded bg-slate-900 text-white font-mono text-[10px] font-extrabold shrink-0 mt-0.5">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{step.title}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 flex-wrap">
                      <span>
                        PIC: <strong className="text-slate-700">{step.pic}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Standar SLA: <strong className="text-slate-700">{step.slaStandard}</strong>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">
                        Realisasi: {step.actualPerformance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-xs font-mono font-extrabold text-slate-800">
                      {step.completionRate}%
                    </div>
                    <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          step.completionRate === 100
                            ? 'bg-emerald-500'
                            : step.completionRate >= 80
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${step.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border shrink-0 ${
                      step.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : step.status === 'in-progress'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-purple-50 text-purple-800 border-purple-200'
                    }`}
                  >
                    {step.status === 'completed' ? 'Selesai' : step.status === 'in-progress' ? 'On-Track' : 'Siap Audit'}
                  </span>

                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      selectedSopIndex === idx ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expandable SOP Verification Notes */}
              {selectedSopIndex === idx && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs space-y-2 bg-white/70 p-3 rounded-lg">
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  <div className="p-2.5 rounded bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Catatan Audit &amp; Bukti Verifikasi: </span>
                      <span>{step.verificationNote}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
