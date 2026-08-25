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
} from 'lucide-react';

interface RiskAssessmentViewProps {
  onForwardToApproval: (proposalData: any) => void;
}

export const RiskAssessmentView: React.FC<RiskAssessmentViewProps> = ({
  onForwardToApproval,
}) => {
  // 7 Risk parameters (1-15 each, max 105)
  const [params, setParams] = useState({
    shockIntensity: 12,
    vulnerableRatio: 14,
    fiscalDeficit: 11,
    infraDamage: 13,
    supplyChainDistruption: 12,
    staffDeficit: 10,
    crisisDuration: 13,
  });

  const [regionTarget, setRegionTarget] = useState('Kab. Cianjur, Jawa Barat');
  const [disasterType, setDisasterType] = useState('Gempa Bumi M 5.6 & Longsor');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute total score
  const totalScore = (Object.values(params) as number[]).reduce((acc: number, val: number) => acc + val, 0);
  const maxScore = 105;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Risk Classification
  let riskLevel = 'Risiko Rendah';
  let riskColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  let badgeColor = 'bg-emerald-500';
  let protocolAction = 'Pemantauan Berkala Tingkat Kecamatan';
  let budgetRecommendation = 'Rp 1.2 Miliar';

  if (totalScore >= 75) {
    riskLevel = 'DARURAT TINGGI (PROTOKOL LEVEL 3)';
    riskColor = 'text-rose-700 bg-rose-50 border-rose-200';
    badgeColor = 'bg-rose-600';
    protocolAction = 'Aktivasi Protokol Darurat Nasional Penuh (BLT Adaptif + Logistik Tanggap Darurat)';
    budgetRecommendation = 'Rp 18.5 Miliar';
  } else if (totalScore >= 50) {
    riskLevel = 'SIAGA TINGKAT II (PROTOKOL LEVEL 2)';
    riskColor = 'text-amber-800 bg-amber-50 border-amber-200';
    badgeColor = 'bg-amber-500';
    protocolAction = 'Aktivasi Siaga Wilayah & Cadangan Pangan Pemerintah Daerah';
    budgetRecommendation = 'Rp 6.8 Miliar';
  }

  const handleReset = () => {
    setParams({
      shockIntensity: 8,
      vulnerableRatio: 8,
      fiscalDeficit: 7,
      infraDamage: 6,
      supplyChainDistruption: 7,
      staffDeficit: 6,
      crisisDuration: 8,
    });
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
        proposer: 'Sistem Otomatis SIGAP AI Engine',
        status: 'Menunggu',
      });
      setIsSubmitted(false);
      alert('Simulasi berhasil diotorisasi dan diteruskan ke Modul 07: Antrean Persetujuan!');
    }, 900);
  };

  return (
    <div id="risk-assessment-module" className="p-6 space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Modul 03 • Algoritma Penilaian Multi-Parameter</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Penilaian Risiko & Simulasi Aktivasi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kalkulasi dinamis indeks risiko berdasarkan 7 parameter analitis untuk memicu protokol tanggap darurat otomatis
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Sliders */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Konfigurasi Parameter Lapangan
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Rentang Skala 1 - 15</span>
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
                <option value="Kota Semarang, Jawa Tengah">Kota Semarang, Jawa Tengah</option>
                <option value="Kab. Sintang, Kalbar">Kab. Sintang, Kalbar</option>
                <option value="Kab. Garut, Jawa Barat">Kab. Garut, Jawa Barat</option>
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

          {/* 7 Sliders List */}
          <div className="space-y-4">
            {/* 1 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">1. Intensitas Shock / Bencana Fisik</span>
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
                <span className="font-semibold text-slate-700">2. Proporsi Rumah Tangga Rentan (Desil 1-2)</span>
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

            {/* 3 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">3. Keterbatasan Fiskal & Logistik Pemda</span>
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

            {/* 4 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">4. Kerusakan Infrastruktur & Akses Jalan</span>
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

            {/* 5 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">5. Gangguan Rantai Pasok Pangan & Pasar</span>
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

            {/* 6 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">6. Defisit Tenaga Kesehatan & Posko</span>
                <span className="font-bold font-mono text-blue-600">{params.staffDeficit} / 15</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={params.staffDeficit}
                onChange={(e) => setParams({ ...params, staffDeficit: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 7 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">7. Proyeksi Durasi Krisis Lanjutan</span>
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
        </div>

        {/* Right Column: Dynamic Score & Recommendation */}
        <div className="lg:col-span-5 space-y-4">
          {/* Risk Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="text-center pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Skor Indeks Risiko Gabungan
              </span>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-5xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {totalScore}
                </span>
                <span className="text-slate-400 font-mono text-lg font-bold">/ {maxScore}</span>
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
                <span>Tingkat Keparahan Bencana</span>
                <span className="font-mono font-bold text-slate-800">{percentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 transition-all duration-300 ${badgeColor}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Automated Recommendation Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Rekomendasi Otomatis SIGAP</span>
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
                    <span className="text-[10px] text-slate-500 block">Skema Distribusi:</span>
                    <span className="font-bold text-slate-900 text-xs">
                      Himbara / PT Pos Kilat
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
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isSubmitted ? 'Mengirimkan Otorisasi...' : 'Ajukan Otorisasi ke Menteri / Dirjen'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
