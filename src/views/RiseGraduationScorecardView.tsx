import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  Coins,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Download,
  Printer,
  FileCheck,
  RotateCcw,
  Building,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

interface SampleKPM {
  name: string;
  nik: string;
  regency: string;
  village: string;
  monthlyIncome: number; // IDR
  povertyLineStandard: number; // IDR (e.g. Rp 580.000 / kapita x 4 org = Rp 2.320.000)
  hasSavings3Months: boolean;
  savingsAmount: number;
  hasProductiveAsset: boolean;
  productiveAssetDesc: string;
  childInSchool: boolean;
  healthRoutineComplete: boolean;
}

const SAMPLE_KPM_LIST: SampleKPM[] = [
  {
    name: 'Bambang Irawan',
    nik: '3321021406830004',
    regency: 'Kab. Demak',
    village: 'Desa Karanganyar',
    monthlyIncome: 5800000,
    povertyLineStandard: 2320000,
    hasSavings3Months: true,
    savingsAmount: 7500000,
    hasProductiveAsset: true,
    productiveAssetDesc: 'Mesin Las Inverter & Alat Konstruksi Baja',
    childInSchool: true,
    healthRoutineComplete: true,
  },
  {
    name: 'Siti Aminah',
    nik: '3203015409820001',
    regency: 'Kab. Cianjur',
    village: 'Desa Nagrak',
    monthlyIncome: 1900000,
    povertyLineStandard: 2320000,
    hasSavings3Months: false,
    savingsAmount: 450000,
    hasProductiveAsset: true,
    productiveAssetDesc: 'Wajan & Kompor Penggorengan Keripik',
    childInSchool: true,
    healthRoutineComplete: true,
  },
  {
    name: 'Umbu Maramba',
    nik: '5311021208790003',
    regency: 'Kab. Sumba Timur',
    village: 'Desa Palakahembi',
    monthlyIncome: 1400000,
    povertyLineStandard: 2100000,
    hasSavings3Months: false,
    savingsAmount: 200000,
    hasProductiveAsset: false,
    productiveAssetDesc: 'Belum memiliki alat kerja mandiri',
    childInSchool: false,
    healthRoutineComplete: true,
  },
];

interface RiseGraduationScorecardViewProps {
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const RiseGraduationScorecardView: React.FC<RiseGraduationScorecardViewProps> = ({
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  const [selectedKpmIndex, setSelectedKpmIndex] = useState<number>(0);
  const [income, setIncome] = useState<number>(SAMPLE_KPM_LIST[0].monthlyIncome);
  const [hasSavings, setHasSavings] = useState<boolean>(SAMPLE_KPM_LIST[0].hasSavings3Months);
  const [savingsValue, setSavingsValue] = useState<number>(SAMPLE_KPM_LIST[0].savingsAmount);
  const [hasAsset, setHasAsset] = useState<boolean>(SAMPLE_KPM_LIST[0].hasProductiveAsset);
  const [assetDetail, setAssetDetail] = useState<string>(SAMPLE_KPM_LIST[0].productiveAssetDesc);
  const [schoolDone, setSchoolDone] = useState<boolean>(SAMPLE_KPM_LIST[0].childInSchool);
  const [healthDone, setHealthDone] = useState<boolean>(SAMPLE_KPM_LIST[0].healthRoutineComplete);
  const [isCertificateGenerated, setIsCertificateGenerated] = useState<boolean>(false);

  const currentKpm = SAMPLE_KPM_LIST[selectedKpmIndex];

  const handleSelectSample = (idx: number) => {
    setSelectedKpmIndex(idx);
    const k = SAMPLE_KPM_LIST[idx];
    setIncome(k.monthlyIncome);
    setHasSavings(k.hasSavings3Months);
    setSavingsValue(k.savingsAmount);
    setHasAsset(k.hasProductiveAsset);
    setAssetDetail(k.productiveAssetDesc);
    setSchoolDone(k.childInSchool);
    setHealthDone(k.healthRoutineComplete);
    setIsCertificateGenerated(false);
  };

  // 4 Core Criteria Evaluation
  const crit1_IncomePassed = income >= currentKpm.povertyLineStandard;
  const crit2_SavingsPassed = hasSavings && savingsValue >= 4500000;
  const crit3_AssetPassed = hasAsset;
  const crit4_HumanCapitalPassed = schoolDone && healthDone;

  const passedCriteriaCount = [
    crit1_IncomePassed,
    crit2_SavingsPassed,
    crit3_AssetPassed,
    crit4_HumanCapitalPassed,
  ].filter(Boolean).length;

  const isGraduated = passedCriteriaCount === 4;
  const graduationScorePct = (passedCriteriaCount / 4) * 100;

  return (
    <div id="rise-graduation-scorecard-module" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
            <span>Tahap 3 • Graduate • Modul RS-2 • Graduation Scorecard &amp; Sertifikasi Mandiri</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Kalkulator Skor Kelulusan (Graduation Scorecard)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Validasi 4 pilar kemandirian: Pendapatan &gt; Garis Kemiskinan, Tabungan Darurat, Aset Produktif, dan Kepatuhan Modal Manusia
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold font-mono">
            Tahap 3: Graduate
          </div>
        </div>
      </div>

      {/* Conceptual Note */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-white to-emerald-50 border border-purple-200 text-xs text-slate-700 flex items-start gap-3 shadow-2xs">
        <Award className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed space-y-1">
          <span className="font-bold text-slate-900">
            Kriteria Kelulusan Mandiri (Graduation Protocol Kemensos - DTSEN):
          </span>
          <p className="text-slate-600">
            Graduasi KPM bukan sekadar penghentian bantuan tunai, melainkan pencapaian ketahanan multidimensi agar keluarga tidak rentan jatuh miskin kembali (*re-poverty*). Bila seluruh 4 kriteria terpenuhi (100%), KPM memperoleh status *Graduated* dan dialihkan ke program pendampingan wirausaha lanjutan.
          </p>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sample Selector & Sliders */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          {/* Sample Select */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Pilih Sampel KPM Simulasi:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_KPM_LIST.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedKpmIndex === idx
                      ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <span className="font-bold text-xs text-slate-900 block truncate">{sample.name}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{sample.regency}</span>
                </button>
              ))}
            </div>
          </div>

          {/* KPM Metadata Bar */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">NIK Terdaftar DTSEN:</span>
              <span className="font-bold text-slate-800">{currentKpm.nik}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Garis Kemiskinan Standar:</span>
              <span className="font-bold text-slate-800">Rp {currentKpm.povertyLineStandard.toLocaleString('id-ID')} / bln</span>
            </div>
          </div>

          {/* 4 Interactive Verification Controls */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* 1. Pendapatan */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  1. Pendapatan Rutin Bulanan
                </span>
                <span className={`font-mono font-extrabold ${crit1_IncomePassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                  Rp {income.toLocaleString('id-ID')} {crit1_IncomePassed ? '(Lolos > GK)' : '(Di Bawah GK)'}
                </span>
              </div>
              <input
                type="range"
                min="800000"
                max="8000000"
                step="100000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* 2. Tabungan Darurat */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  2. Tabungan Darurat Formal (Min. 3 Bln)
                </span>
                <span className={`font-mono font-extrabold ${crit2_SavingsPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                  Rp {savingsValue.toLocaleString('id-ID')} {crit2_SavingsPassed ? '(Memadai)' : '(Kurang)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-savings"
                  checked={hasSavings}
                  onChange={(e) => setHasSavings(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="chk-savings" className="text-xs text-slate-700">
                  Memiliki rekening tabungan aktif di Bank Himbara / Koperasi
                </label>
              </div>
            </div>

            {/* 3. Aset Produktif */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  3. Kepemilikan Aset Produktif Aktif
                </span>
                <span className={`font-mono font-extrabold ${crit3_AssetPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {crit3_AssetPassed ? 'Terverifikasi' : 'Belum Ada'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-asset"
                  checked={hasAsset}
                  onChange={(e) => setHasAsset(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <input
                  type="text"
                  value={assetDetail}
                  onChange={(e) => setAssetDetail(e.target.value)}
                  placeholder="Deskripsi aset produktif (alat kerja, ternak, dsb)..."
                  className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* 4. Kepatuhan Modal Manusia */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                4. Kepatuhan Pendidikan &amp; Kesehatan Keluarga
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    checked={schoolDone}
                    onChange={(e) => setSchoolDone(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Semua anak tuntas sekolah (APM 100%)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    checked={healthDone}
                    onChange={(e) => setHealthDone(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Rutin Posyandu / Faskes</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scorecard Result & Digital Certificate */}
        <div className="lg:col-span-6 space-y-5">
          {/* Main Verification Verdict Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Hasil Evaluasi Kelulusan KPM
                </h3>
                <p className="text-[11px] text-slate-500">
                  Keluarga: <strong>{currentKpm.name}</strong> • {currentKpm.village}, {currentKpm.regency}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-mono font-extrabold ${
                  isGraduated
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {isGraduated ? 'LULUS (GRADUATE)' : `${passedCriteriaCount}/4 KRITERIA`}
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${crit1_IncomePassed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  {crit1_IncomePassed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                  <span className="font-semibold">Pilar 1: Pendapatan di atas Garis Kemiskinan</span>
                </div>
                <span className="font-mono font-bold">{crit1_IncomePassed ? 'TERPENUHI' : 'BELUM'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${crit2_SavingsPassed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  {crit2_SavingsPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                  <span className="font-semibold">Pilar 2: Tabungan Darurat Min. 3 Bulan Biaya Hidup</span>
                </div>
                <span className="font-mono font-bold">{crit2_SavingsPassed ? 'TERPENUHI' : 'BELUM'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${crit3_AssetPassed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  {crit3_AssetPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                  <span className="font-semibold">Pilar 3: Kepemilikan Alat/Aset Produktif Aktif</span>
                </div>
                <span className="font-mono font-bold">{crit3_AssetPassed ? 'TERPENUHI' : 'BELUM'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${crit4_HumanCapitalPassed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  {crit4_HumanCapitalPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                  <span className="font-semibold">Pilar 4: Tuntas Wajib Belajar &amp; Sehat 100%</span>
                </div>
                <span className="font-mono font-bold">{crit4_HumanCapitalPassed ? 'TERPENUHI' : 'BELUM'}</span>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={() => setIsCertificateGenerated(true)}
                disabled={!isGraduated}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                  isGraduated
                    ? 'bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {isGraduated
                    ? 'Terbitkan Sertifikat Graduasi Mandiri DTSEN'
                    : 'Lengkapi 4 Kriteria untuk Menerbitkan Sertifikat'}
                </span>
              </button>
            </div>
          </div>

          {/* Certificate Modal / Card */}
          {isCertificateGenerated && isGraduated && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white border-2 border-amber-400 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-amber-400/40 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                    Kementerian Sosial Republik Indonesia
                  </span>
                </div>
                <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded font-mono">
                  DTSEN-GRAD-2026
                </span>
              </div>

              <div className="text-center space-y-1.5 py-2">
                <h4 className="text-base font-extrabold text-amber-300">
                  SERTIFIKAT KELULUSAN MANDIRI (GRADUASI)
                </h4>
                <p className="text-xs text-slate-300">Diberikan secara resmi kepada:</p>
                <div className="text-lg font-extrabold text-white font-mono">{currentKpm.name}</div>
                <div className="text-xs text-amber-200/90 font-mono">NIK: {currentKpm.nik} • {currentKpm.village}, {currentKpm.regency}</div>
                <p className="text-[11px] text-slate-300 max-w-md mx-auto pt-2 leading-relaxed">
                  Telah berhasil menyelesaikan rangkaian pembinaan Program SIGAP RISE dan secara mandiri memenuhi 4 pilar ketahanan ekonomi keluarga berkelanjutan.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-amber-400/30 text-[10px] font-mono text-slate-400">
                <span>Verifikator: Kemensos RI &amp; DTSEN</span>
                <button
                  onClick={() => alert(`Sertifikat Graduasi untuk ${currentKpm.name} berhasil diunduh!`)}
                  className="px-3 py-1 bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
