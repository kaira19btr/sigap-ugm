import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import {
  Coins,
  ShieldCheck,
  Layers,
  Building2,
  Landmark,
  Wallet,
  Flag,
  Umbrella,
  FileText,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  SlidersHorizontal,
  Scale,
  Sparkles,
  Download,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface ContingencyFinancingViewProps {
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const ContingencyFinancingView: React.FC<ContingencyFinancingViewProps> = ({
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  // Scenario total required funding in Billions IDR (default 18.5 Miliar corresponding to Level 3 Darurat in Cianjur from Modul 03)
  const [fundingNeedMiliar, setFundingNeedMiliar] = useState<number>(18.5);
  const [selectedDisasterScenario, setSelectedDisasterScenario] = useState<string>('gempa_cianjur');
  const [apbdReserveCapacity, setApbdReserveCapacity] = useState<number>(3.5); // 3.5 Miliar BTT Kab. Cianjur
  const [apbnTransferCeiling, setApbnTransferCeiling] = useState<number>(15.0); // Plafon alokasi transfer cadangan per kabupaten/kejadian
  const [pfbActive, setPfbActive] = useState<boolean>(true);

  // Pre-configured Scenarios
  const handleScenarioChange = (scenario: string) => {
    setSelectedDisasterScenario(scenario);
    if (scenario === 'gempa_cianjur') {
      setFundingNeedMiliar(18.5);
      setApbdReserveCapacity(3.5);
      setApbnTransferCeiling(15.0);
    } else if (scenario === 'banjir_demak') {
      setFundingNeedMiliar(2.8);
      setApbdReserveCapacity(4.0);
      setApbnTransferCeiling(15.0);
    } else if (scenario === 'kekeringan_sumba') {
      setFundingNeedMiliar(6.8);
      setApbdReserveCapacity(1.5);
      setApbnTransferCeiling(15.0);
    } else if (scenario === 'erupsi_katastrofik') {
      setFundingNeedMiliar(32.0);
      setApbdReserveCapacity(2.0);
      setApbnTransferCeiling(15.0);
    }
  };

  // Waterfall / Risk-Layered Calculation:
  // Lapisan 1: APBD BTT absorbs up to local capacity
  const layer1_APBD = Math.min(fundingNeedMiliar, apbdReserveCapacity);
  const remainingAfterLayer1 = Math.max(0, fundingNeedMiliar - layer1_APBD);

  // Lapisan 2: APBN Transfer/Contingency absorbs remaining up to ceiling
  const layer2_APBN = Math.min(remainingAfterLayer1, apbnTransferCeiling);
  const remainingAfterLayer2 = Math.max(0, remainingAfterLayer1 - layer2_APBN);

  // Lapisan 3: Contingent Financing / Pooling Fund Bencana (PFB) absorbs remaining if active
  const layer3_Contingent = pfbActive ? remainingAfterLayer2 : 0;
  const unfundedDeficit = pfbActive ? 0 : remainingAfterLayer2;

  // Percentage shares
  const pctLayer1 = Math.round((layer1_APBD / fundingNeedMiliar) * 100) || 0;
  const pctLayer2 = Math.round((layer2_APBN / fundingNeedMiliar) * 100) || 0;
  const pctLayer3 = Math.round((layer3_Contingent / fundingNeedMiliar) * 100) || 0;
  const pctDeficit = Math.round((unfundedDeficit / fundingNeedMiliar) * 100) || 0;

  // Layer Activation Status
  const isLayer1Active = layer1_APBD > 0;
  const isLayer1Full = layer1_APBD >= apbdReserveCapacity && remainingAfterLayer1 > 0;
  const isLayer2Active = layer2_APBN > 0;
  const isLayer2Full = layer2_APBN >= apbnTransferCeiling && remainingAfterLayer2 > 0;
  const isLayer3Active = layer3_Contingent > 0;

  return (
    <div id="contingency-financing-module" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span>SIGAP SHIELD • Modul 03b • Pembiayaan Kontinjensi (Tahap 4)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Arsitektur Pembiayaan Risiko Bencana Berlapis (DRFI)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Struktur pembiayaan bertingkat (<em>risk-layered financing</em>) respons perlindungan sosial adaptif berbasis regulasi resmi Kementerian Keuangan: alokasi bertahap dari retensi fiskal daerah hingga jaring pengaman katastropik nasional.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold font-mono">
            Tahap 1: Stabilize • Pilar SHIELD
          </div>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor Memo Fiskal</span>
          </button>
        </div>
      </div>

      {/* Waterfall Hierarchy Spectrum Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Prinsip Strategi DRFI Kemenkeu
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Logika Penyerapan Dana Berlapis (Waterfall Strategy)
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Semakin tinggi tingkat lapisan: <strong>kapasitas dana semakin besar</strong> (dari Miliar ke Triliun Rupiah), namun <strong>kecepatan pencairan membutuhkan koordinasi lebih berjenjang</strong> (dari &lt;24 jam hingga klaim parametrik).
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono shrink-0 bg-slate-950/70 p-2.5 rounded-xl border border-slate-700">
            <div className="text-center px-2">
              <div className="text-[9px] uppercase tracking-wider text-blue-400 font-bold">Lini Pertama</div>
              <div className="font-bold text-white">Lapisan 1 (APBD)</div>
              <div className="text-[9px] text-slate-400">&lt; 24-48 Jam</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="text-center px-2">
              <div className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Lini Kedua</div>
              <div className="font-bold text-white">Lapisan 2 (APBN)</div>
              <div className="text-[9px] text-slate-400">3 - 7 Hari</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="text-center px-2">
              <div className="text-[9px] uppercase tracking-wider text-purple-400 font-bold">Lini Terakhir</div>
              <div className="font-bold text-white">Lapisan 3 (PFB)</div>
              <div className="text-[9px] text-slate-400">Klaim Parametrik</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3 TIERED WATERFALL CARDS (5 INFORMASI WAJIB PER LAPISAN) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ------------------------------------------------------------- */}
        {/* LAPISAN 1: APBD CONTINGENCY */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-5 border-b border-blue-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 border border-blue-200">
                <Wallet className="w-3 h-3 text-blue-600" />
                Tier 1 • Lini Pertama
              </span>

              {/* Dynamic Status Indicator linked to simulation */}
              {isLayer1Active ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  AKTIF: Rp {layer1_APBD.toFixed(1)} M
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
                  STANDBY
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    Lapisan 1: APBD Contingency
                  </h3>
                  <span className="text-[11px] text-blue-700 font-semibold block">
                    Retensi Fiskal Pemerintah Daerah
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body with 5 Specific Information Points */}
          <div className="p-5 space-y-4 text-xs flex-1">
            {/* 1. Kantong Dana */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-blue-600" />
                <span>Kantong Dana (Sumber Spesifik)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-900 font-bold text-xs">
                Belanja Tidak Terduga (BTT) APBD
              </div>
            </div>

            {/* 2. Regulasi / Payung Hukum */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Regulasi / Payung Hukum</span>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                Permendagri No. 77/2020 tentang Pedoman Teknis Pengelolaan Keuangan Daerah
              </p>
            </div>

            {/* 3. Lembaga Pengelola */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Lembaga Pengelola</span>
              </div>
              <p className="text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                Pemerintah Daerah — BPKAD Provinsi/Kabupaten/Kota, disetujui Kepala Daerah
              </p>
            </div>

            {/* 4. Karakteristik & Kapan Dipakai */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Karakteristik &amp; Kapan Dipakai</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-blue-50/30 p-2.5 rounded-xl border border-blue-100 text-[11px]">
                Pencairan tercepat (respons lini pertama), tetapi kapasitas terbatas sesuai besaran APBD masing-masing daerah. Digunakan untuk guncangan skala kecil-menengah.
              </p>
            </div>
          </div>

          {/* Card Footer Metric */}
          <div className="p-4 bg-blue-50/50 border-t border-blue-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Kapasitas Simulasi Daerah:</span>
            <span className="font-mono font-extrabold text-blue-700 text-xs">
              Rp {apbdReserveCapacity.toFixed(1)} Miliar
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LAPISAN 2: APBN TRANSFER/CONTINGENCY */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-5 border-b border-emerald-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Flag className="w-3 h-3 text-emerald-600" />
                Tier 2 • Eskalasi Nasional
              </span>

              {/* Dynamic Status Indicator */}
              {isLayer2Active ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  ESKALASI: Rp {layer2_APBN.toFixed(1)} M
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
                  STANDBY (Belum Perlu)
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    Lapisan 2: APBN Transfer/Contingency
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    Cadangan Kontinjensi Fiskal Pusat
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body with 5 Specific Information Points */}
          <div className="p-5 space-y-4 text-xs flex-1">
            {/* 1. Kantong Dana */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kantong Dana (Sumber Spesifik)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-slate-900 font-bold text-xs">
                Dana Cadangan Penanggulangan Bencana APBN (~Rp3-5 triliun/tahun)
              </div>
            </div>

            {/* 2. Regulasi / Payung Hukum */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Regulasi / Payung Hukum</span>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                Mekanisme dana cadangan bencana dalam APBN tahunan
              </p>
            </div>

            {/* 3. Lembaga Pengelola */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lembaga Pengelola</span>
              </div>
              <p className="text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                Kementerian Keuangan (Badan Kebijakan Fiskal/BKF — Pusat Kebijakan APBN), berkoordinasi dengan BNPB untuk penentuan skala/status bencana
              </p>
            </div>

            {/* 4. Karakteristik & Kapan Dipakai */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                <span>Karakteristik &amp; Kapan Dipakai</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-100 text-[11px]">
                Kapasitas lebih besar dari APBD, namun berdasarkan data BKF (2024) dana cadangan tahunan ini hanya menutup sekitar 50% dari kebutuhan riil penanggulangan bencana nasional. Pencairan membutuhkan koordinasi pusat-daerah. Digunakan untuk guncangan skala menengah-besar yang melampaui kapasitas APBD.
              </p>
            </div>
          </div>

          {/* Card Footer Metric */}
          <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Plafon Transfer per Kejadian:</span>
            <span className="font-mono font-extrabold text-emerald-700 text-xs">
              Rp {apbnTransferCeiling.toFixed(1)} Miliar
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LAPISAN 3: CONTINGENT FINANCING / ASURANSI (POOLING FUND BENCANA) */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-5 border-b border-purple-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-purple-100 text-purple-800 border border-purple-200">
                <ShieldCheck className="w-3 h-3 text-purple-600" />
                Tier 3 • Jaring Pengaman Terakhir
              </span>

              {/* Dynamic Status Indicator */}
              {isLayer3Active ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
                  TERPICU: Rp {layer3_Contingent.toFixed(1)} M
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  STANDBY (Cadangan Aman)
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-xs">
                  <Umbrella className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    Lapisan 3: Contingent Financing &amp; Asuransi
                  </h3>
                  <span className="text-[11px] text-purple-700 font-semibold block">
                    Pooling Fund Bencana (PFB) &amp; Transfer Risiko
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body with 5 Specific Information Points */}
          <div className="p-5 space-y-4 text-xs flex-1">
            {/* 1. Kantong Dana */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-purple-600" />
                <span>Kantong Dana (Sumber Spesifik)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 text-slate-900 font-bold text-xs leading-snug">
                Pooling Fund Bencana (PFB) — dana bersama dari APBN, APBD, hibah, swasta, dan mitra pembangunan internasional (dana awal Rp7,3 triliun per 2023)
              </div>
            </div>

            {/* 2. Regulasi / Payung Hukum DENGAN BADGE VERIFIKASI */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>Regulasi / Payung Hukum</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-xs">
                    Peraturan Presiden No. 75/2021
                  </span>
                  {/* TANDA VERIFIKASI SEBAGAIMANA DIMINTA PENGGUNA */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                    <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>(perlu verifikasi tanggal pengesahan)</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight italic">
                  *Catatan: Sumber Kemenkeu/BKF mencatat Perpres 75/2021 sebagai landasan pembentukan PFB, namun status pengesahan resmi dan peraturan pelaksanaan teknisnya masih memerlukan konfirmasi berkala.
                </p>
              </div>
            </div>

            {/* 3. Lembaga Pengelola */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Lembaga Pengelola</span>
              </div>
              <p className="text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                Badan Pengelola Dana Lingkungan Hidup (BPDLH) sebagai Badan Layanan Umum (BLU) di bawah Kementerian Keuangan, berkoordinasi dengan BNPB, Bappenas, dan Kemendagri
              </p>
            </div>

            {/* 4. Karakteristik & Kapan Dipakai */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Karakteristik &amp; Kapan Dipakai</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-purple-50/30 p-2.5 rounded-xl border border-purple-100 text-[11px]">
                Skema pembiayaan paling fleksibel — tidak terikat kekakuan siklus APBN, dapat mengakumulasi dana lintas tahun dan mentransfer risiko lewat asuransi/reasuransi. Menjadi jaring pengaman terakhir (<em>last-resort layer</em>) untuk guncangan skala katastropik yang jauh melampaui kapasitas APBD dan APBN reguler.
              </p>
            </div>
          </div>

          {/* Card Footer Metric */}
          <div className="p-4 bg-purple-50/50 border-t border-purple-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Status Kesiapan PFB:</span>
            <span className="font-mono font-bold text-purple-700 text-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Rp 7,3 Triliun (Dana Pokok)
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIMULASI INTERAKTIF KEBUTUHAN ANGGARAN & AKTIVASI LAPISAN (FITUR TAMBAHAN) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Simulasi Alokasi Bertingkat &amp; Penentuan Lapisan Aktif
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Uji penyerapan anggaran berdasarkan estimasi kebutuhan riil dari Modul 03 (Penilaian Risiko &amp; Aktivasi Cepat)
            </p>
          </div>

          <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-semibold border border-slate-200 self-start sm:self-auto">
            Input Dinamis Terkalibrasi
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Preset Scenario Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pilih Kasus Bencana (Koneksi Modul 03):
              </label>
              <select
                value={selectedDisasterScenario}
                onChange={(e) => handleScenarioChange(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              >
                <option value="gempa_cianjur">
                  Kab. Cianjur — Gempa Sesar Cugenang (Skor 88 • Kebutuhan Rp 18,5 Miliar)
                </option>
                <option value="banjir_demak">
                  Kab. Demak — Banjir Tanggul Jebol (Skor 58 • Kebutuhan Rp 2,8 Miliar)
                </option>
                <option value="kekeringan_sumba">
                  Kab. Sumba Timur — Kekeringan Ekstrem (Skor 72 • Kebutuhan Rp 6,8 Miliar)
                </option>
                <option value="erupsi_katastrofik">
                  Flores Timur &amp; Lembata — Erupsi Multi-Wilayah (Skor 112 • Kebutuhan Rp 32,0 Miliar)
                </option>
              </select>
            </div>

            {/* Slider 1: Total Funding Need */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Total Kebutuhan Anggaran:</span>
                <span className="font-mono font-extrabold text-rose-600 text-sm">
                  Rp {fundingNeedMiliar.toFixed(1)} Miliar
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="40.0"
                step="0.5"
                value={fundingNeedMiliar}
                onChange={(e) => setFundingNeedMiliar(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Skala Lokal (Rp 1.0 M)</span>
                <span>Skala Katastropik (Rp 40.0 M)</span>
              </div>
            </div>

            {/* Slider 2: Local APBD BTT */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Kapasitas BTT APBD Daerah:</span>
                <span className="font-mono font-extrabold text-blue-600 text-sm">
                  Rp {apbdReserveCapacity.toFixed(1)} Miliar
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={apbdReserveCapacity}
                onChange={(e) => setApbdReserveCapacity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Fiskal Rendah (Rp 0.5 M)</span>
                <span>Fiskal Mandiri (Rp 10.0 M)</span>
              </div>
            </div>

            {/* Toggle Pooling Fund Bencana */}
            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block">
                  Kesiapan Pooling Fund Bencana (PFB)
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Instrumen last-resort &amp; asuransi risiko Kemenkeu
                </span>
              </div>
              <button
                onClick={() => setPfbActive(!pfbActive)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  pfbActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {pfbActive ? 'SIAGA' : 'NON-AKTIF'}
              </button>
            </div>
          </div>

          {/* Visual Breakdown & Dynamic Result Card (Col 7) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            {/* Visual Waterfall Stack Progress */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-800">
                  Dekomposisi Penyerapan Dana per Lapisan:
                </span>
                <span className="font-mono text-slate-500 font-semibold">
                  Total: Rp {fundingNeedMiliar.toFixed(1)} Miliar
                </span>
              </div>

              {/* Progress Stack */}
              <div className="h-7 w-full rounded-xl overflow-hidden flex bg-slate-200 p-0.5 border border-slate-300">
                {layer1_APBD > 0 && (
                  <div
                    style={{ width: `${pctLayer1}%` }}
                    className="bg-blue-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all"
                    title={`Lapisan 1 (APBD): Rp ${layer1_APBD.toFixed(1)} M (${pctLayer1}%)`}
                  >
                    {pctLayer1 > 12 && `L1: ${pctLayer1}%`}
                  </div>
                )}
                {layer2_APBN > 0 && (
                  <div
                    style={{ width: `${pctLayer2}%` }}
                    className="bg-emerald-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all"
                    title={`Lapisan 2 (APBN): Rp ${layer2_APBN.toFixed(1)} M (${pctLayer2}%)`}
                  >
                    {pctLayer2 > 12 && `L2: ${pctLayer2}%`}
                  </div>
                )}
                {layer3_Contingent > 0 && (
                  <div
                    style={{ width: `${pctLayer3}%` }}
                    className="bg-purple-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all"
                    title={`Lapisan 3 (PFB): Rp ${layer3_Contingent.toFixed(1)} M (${pctLayer3}%)`}
                  >
                    {pctLayer3 > 12 && `L3: ${pctLayer3}%`}
                  </div>
                )}
                {pctDeficit > 0 && (
                  <div
                    style={{ width: `${pctDeficit}%` }}
                    className="bg-rose-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold animate-pulse transition-all"
                    title={`Defisit Tidak Tercover: Rp ${unfundedDeficit.toFixed(1)} M (${pctDeficit}%)`}
                  >
                    {pctDeficit > 12 && `Defisit: ${pctDeficit}%`}
                  </div>
                )}
              </div>

              {/* Legend & Amounts */}
              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-200">
                <div className="space-y-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    Lapisan 1 (APBD)
                  </span>
                  <div className="font-mono font-bold text-blue-700 text-xs pl-4">
                    Rp {layer1_APBD.toFixed(2)} M
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                    Lapisan 2 (APBN)
                  </span>
                  <div className="font-mono font-bold text-emerald-700 text-xs pl-4">
                    Rp {layer2_APBN.toFixed(2)} M
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0"></span>
                    Lapisan 3 (PFB)
                  </span>
                  <div className="font-mono font-bold text-purple-700 text-xs pl-4">
                    {isLayer3Active ? `Rp ${layer3_Contingent.toFixed(2)} M` : '0 (Standby)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Explicit Narrative Simulation Outcome Card */}
            <div className={`p-4.5 rounded-2xl border transition-all space-y-2.5 ${
              isLayer3Active
                ? 'bg-purple-50/70 border-purple-300'
                : isLayer2Active
                ? 'bg-blue-50/70 border-blue-300'
                : 'bg-emerald-50/70 border-emerald-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${
                    isLayer3Active ? 'text-purple-600' : isLayer2Active ? 'text-blue-600' : 'text-emerald-600'
                  }`} />
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-900">
                    Hasil Analisis Penyerapan Lapisan:
                  </h4>
                </div>

                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-700">
                  {isLayer3Active ? 'Katastropik (L1 + L2 + L3)' : isLayer2Active ? 'Eskalasi Pusat (L1 + L2)' : 'Mandiri Daerah (L1 Cukup)'}
                </span>
              </div>

              {/* Specific descriptive outcome matching user requirement */}
              <div className="text-xs text-slate-800 leading-relaxed space-y-2">
                {!isLayer2Active && !isLayer3Active ? (
                  <p>
                    Untuk kebutuhan <strong>Rp {fundingNeedMiliar.toFixed(1)} Miliar</strong>, seluruh anggaran <strong>masih tertutup penuh oleh Lapisan 1 (APBD BTT)</strong> yang memiliki kapasitas Rp {apbdReserveCapacity.toFixed(1)} Miliar. Tidak diperlukan eskalasi ke Lapisan 2 maupun Lapisan 3.
                  </p>
                ) : !isLayer3Active ? (
                  <p>
                    Untuk kebutuhan <strong>Rp {fundingNeedMiliar.toFixed(1)} Miliar</strong> (seperti pada skenario darurat gempa di satu kabupaten), dana diserap maksimal oleh <strong>Lapisan 1 (BTT APBD Rp {layer1_APBD.toFixed(1)} M)</strong> dan dieskalasikan ke <strong>Lapisan 2 (APBN Transfer/Contingency Rp {layer2_APBN.toFixed(1)} M)</strong>. Kebutuhan ini <strong>TIDAK sampai ke Lapisan 3 (Pooling Fund Bencana)</strong>, yang dicadangkan khusus untuk bencana berskala nasional atau bencana katastropik multi-provinsi.
                  </p>
                ) : (
                  <p>
                    Untuk kebutuhan <strong>Rp {fundingNeedMiliar.toFixed(1)} Miliar</strong> yang melampaui kapasitas gabungan APBD (Rp {layer1_APBD.toFixed(1)} M) dan pagu APBN transfer reguler (Rp {layer2_APBN.toFixed(1)} M), sistem <strong>mengaktifkan Lapisan 3 (Pooling Fund Bencana / PFB)</strong> untuk menyerap sisa kebutuhan sebesar <strong>Rp {layer3_Contingent.toFixed(1)} Miliar</strong> melalui instrumen pembiayaan kontinjensi dan asuransi katastropik.
                  </p>
                )}

                {/* MANDATORY DISCLAIMER AS REQUESTED */}
                <div className="pt-2 border-t border-slate-300/80 flex items-start gap-2 text-[11px] text-slate-600">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <p className="italic">
                    Estimasi ilustratif — ambang batas antar-lapisan memerlukan kalibrasi dengan data riil APBD per daerah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Coordination Matrix (Kemenkeu, BPDLH, BNPB, Kemendagri, Kemensos) */}
      <div className="p-4.5 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Matriks Kepatuhan Tata Kelola &amp; Koordinasi Lintas Kementerian/Lembaga
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            UU No. 1/2004 • UU No. 24/2007 • Perpres PFB
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase block">Lini Daerah</span>
            <div className="font-bold text-white text-xs">BPKAD &amp; BPBD Kabupaten/Kota</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Otorisasi SK Tanggap Darurat Kepala Daerah menerbitkan SP2D BTT untuk logistik harian dan dapur umum dalam waktu &lt; 24 jam.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Lini Pusat</span>
            <div className="font-bold text-white text-xs">Kemenkeu (BKF) &amp; BNPB / Kemensos</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Verifikasi usulan daerah untuk pencairan Dana Siap Pakai (DSP) dan penyesuaian penyaluran BLT Adaptif melalui DTSEN.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase block">Lini Khusus</span>
            <div className="font-bold text-white text-xs">BPDLH (BLU Kemenkeu) &amp; Asuransi</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pengelolaan dana abadi PFB, penyelesaian klaim parametrik instrumen asuransi kebencanaan, dan aktivasi pinjaman kontinjensi (*Cat DDO*).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
