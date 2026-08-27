import React, { useState } from 'react';
import {
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Zap,
  Sparkles,
  Award,
  FileCheck,
  Download,
  FileText,
  ShieldCheck,
  Info,
  Clock,
  Fingerprint,
  UserCheck,
} from 'lucide-react';

interface RiskAssessmentViewProps {
  onForwardToApproval: (proposalData: any) => void;
}

export const RiskAssessmentView: React.FC<RiskAssessmentViewProps> = ({
  onForwardToApproval,
}) => {
  // 7 Standardized Risk Parameters (1-15 each, Max 105)
  const [params, setParams] = useState({
    shockIntensity: 14, // 1. Intensitas Shock / Bencana Fisik
    infraDamage: 13, // 2. Kerusakan Infrastruktur & Akses Jalan
    vulnerableRatio: 14, // 3. Proporsi Rumah Tangga Rentan (Desil 1-2)
    dependencyRatio: 12, // 4. Rasio Beban Ketergantungan (Lansia, Balita, Disabilitas)
    fiscalDeficit: 11, // 5. Keterbatasan Kapasitas Fiskal & Logistik Daerah
    supplyChainDistruption: 13, // 6. Gangguan Rantai Pasok Pangan Pokok
    crisisDuration: 12, // 7. Proyeksi Durasi Krisis & Risiko Susulan
  });

  // Confidence Score & Data Quality (%)
  const [dataConfidence, setDataConfidence] = useState<number>(88);

  const [regionTarget, setRegionTarget] = useState('Kab. Cianjur, Jawa Barat');
  const [disasterType, setDisasterType] = useState('Gempa Bumi Tektonik Sesar Cugenang M 5.6');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExportNotification, setShowExportNotification] = useState<string | null>(null);

  // Compute total score
  const totalScore = (Object.values(params) as number[]).reduce((acc: number, val: number) => acc + val, 0);
  const maxScore = 105;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Standardized Risk Classification:
  // 0 - 35: Risiko Rendah / Normal (Protokol Level 1)
  // 36 - 70: Siaga Sedang (Protokol Level 2)
  // 71 - 105: Darurat Tinggi (Protokol Level 3)
  let riskLevel = 'Risiko Rendah (Normal)';
  let riskColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  let badgeColor = 'bg-emerald-500';
  let protocolAction = 'Protokol Level 1: Pemantauan Berkala Tingkat Kecamatan & Penyiapan Logistik Rutin';
  let budgetRecommendation = 'Rp 1.5 Miliar';
  let targetSLADays = 14;

  if (totalScore >= 71) {
    riskLevel = 'DARURAT TINGGI (PROTOKOL LEVEL 3)';
    riskColor = 'text-rose-700 bg-rose-50 border-rose-300';
    badgeColor = 'bg-rose-600';
    protocolAction = 'Protokol Level 3: Aktivasi Bantuan Adaptif Nasional Penuh (BLT Adaptif Kilat + Cadangan Beras Pemerintah)';
    budgetRecommendation = 'Rp 18.5 Miliar';
    targetSLADays = 3.5;
  } else if (totalScore >= 36) {
    riskLevel = 'SIAGA TINGKAT II (PROTOKOL LEVEL 2)';
    riskColor = 'text-amber-800 bg-amber-50 border-amber-300';
    badgeColor = 'bg-amber-500';
    protocolAction = 'Protokol Level 2: Aktivasi Siaga Darurat Daerah & Penebalan Cadangan Pangan Lokal';
    budgetRecommendation = 'Rp 6.8 Miliar';
    targetSLADays = 5.5;
  }

  // Human-in-the-loop condition: active when data confidence < 70%
  const isHumanInTheLoopRequired = dataConfidence < 70;

  const handleReset = () => {
    setParams({
      shockIntensity: 8,
      infraDamage: 7,
      vulnerableRatio: 8,
      dependencyRatio: 7,
      fiscalDeficit: 7,
      supplyChainDistruption: 7,
      crisisDuration: 8,
    });
    setDataConfidence(85);
  };

  const handleApplySimulation = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onForwardToApproval({
        id: `ACT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        submittedAt: 'Hari ini, Baru saja',
        region: regionTarget,
        disasterType: disasterType,
        riskScore: totalScore,
        proposer: isHumanInTheLoopRequired
          ? 'Verifikasi Lapangan Petugas Tagana (Human-in-the-loop)'
          : 'Sistem Otomatis SIGAP AI Engine v2.4',
        status: 'Menunggu',
      });
      setIsSubmitted(false);
      alert(
        isHumanInTheLoopRequired
          ? 'Berkas usulan darurat dikirimkan dengan catatan: WAJIB VERIFIKASI LAPANGAN (Data Confidence < 70%). Berkas telah masuk ke Modul 07 Antrean Persetujuan!'
          : 'Simulasi berhasil diotorisasi otomatis dan diteruskan ke Modul 07: Antrean Persetujuan!'
      );
    }, 800);
  };

  const handleExport = (format: 'pdf' | 'json') => {
    if (format === 'json') {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(
          JSON.stringify(
            {
              model: 'SIGAP Adaptive Risk Scoring Engine v2.4',
              timestamp: new Date().toISOString(),
              targetRegion: regionTarget,
              disasterType: disasterType,
              parameters: params,
              totalScore: totalScore,
              maxScore: maxScore,
              confidenceScore: `${dataConfidence}%`,
              humanInTheLoop: isHumanInTheLoopRequired,
              recommendedProtocol: protocolAction,
              estimatedBudget: budgetRecommendation,
              targetSLA: `${targetSLADays} Hari`,
              checksumSHA256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            },
            null,
            2
          )
        );
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `SIGAP_Simulasi_Risiko_${regionTarget.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      window.print();
    }

    setShowExportNotification(`Laporan Simulasi (${format.toUpperCase()}) berhasil dibuat!`);
    setTimeout(() => setShowExportNotification(null), 3000);
  };

  return (
    <div id="risk-assessment-module" className="p-6 space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Modul 03 • Aktivasi &amp; Penyaluran Kilat (Activation)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Penilaian Risiko &amp; Simulasi Aktivasi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kalkulasi dinamis indeks risiko standar 7 parameter (Skala 105 Poin) dengan safeguard Confidence Score &amp; Human-in-the-Loop
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('json')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all"
            title="Download file data simulasi JSON"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Ekspor JSON</span>
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all"
            title="Cetak atau simpan sebagai PDF"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Cetak PDF</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Export Notification Toast */}
      {showExportNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{showExportNotification}</span>
          </div>
          <button onClick={() => setShowExportNotification(null)} className="text-emerald-700 text-xs font-bold">✕</button>
        </div>
      )}

      {/* Academic Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-blue-900">Catatan Akademik Standar Skor: </span>
          Sistem penilaian risiko resmi menggunakan matriks <strong>7 indikator terstandardisasi × bobot 15 = 105 poin</strong> dengan ambang batas aktivasi: <em>Level 1 Normal (0-35)</em>, <em>Level 2 Siaga (36-70)</em>, dan <em>Level 3 Darurat (71-105)</em>. Seluruh simulasi merepresentasikan model proyeksi arsitektur perlindungan sosial adaptif SIGAP.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Sliders & Confidence Adjuster */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Konfigurasi 7 Parameter Risiko Utama
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-bold">Skala 1 - 15 per Indikator (Maks 105)</span>
          </div>

          {/* Region & Disaster target selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Wilayah Target Simulasi
              </label>
              <select
                value={regionTarget}
                onChange={(e) => setRegionTarget(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold"
              >
                <option value="Kab. Cianjur, Jawa Barat">Kab. Cianjur, Jawa Barat</option>
                <option value="Kab. Sumba Timur, NTT">Kab. Sumba Timur, NTT</option>
                <option value="Kab. Flores Timur, NTT">Kab. Flores Timur, NTT</option>
                <option value="Kab. Tanah Datar, Sumbar">Kab. Tanah Datar, Sumbar</option>
                <option value="Kab. Demak, Jawa Tengah">Kab. Demak, Jawa Tengah</option>
                <option value="Kota Semarang, Jawa Tengah">Kota Semarang, Jawa Tengah</option>
                <option value="Kab. Sintang, Kalbar">Kab. Sintang, Kalbar</option>
                <option value="Kab. Mahakam Ulu, Kaltim">Kab. Mahakam Ulu, Kaltim</option>
                <option value="Kab. Pangandaran, Jawa Barat">Kab. Pangandaran, Jawa Barat</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Kategori Bahaya / Krisis
              </label>
              <input
                type="text"
                value={disasterType}
                onChange={(e) => setDisasterType(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold"
              />
            </div>
          </div>

          {/* 7 Standardized Sliders List */}
          <div className="space-y-4">
            {/* 1 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">1. Intensitas Shock / Bencana Fisik (BMKG/PVMBG)</span>
                <span className="font-bold font-mono text-blue-600">{params.shockIntensity} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.shockIntensity}
                onChange={(e) => setParams({ ...params, shockIntensity: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 2 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">2. Kerusakan Infrastruktur &amp; Aksesibilitas Posko</span>
                <span className="font-bold font-mono text-blue-600">{params.infraDamage} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.infraDamage}
                onChange={(e) => setParams({ ...params, infraDamage: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 3 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">3. Proporsi Rumah Tangga Rentan (DTKS Desil 1-2 &amp; Regsosek)</span>
                <span className="font-bold font-mono text-blue-600">{params.vulnerableRatio} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.vulnerableRatio}
                onChange={(e) => setParams({ ...params, vulnerableRatio: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 4 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">4. Rasio Beban Ketergantungan (Lansia, Balita, Disabilitas)</span>
                <span className="font-bold font-mono text-blue-600">{params.dependencyRatio} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.dependencyRatio}
                onChange={(e) => setParams({ ...params, dependencyRatio: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 5 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">5. Keterbatasan Kapasitas Fiskal &amp; Logistik Daerah</span>
                <span className="font-bold font-mono text-blue-600">{params.fiscalDeficit} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.fiscalDeficit}
                onChange={(e) => setParams({ ...params, fiscalDeficit: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 6 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">6. Gangguan Rantai Pasok Pangan Pokok &amp; Pasar Lokal</span>
                <span className="font-bold font-mono text-blue-600">{params.supplyChainDistruption} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.supplyChainDistruption}
                onChange={(e) => setParams({ ...params, supplyChainDistruption: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 7 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">7. Proyeksi Durasi Krisis &amp; Risiko Bencana Susulan</span>
                <span className="font-bold font-mono text-blue-600">{params.crisisDuration} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.crisisDuration}
                onChange={(e) => setParams({ ...params, crisisDuration: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Confidence Score & Quality Slider */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Confidence Score &amp; Kelengkapan Data Sensor / Lapangan
                </span>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  dataConfidence >= 70
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {dataConfidence}% ({dataConfidence >= 70 ? 'Keyakinan Tinggi' : 'Keyakinan Rendah'})
              </span>
            </div>

            <input
              type="range"
              min="30"
              max="100"
              value={dataConfidence}
              onChange={(e) => setDataConfidence(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Tingkat keyakinan agregat dari data BMKG, BPS, dan kelengkapan sampling Tagana. Bila nilai Confidence di bawah <strong>70%</strong>, sistem mewajibkan verifikasi manual (Human-in-the-Loop Safeguard) sebelum eksekusi transfer dana.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Score & Recommendation */}
        <div className="lg:col-span-5 space-y-4">
          {/* Risk Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="text-center pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Skor Indeks Risiko Gabungan (7 Indikator)
              </span>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-5xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {totalScore}
                </span>
                <span className="text-slate-400 font-mono text-lg font-bold">/ {maxScore} Poin</span>
              </div>
              <div className="mt-2.5">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${riskColor}`}>
                  {riskLevel}
                </span>
              </div>
            </div>

            {/* Progress Gauge */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
                <span>Tingkat Keparahan Krisis:</span>
                <span className="font-mono font-bold text-slate-800">{percentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 transition-all duration-300 ${badgeColor}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Human In The Loop Warning Banner */}
            {isHumanInTheLoopRequired ? (
              <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Safeguard Human-in-the-Loop Diaktifkan!</span>
                </div>
                <p className="text-[11px] text-rose-700 leading-snug">
                  Confidence score di bawah 70% ({dataConfidence}%). Otorisasi otomatis dibatasi. Petugas verifikator lapangan wajib melakukan validasi faktual sebelum dana ditransfer.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confidence Score Tinggi ({dataConfidence}%). Valid untuk Otorisasi Cepat.</span>
              </div>
            )}

            {/* Automated Recommendation Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Rekomendasi Otomatis SIGAP AI</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Protokol Terpicu:</span>
                  <span className="font-bold text-slate-900 leading-snug block">
                    {protocolAction}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Kebutuhan Anggaran:</span>
                    <span className="font-bold font-mono text-slate-900 text-xs">
                      {budgetRecommendation}
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block font-medium">Target SLA Kasus Ini:</span>
                    <span className="font-bold font-mono text-blue-600 text-xs">
                      {targetSLADays} Hari
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">
                      (proyeksi spesifik wilayah simulasi)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit proposal button */}
            <button
              id="btn-ajukan-otorisasi-aktivasi"
              onClick={handleApplySimulation}
              disabled={isSubmitted}
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                isHumanInTheLoopRequired
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {isHumanInTheLoopRequired ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>{isSubmitted ? 'Mengirimkan Verifikasi...' : 'Ajukan Verifikasi Lapangan (Human-in-the-Loop)'}</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{isSubmitted ? 'Mengirimkan Otorisasi...' : 'Ajukan Otorisasi ke Menteri / Dirjen (Modul 07)'}</span>
                </>
              )}
            </button>
          </div>

          {/* Audit Panel & Parameter Validity */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wide text-[11px] pb-1 border-b border-slate-100">
              <Fingerprint className="w-4 h-4 text-indigo-600" />
              <span>Panel Jejak Audit &amp; Validitas Model</span>
            </div>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Model Engine:</span>
                <span className="text-slate-800 font-semibold">SIGAP-Parametric-v2.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Integrasi Data:</span>
                <span className="text-slate-800 font-semibold">DTKS, BMKG &amp; BPS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SHA-256 Checksum:</span>
                <span className="text-slate-800 font-semibold truncate max-w-[140px]">e3b0c44298fc1c...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-800 font-semibold">Real-time Telemetry Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
