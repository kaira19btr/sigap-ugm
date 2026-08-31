import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { ModuleNarrativeBanner } from '../components/ModuleNarrativeBanner';
import {
  Coins,
  Shield,
  Layers,
  Building2,
  TrendingUp,
  Landmark,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  PieChart as PieIcon,
  CheckCircle2,
  Lock,
  Download,
} from 'lucide-react';

interface ContingencyFinancingViewProps {
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const ContingencyFinancingView: React.FC<ContingencyFinancingViewProps> = ({
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  // Scenario total required funding in Billions IDR (default 18.5 Miliar corresponding to Level 3 Darurat in Cianjur)
  const [fundingNeedMiliar, setFundingNeedMiliar] = useState<number>(18.5);
  const [selectedDisasterScenario, setSelectedDisasterScenario] = useState<string>('gempa_cianjur');
  const [apbdReserveCapacity, setApbdReserveCapacity] = useState<number>(3.5); // 3.5 Miliar BTT Kab. Cianjur
  const [pfbActive, setPfbActive] = useState<boolean>(true);

  // Pre-configured Scenarios
  const handleScenarioChange = (scenario: string) => {
    setSelectedDisasterScenario(scenario);
    if (scenario === 'gempa_cianjur') {
      setFundingNeedMiliar(18.5);
      setApbdReserveCapacity(3.5);
    } else if (scenario === 'kekeringan_sumba') {
      setFundingNeedMiliar(6.8);
      setApbdReserveCapacity(1.2);
    } else if (scenario === 'erupsi_flores') {
      setFundingNeedMiliar(24.0);
      setApbdReserveCapacity(2.0);
    } else if (scenario === 'banjir_demak') {
      setFundingNeedMiliar(12.5);
      setApbdReserveCapacity(4.0);
    }
  };

  // Risk-Layered Calculation (Akademik Disaster Risk Financing & Insurance / DRFI Strategy Kemkeu-Kemensos):
  // Layer 1 (APBD - Belanja Tidak Terduga): Absorbs up to apbdReserveCapacity
  const layer1_APBD = Math.min(fundingNeedMiliar, apbdReserveCapacity);
  const remainingAfterLayer1 = Math.max(0, fundingNeedMiliar - layer1_APBD);

  // Layer 2 (APBN - Dana Siap Pakai BNPB & Buffer Bansos Kemensos): Absorbs up to 10 Miliar
  const apbnMaxCapacity = 12.0;
  const layer2_APBN = Math.min(remainingAfterLayer1, apbnMaxCapacity);
  const remainingAfterLayer2 = Math.max(0, remainingAfterLayer1 - layer2_APBN);

  // Layer 3 (Contingent Financing / Pooling Fund Bencana / SEADRIF / Cat DDO): Absorbs remaining
  const layer3_Contingent = pfbActive ? remainingAfterLayer2 : 0;
  const unfundedDeficit = pfbActive ? 0 : remainingAfterLayer2;

  // Percentage shares
  const pctLayer1 = Math.round((layer1_APBD / fundingNeedMiliar) * 100) || 0;
  const pctLayer2 = Math.round((layer2_APBN / fundingNeedMiliar) * 100) || 0;
  const pctLayer3 = Math.round((layer3_Contingent / fundingNeedMiliar) * 100) || 0;
  const pctDeficit = Math.round((unfundedDeficit / fundingNeedMiliar) * 100) || 0;

  return (
    <div id="contingency-financing-module" className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span>SIGAP SHIELD • Modul 03b • Pembiayaan Kontinjensi (Tahap 4)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Simulasi Risk-Layered Financing &amp; Pagu Kontinjensi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mekanisme pendanaan berlapis adaptif: APBD BTT → APBN Transfer/DSP → Pooling Fund Bencana (PFB) &amp; Instrumen Kontinjensi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold font-mono">
            Tahap 1: Stabilize (DRFI)
          </div>
        </div>
      </div>

      {/* Flowing Narrative Connector */}
      <ModuleNarrativeBanner
        currentModule="contingency_financing"
        narrativeText="Setelah keputusan aktivasi ditetapkan, lapisan pembiayaan risiko (DRFI) mengunci ketersediaan likuiditas dari APBD BTT hingga Pooling Fund Bencana agar penyaluran bantuan adaptif tidak terhambat defisit kas."
        previousStepName="Modul 03: Penilaian Risiko"
        nextStepName="Modul CV-1: Human Capital Map (Protect)"
        shockBadge="kovariat"
        shockCustomNote="Prinsip Pembiayaan Berlapis: Melindungi fiskal daerah dari disrupsi kas mendadak melalui aktivasi otomatis bertingkat."
      />

      {/* Academic Conceptual Note */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 via-white to-blue-50 border border-rose-200 text-xs text-slate-700 flex items-start gap-3 shadow-2xs">
        <Layers className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed space-y-1">
          <span className="font-bold text-slate-900">
            Kerangka Strategi Pembiayaan Risiko Bencana (DRFI Indonesia - Kemkeu &amp; Kemensos):
          </span>
          <p className="text-slate-600">
            Pembiayaan respon perlindungan sosial tidak bergantung pada satu sumber tunggal. Guncangan berfrekuensi tinggi berdampak rendah ditanggung oleh <strong>Belanja Tidak Terduga (BTT) APBD</strong>, guncangan menengah diatasi via <strong>DSP APBN &amp; Horizontal Expansion DTSEN</strong>, sedangkan katastrofik besar mengaktifkan <strong>Pooling Fund Bencana (PFB)</strong> dan fasilitas pinjaman siaga (*Cat DDO*).
          </p>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter & Scenario Controls */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" />
              Parameter Kebutuhan Anggaran
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Input Dinamis</span>
          </div>

          {/* Scenario Quick Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
              Pilih Skenario Bencana Wilayah
            </label>
            <select
              value={selectedDisasterScenario}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:ring-2 focus:ring-rose-500"
            >
              <option value="gempa_cianjur">Gempa Sesar Cugenang Cianjur (Skala Darurat Level 3 • Kebutuhan Rp 18.5 M)</option>
              <option value="kekeringan_sumba">Kekeringan Sumba Timur (Skala Siaga Level 2 • Kebutuhan Rp 6.8 M)</option>
              <option value="erupsi_flores">Erupsi Lewotobi Flores Timur (Skala Darurat Katastrofik • Kebutuhan Rp 24.0 M)</option>
              <option value="banjir_demak">Banjir Tanggul Demak (Skala Darurat Level 3 • Kebutuhan Rp 12.5 M)</option>
            </select>
          </div>

          {/* Slider 1: Total Funding Need */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Total Kebutuhan DSP / BLT-A:</span>
              <span className="font-mono font-extrabold text-rose-600 text-sm">
                Rp {fundingNeedMiliar.toFixed(1)} Miliar
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="0.5"
              value={fundingNeedMiliar}
              onChange={(e) => setFundingNeedMiliar(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Min: Rp 2.0 M</span>
              <span>Rekomendasi Modul 03</span>
              <span>Maks: Rp 40.0 M</span>
            </div>
          </div>

          {/* Slider 2: Local Fiscal Capacity (APBD BTT) */}
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
              max="10"
              step="0.5"
              value={apbdReserveCapacity}
              onChange={(e) => setApbdReserveCapacity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Fiskal Terbatas (Rp 0.5 M)</span>
              <span>Fiskal Mandiri (Rp 10.0 M)</span>
            </div>
          </div>

          {/* Toggle Pooling Fund Bencana */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900 block">
                Aktivasi Pooling Fund Bencana (PFB / SEADRIF)
              </span>
              <span className="text-[10px] text-slate-500 block">
                Instrumen transfer risiko katastrofik Kemkeu
              </span>
            </div>
            <button
              onClick={() => setPfbActive(!pfbActive)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                pfbActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {pfbActive ? 'AKTIF' : 'NON-AKTIF'}
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Status Likuiditas Penyaluran</span>
            <div className="flex justify-between items-center">
              <span>Kesiapan Dana Total:</span>
              <span className="font-mono font-bold text-emerald-400">
                Rp {(layer1_APBD + layer2_APBN + layer3_Contingent).toFixed(1)} Miliar (100% Tercover)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Target Waktu Pencairan SP2D:</span>
              <span className="font-mono font-bold text-amber-300">&lt; 48 Jam (Fast-Track)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layer Visualizer & Distribution Stack */}
        <div className="lg:col-span-7 space-y-5">
          {/* Stacked Risk Layers Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Dekomposisi Penyerapan Dana Berlapis (Risk Layers)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Proporsi beban pembiayaan yang diserap oleh masing-masing layer fiskal
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200">
                Sesuai Kerangka DRFI
              </span>
            </div>

            {/* Visual Stack Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
                <div
                  style={{ width: `${pctLayer1}%` }}
                  className="bg-blue-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all"
                  title={`Layer 1 APBD: Rp ${layer1_APBD.toFixed(1)} M (${pctLayer1}%)`}
                >
                  {pctLayer1 > 10 && `${pctLayer1}%`}
                </div>
                <div
                  style={{ width: `${pctLayer2}%` }}
                  className="bg-emerald-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all"
                  title={`Layer 2 APBN: Rp ${layer2_APBN.toFixed(1)} M (${pctLayer2}%)`}
                >
                  {pctLayer2 > 10 && `${pctLayer2}%`}
                </div>
                <div
                  style={{ width: `${pctLayer3}%` }}
                  className="bg-purple-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold transition-all"
                  title={`Layer 3 PFB/Kontinjensi: Rp ${layer3_Contingent.toFixed(1)} M (${pctLayer3}%)`}
                >
                  {pctLayer3 > 10 && `${pctLayer3}%`}
                </div>
                {pctDeficit > 0 && (
                  <div
                    style={{ width: `${pctDeficit}%` }}
                    className="bg-rose-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold animate-pulse transition-all"
                    title={`Defisit: Rp ${unfundedDeficit.toFixed(1)} M (${pctDeficit}%)`}
                  >
                    {pctDeficit > 10 && `Defisit ${pctDeficit}%`}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  Layer 1: APBD ({pctLayer1}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Layer 2: APBN ({pctLayer2}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  Layer 3: PFB / Asuransi ({pctLayer3}%)
                </span>
              </div>
            </div>

            {/* 3 Detail Cards per Layer */}
            <div className="space-y-3 pt-2">
              {/* Layer 1 */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    L1
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Layer 1: Retensi Risiko Daerah (BTT APBD Kab/Kota)
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Menanggung respon awal tanggap darurat (Dapur umum, tenda, buffer stock Dinsos)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-blue-700 block">
                    Rp {layer1_APBD.toFixed(2)} M
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Porsi {pctLayer1}%</span>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    L2
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Layer 2: Dana Siap Pakai (DSP) APBN &amp; Cadangan Kemensos
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Pembiayaan transfer BLT Adaptif kilat (Desil 1–4) &amp; Horizontal Expansion DTSEN
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-emerald-700 block">
                    Rp {layer2_APBN.toFixed(2)} M
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Porsi {pctLayer2}%</span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    L3
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Layer 3: Pooling Fund Bencana (PFB) &amp; Catastrophe Contingent
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Klaim parametrik instrumen asuransi &amp; fasilitas pinjaman kontinjensi saat guncangan melampaui fiskal
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-purple-700 block">
                    Rp {layer3_Contingent.toFixed(2)} M
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Porsi {pctLayer3}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Trail & Protocol Integration */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2 border border-slate-800 text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-rose-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Kepatuhan Tata Kelola Keuangan Negara (UU No. 1/2004 &amp; PMK DRFI)
              </span>
              <span className="font-mono text-slate-500">KEMENKEU-KEMENSOS-BNPB</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Otorisasi di Modul 03 secara otomatis memetakan kebutuhan dana ke layer yang sesuai. Jika BTT daerah tidak mencukupi, sistem secara otomatis menerbitkan usulan klaim DSP Nasional dan notifikasi kesiapan PFB tanpa penundaan birokrasi berbelit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
