import React, { useState, useEffect } from 'react';
import { RegionRiskData, UserRole, UserProfile } from '../types';
import {
  AlertTriangle,
  X,
  CheckCircle2,
  Send,
  ShieldAlert,
  ArrowRight,
  Package,
  Users,
  Radio,
  FileCheck,
  Building2,
  Lock,
  Sparkles,
  MapPin,
  TrendingUp,
  Clock,
  DollarSign,
  Truck,
  Layers,
  ChevronRight,
  Info,
  Check,
  FileText,
  BadgeAlert,
  Flame,
  Droplets,
  Coins,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface EmergencyModalProps {
  region: RegionRiskData | null;
  allRegions?: RegionRiskData[];
  onSelectRegion?: (region: RegionRiskData) => void;
  isOpen: boolean;
  onClose: () => void;
  onDispatchAction: (details: {
    packageType: string;
    recipientQuota: number;
    notes: string;
    actionType: 'pusat_authorization' | 'daerah_activation';
    documentNumber: string;
    budgetEstimate: number;
    targetDesils: string;
    emergencyPersonnelCount?: number;
  }) => void;
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  region,
  allRegions = [],
  onSelectRegion,
  isOpen,
  onClose,
  onDispatchAction,
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  const isDaerah = currentRole === 'admin_daerah';
  const targetRegion = region || allRegions[0];

  // Role-specific states & defaults
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [recipientQuotaKK, setRecipientQuotaKK] = useState<number>(0);
  const [targetDesils, setTargetDesils] = useState<string>('Desil 1–4 (Reguler) + Desil 5–6 (Horizontal Expansion)');
  const [notes, setNotes] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [personnelCount, setPersonnelCount] = useState<number>(120);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastDispatchedData, setLastDispatchedData] = useState<any>(null);

  // Auto-populate data whenever region or role changes
  useEffect(() => {
    if (!targetRegion) return;

    const totalPop = targetRegion.affectedPopulation || 12000;
    const estKK = Math.round(totalPop / 3.8);
    setRecipientQuotaKK(estKK);

    const randomDocSuffix = Math.floor(100 + Math.random() * 900);
    const year = new Date().getFullYear();

    if (isDaerah) {
      setDocumentNumber(`BA-DARURAT/DINSOS-CJR/${year}/${randomDocSuffix}`);
      setSelectedPackage('Mobilisasi Satgas Tagana & Pembukaan Dapur Umum Desa');
      setNotes(
        `Aktivasi tanggap darurat tingkat kabupaten untuk wilayah ${targetRegion.name} (${targetRegion.regency}). Mengusulkan penetapan status darurat bupati, pengerahan buffer cadangan beras, dan fast-track BLT-A ke Kemensos Pusat.`
      );
      setPersonnelCount(120);
    } else {
      setDocumentNumber(`SK-MENSOS/DSP/${year}/08/${randomDocSuffix}`);
      setSelectedPackage('Bantuan Tunai Langsung Adaptif (BLT-A) via Transfer Himbara / SP2D Online');
      setNotes(
        `Otorisasi tanggap darurat nasional berbasis telemetri sistem sensing SIGAP. Alokasi DSP APBN siap dicairkan dengan bypass verifikasi manual dan sistem Horizontal Expansion Desil 1–6.`
      );
      setPersonnelCount(250);
    }
  }, [targetRegion, isDaerah]);

  if (!isOpen || !targetRegion) return null;

  // Financial calculations
  const unitCostBLT = 600000; // Rp 600.000 / KK
  const totalBudgetValue = recipientQuotaKK * unitCostBLT;
  const totalBudgetFormatted = (totalBudgetValue / 1_000_000_000).toFixed(2); // in Miliar IDR

  // Target household segmentation
  const desil1to4KK = Math.round(recipientQuotaKK * 0.72);
  const desil5to6KK = recipientQuotaKK - desil1to4KK;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      packageType: selectedPackage,
      recipientQuota: recipientQuotaKK,
      notes,
      actionType: (isDaerah ? 'daerah_activation' : 'pusat_authorization') as any,
      documentNumber,
      budgetEstimate: totalBudgetValue,
      targetDesils,
      emergencyPersonnelCount: personnelCount,
    };

    setLastDispatchedData(payload);
    setIsSuccess(true);

    setTimeout(() => {
      onDispatchAction(payload);
    }, 400);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      id="modal-emergency-action"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header with Role Distinction */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isDaerah
              ? 'bg-gradient-to-r from-amber-50 via-rose-50/40 to-blue-50/30 border-amber-200'
              : 'bg-gradient-to-r from-rose-50 via-rose-100/40 to-blue-50/30 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl text-white flex items-center justify-center shadow-md ${
                isDaerah
                  ? 'bg-gradient-to-br from-amber-600 to-rose-600 shadow-amber-600/20'
                  : 'bg-gradient-to-br from-rose-600 to-blue-700 shadow-rose-600/20'
              }`}
            >
              {isDaerah ? <Truck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    isDaerah
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {isDaerah ? 'Kewenangan Tingkat Daerah (Kabupaten)' : 'Kewenangan Tingkat Pusat (Nasional)'}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {documentNumber}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 tracking-tight">
                {isDaerah
                  ? `Aktivasi Lapangan & Usulan Penyaluran Kedaruratan Wilayah`
                  : `Otorisasi Tanggap Darurat & Alokasi DSP APBN Nasional`}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1">
          {isSuccess ? (
            /* Success Summary State */
            <div className="text-center py-6 px-4 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {isDaerah ? 'Aktivasi Lapangan Berhasil Dijalankan' : 'Otorisasi Nasional Resmi Diterbitkan'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Protokol Respons Cepat Terdaftar!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  {isDaerah
                    ? `Satgas Tagana wilayah ${targetRegion.name} disiagakan dan berkas usulan bantuan darurat telah diteruskan secara otomatis ke Kemensos RI.`
                    : `Surat Keputusan Otorisasi DSP senilai Rp ${totalBudgetFormatted} Miliar telah diterbitkan dan tercatat pada Antrean Persetujuan & Log Audit BPK.`}
                </p>
              </div>

              {/* Success Receipt Details Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Nomor Berkas:</span>
                  <span className="font-mono font-bold text-slate-900">{documentNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Wilayah Sasaran:</span>
                  <span className="font-bold text-slate-800">{targetRegion.name} ({targetRegion.regency})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Paket Respons:</span>
                  <span className="font-bold text-blue-700">{selectedPackage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Target Kuota Penerima:</span>
                  <span className="font-mono font-bold text-slate-900">{recipientQuotaKK.toLocaleString('id-ID')} KK ({targetRegion.affectedPopulation.toLocaleString('id-ID')} Jiwa)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Estimasi Alokasi Dana:</span>
                  <span className="font-mono font-bold text-emerald-600">Rp {totalBudgetFormatted} Miliar</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Pengesah / Pengusul:</span>
                  <span className="font-semibold text-slate-800">{activeProfile?.name} ({activeProfile?.agency})</span>
                </div>
              </div>

              <div className="pt-3 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDone}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Selesai &amp; Tutup
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Form State */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Quick Region Selector & Live Telemetry Strip */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-md space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                      Pilih &amp; Evaluasi Wilayah Sasaran:
                    </span>
                  </div>

                  {allRegions.length > 0 && onSelectRegion && (
                    <select
                      value={targetRegion.id}
                      onChange={(e) => {
                        const reg = allRegions.find((r) => r.id === e.target.value);
                        if (reg) onSelectRegion(reg);
                      }}
                      className="bg-slate-800 text-white text-xs font-bold border border-slate-700 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-rose-500"
                    >
                      {allRegions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.regency}) — {r.status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Telemetry Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-slate-200">
                  <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-medium">Status Bahaya</span>
                    <span
                      className={`text-xs font-extrabold uppercase mt-0.5 inline-block ${
                        targetRegion.status === 'darurat' ? 'text-rose-400' : 'text-amber-400'
                      }`}
                    >
                      {targetRegion.status}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-medium">Indeks Kerentanan</span>
                    <span className="text-xs font-extrabold font-mono text-rose-300 mt-0.5 block">
                      {targetRegion.vulnerabilityIndex} / 10.0
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-medium">Target SLA</span>
                    <span className="text-xs font-extrabold font-mono text-amber-300 mt-0.5 block">
                      {targetRegion.slaTargetDays} Hari Kerja
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-medium">Estimasi Terdampak</span>
                    <span className="text-xs font-extrabold font-mono text-emerald-300 mt-0.5 block">
                      {targetRegion.affectedPopulation.toLocaleString('id-ID')} Jiwa
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 flex items-start gap-1.5 pt-1 border-t border-white/10">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pemicu Anomali:</strong> {targetRegion.crisisType} ({targetRegion.rainfall}, {targetRegion.ricePrice})
                  </span>
                </div>
              </div>

              {/* 2. Authority & Role Difference Explanation Banner */}
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
                  isDaerah
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-blue-50/70 border-blue-200 text-blue-950'
                }`}
              >
                <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isDaerah ? 'text-amber-700' : 'text-blue-700'}`} />
                <div className="leading-relaxed space-y-1">
                  <span className="font-bold">
                    {isDaerah
                      ? 'Perbedaan Peran Daerah (Operasional & Penanganan Cepat Lapangan):'
                      : 'Perbedaan Peran Pusat (Otorisasi Anggaran & Kebijakan Nasional):'}
                  </span>
                  <p className="text-slate-600">
                    {isDaerah
                      ? 'Sebagai Admin Daerah / Dinsos Kabupaten, tindakan Anda fokus pada mobilisasi satgas Tagana, pembukaan posko dapur umum di desa terdampak, dan pengiriman usulan resmi aktivasi BLT-A ke Pusat.'
                      : 'Sebagai Admin Pusat / Kemensos RI, tindakan Anda mengesahkan Surat Keputusan Menteri, mengalokasikan Dana Siap Pakai (DSP) APBN, dan memerintahkan kliring transfer perbankan secara masal.'}
                  </p>
                </div>
              </div>

              {/* 3. Package Selection (Role-Differentiated) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Paket Respons Cepat yang Dijalankan:</span>
                  <span className="text-[11px] font-normal text-slate-500">Sesuai SOP Tanggap Darurat</span>
                </label>

                <div className="space-y-2">
                  {isDaerah ? (
                    /* Daerah Package Options */
                    <>
                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          selectedPackage.includes('Mobilisasi Satgas Tagana')
                            ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package-option"
                          checked={selectedPackage.includes('Mobilisasi Satgas Tagana')}
                          onChange={() =>
                            setSelectedPackage(
                              'Mobilisasi Satgas Tagana & Pembukaan Dapur Umum Desa'
                            )
                          }
                          className="mt-1 accent-amber-600"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">
                            Mobilisasi Satgas Tagana &amp; Pembukaan Dapur Umum Desa
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Pengerahan 120 personel Tagana lokal, tenda pengungsian, dan logistik dapur mandiri di titik krisis.
                          </div>
                        </div>
                      </label>

                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          selectedPackage.includes('Penyaluran Buffer Cadangan Beras')
                            ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package-option"
                          checked={selectedPackage.includes('Penyaluran Buffer Cadangan Beras')}
                          onChange={() =>
                            setSelectedPackage(
                              'Penyaluran Buffer Cadangan Beras Daerah (Gudang Dinsos Kabupaten)'
                            )
                          }
                          className="mt-1 accent-amber-600"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">
                            Penyaluran Buffer Cadangan Beras Daerah (Gudang Dinsos Kabupaten)
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Pelepasan buffer cadangan pangan darurat kabupaten untuk 48 jam pertama pra-bantuan pusat.
                          </div>
                        </div>
                      </label>

                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          selectedPackage.includes('Usulan Prioritas Fast-Track BLT-A')
                            ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package-option"
                          checked={selectedPackage.includes('Usulan Prioritas Fast-Track BLT-A')}
                          onChange={() =>
                            setSelectedPackage(
                              'Usulan Prioritas Fast-Track BLT-A & Perluasan DTSEN ke Kemensos RI'
                            )
                          }
                          className="mt-1 accent-amber-600"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">
                            Usulan Prioritas Fast-Track BLT-A &amp; Perluasan DTSEN ke Kemensos RI
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Pengajuan berkas penetapan bupati untuk pencairan dana siap pakai pusat (Rp 600.000 / KK).
                          </div>
                        </div>
                      </label>
                    </>
                  ) : (
                    /* Pusat Package Options */
                    <>
                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          selectedPackage.includes('BLT-A')
                            ? 'bg-rose-50/60 border-rose-400 ring-2 ring-rose-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package-option"
                          checked={selectedPackage.includes('BLT-A')}
                          onChange={() =>
                            setSelectedPackage(
                              'Bantuan Tunai Langsung Adaptif (BLT-A) via Transfer Himbara / SP2D Online'
                            )
                          }
                          className="mt-1 accent-rose-600"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">
                            Bantuan Tunai Langsung Adaptif (BLT-A) — Rp 600.000 / KK (Transfer Himbara / SP2D)
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Otorisasi pencairan otomatis ke rekening KKS penerima desil 1–4 dan kartu darurat desil 5–6.
                          </div>
                        </div>
                      </label>

                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          selectedPackage.includes('Cadangan Beras Pemerintah')
                            ? 'bg-rose-50/60 border-rose-400 ring-2 ring-rose-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package-option"
                          checked={selectedPackage.includes('Cadangan Beras Pemerintah')}
                          onChange={() =>
                            setSelectedPackage(
                              'Bantuan Cadangan Beras Pemerintah (CBP) Darurat Bulog - 20 Kg / KK'
                            )
                          }
                          className="mt-1 accent-rose-600"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">
                            Bantuan Cadangan Beras Pemerintah (CBP) Darurat Bulog — 20 Kg / KK
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Instruksi pelepasan stok cadangan pangan Bulog regional menuju posko logistik terdampak.
                          </div>
                        </div>
                      </label>

                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          selectedPackage.includes('PT Pos Indonesia')
                            ? 'bg-rose-50/60 border-rose-400 ring-2 ring-rose-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package-option"
                          checked={selectedPackage.includes('PT Pos Indonesia')}
                          onChange={() =>
                            setSelectedPackage(
                              'Penyaluran Cash Door-to-Door via PT Pos Indonesia (Blankspot / Akses Sulit)'
                            )
                          }
                          className="mt-1 accent-rose-600"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">
                            Penyaluran Cash Door-to-Door via PT Pos Indonesia (Wilayah Terisolir)
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            Mobilisasi juru bayar kantor pos keliling dengan verifikasi biometrik offline di posko pengungsian.
                          </div>
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* 4. Automated Demographic Breakdown & Budget Calculation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Kalkulasi Kuota &amp; Segmentasi Desil DTSEN:
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 font-bold">
                    Total Estimasi: Rp {totalBudgetFormatted} Miliar
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[11px]">Total Target Kuota</span>
                    <input
                      type="number"
                      value={recipientQuotaKK}
                      onChange={(e) => setRecipientQuotaKK(Math.max(100, Number(e.target.value)))}
                      className="w-full font-mono font-bold text-sm text-slate-900 mt-1 p-1 border rounded bg-slate-50 focus:bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Kepala Keluarga (KK)</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[11px]">Desil 1–4 (Bansos Reguler)</span>
                    <div className="font-mono font-bold text-sm text-blue-700 mt-1">
                      {desil1to4KK.toLocaleString('id-ID')} KK
                    </div>
                    <span className="text-[10px] text-blue-600 mt-0.5 block">72% Kuota Prioritas</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[11px]">Desil 5–6 (Horizontal Expansion)</span>
                    <div className="font-mono font-bold text-sm text-purple-700 mt-1">
                      {desil5to6KK.toLocaleString('id-ID')} KK
                    </div>
                    <span className="text-[10px] text-purple-600 mt-0.5 block">28% Korban Rentan Baru</span>
                  </div>
                </div>

                {isDaerah && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-100/60 border border-amber-300/80 text-[11px] text-amber-900">
                    <span className="font-bold">Kesiapan Satgas Tagana Daerah:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={personnelCount}
                        onChange={(e) => setPersonnelCount(Number(e.target.value))}
                        className="w-16 p-1 text-center font-mono font-bold bg-white rounded border border-amber-300 text-xs"
                      />
                      <span>Personel Siaga</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Verifier Notes & Audit Trail */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Catatan Resmi &amp; Keterangan Pengesahan Protokol:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 font-medium leading-relaxed"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audit Trail Terenkripsi ISO 27001</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ${
                      isDaerah
                        ? 'bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 hover:from-amber-500 hover:to-rose-600 shadow-amber-600/20'
                        : 'bg-gradient-to-r from-rose-600 via-rose-500 to-blue-600 hover:from-rose-500 hover:to-blue-500 shadow-rose-600/20'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isDaerah ? 'Jalankan Aktivasi & Teruskan ke Pusat' : 'Terbitkan Otorisasi Nasional (DSP)'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
