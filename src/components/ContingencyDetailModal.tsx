import React, { useState } from 'react';
import {
  X,
  Landmark,
  Building2,
  Umbrella,
  ShieldCheck,
  Coins,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Download,
  Scale,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export type ContingencyLayerId = 'layer1' | 'layer2' | 'layer3';

interface SimulationContextData {
  fundingNeedMiliar: number;
  apbdReserveCapacity: number;
  apbnTransferCeiling: number;
  layer1_APBD: number;
  layer2_APBN: number;
  layer3_Contingent: number;
  scenarioName: string;
}

interface ContingencyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLayerId: ContingencyLayerId | null;
  simulationData: SimulationContextData;
}

export const ContingencyDetailModal: React.FC<ContingencyDetailModalProps> = ({
  isOpen,
  onClose,
  initialLayerId,
  simulationData,
}) => {
  const [selectedLayer, setSelectedLayer] = useState<ContingencyLayerId>(initialLayerId || 'layer1');
  const [activeTab, setActiveTab] = useState<'sop' | 'belanja' | 'eskalasi' | 'fiskal'>('sop');

  // Sync state if initialLayerId changes
  React.useEffect(() => {
    if (initialLayerId) {
      setSelectedLayer(initialLayerId);
    }
  }, [initialLayerId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh] text-slate-800">
        {/* Modal Top Header with Layer Switcher */}
        <div className="bg-slate-950 text-white p-5 sm:p-6 border-b border-slate-800 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl shrink-0 ${
                selectedLayer === 'layer1'
                  ? 'bg-blue-600 text-white'
                  : selectedLayer === 'layer2'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}>
                {selectedLayer === 'layer1' ? (
                  <Landmark className="w-6 h-6" />
                ) : selectedLayer === 'layer2' ? (
                  <Building2 className="w-6 h-6" />
                ) : (
                  <Umbrella className="w-6 h-6" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                    selectedLayer === 'layer1'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : selectedLayer === 'layer2'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }`}>
                    {selectedLayer === 'layer1' ? 'Tier 1 • Retensi Daerah' : selectedLayer === 'layer2' ? 'Tier 2 • Cadangan Nasional' : 'Tier 3 • Jaring Pengaman Terakhir'}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400">
                    SOP &amp; Tata Kelola Pembiayaan Kontinjensi
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-white">
                  {selectedLayer === 'layer1' && 'Lapisan 1: APBD Contingency (Belanja Tidak Terduga / BTT)'}
                  {selectedLayer === 'layer2' && 'Lapisan 2: APBN Transfer/Contingency (Dana Cadangan Bencana)'}
                  {selectedLayer === 'layer3' && 'Lapisan 3: Contingent Financing & Asuransi (Pooling Fund Bencana)'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Layer Selector Pills */}
          <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setSelectedLayer('layer1')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedLayer === 'layer1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lapisan 1:</span> APBD BTT
            </button>

            <button
              onClick={() => setSelectedLayer('layer2')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedLayer === 'layer2'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lapisan 2:</span> APBN Cadangan
            </button>

            <button
              onClick={() => setSelectedLayer('layer3')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedLayer === 'layer3'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Umbrella className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lapisan 3:</span> PFB &amp; Asuransi
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('sop')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'sop'
                  ? 'border-rose-600 text-rose-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>SOP Pencairan &amp; Regulasi</span>
            </button>

            <button
              onClick={() => setActiveTab('belanja')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'belanja'
                  ? 'border-rose-600 text-rose-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Pos Belanja Sah vs Dilarang</span>
            </button>

            <button
              onClick={() => setActiveTab('eskalasi')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'eskalasi'
                  ? 'border-rose-600 text-rose-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Ambang Batas &amp; Protokol Eskalasi</span>
            </button>

            <button
              onClick={() => setActiveTab('fiskal')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'fiskal'
                  ? 'border-rose-600 text-rose-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Simulasi Anggaran Terkini</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 hidden md:block">
            DRFI Framework v2.4
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* ============================================================== */}
          {/* TAB 1: SOP PENCAIRAN & REGULASI */}
          {/* ============================================================== */}
          {activeTab === 'sop' && (
            <div className="space-y-5">
              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-extrabold text-slate-900 block">
                    {selectedLayer === 'layer1' && 'Mekanisme Operasional Retensi Risiko Daerah (BTT APBD)'}
                    {selectedLayer === 'layer2' && 'Mekanisme Operasional Cadangan Kontinjensi Nasional (APBN)'}
                    {selectedLayer === 'layer3' && 'Mekanisme Pembiayaan Berkelanjutan & Jaring Pengaman Terakhir (PFB)'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedLayer === 'layer1' && 'Pencairan BTT tidak memerlukan persetujuan DPRD di awal, melainkan dieksekusi langsung melalui Keputusan Kepala Daerah dan dilaporkan kemudian dalam Laporan Realisasi Anggaran (LRA) APBD.'}
                    {selectedLayer === 'layer2' && 'Mekanisme transfer darurat APBN melalui Dana Siap Pakai (DSP) BNPB dan pagu cadangan Kemensos berkoordinasi dengan Kementerian Keuangan (BKF & DJA) untuk menutup defisit belanja daerah.'}
                    {selectedLayer === 'layer3' && 'Dikelola oleh Badan Layanan Umum (BLU) BPDLH Kementerian Keuangan, memungkinkan akumulasi dana lintas tahun anggaran tanpa hangus pada akhir tahun, serta mengikat fasilitas asuransi parametrik.'}
                  </p>
                </div>
              </div>

              {/* 5 Information Snapshot Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Kantong Dana Spesifik
                  </span>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {selectedLayer === 'layer1' && 'Belanja Tidak Terduga (BTT) APBD Provinsi/Kabupaten/Kota'}
                    {selectedLayer === 'layer2' && 'Dana Cadangan Penanggulangan Bencana APBN (~Rp3-5 triliun/tahun)'}
                    {selectedLayer === 'layer3' && 'Pooling Fund Bencana (PFB) — Dana Abadi & Asuransi (Rp7,3 T modal awal)'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Payung Hukum &amp; Regulasi
                  </span>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {selectedLayer === 'layer1' && 'Permendagri No. 77/2020 tentang Pedoman Teknis Pengelolaan Keuangan Daerah'}
                    {selectedLayer === 'layer2' && 'Mekanisme dana cadangan bencana dalam UU APBN tahunan & PMK terkait'}
                    {selectedLayer === 'layer3' && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span>Peraturan Presiden No. 75/2021</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          (perlu verifikasi tanggal pengesahan)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Lembaga Pengelola
                  </span>
                  <div className="text-slate-800 text-xs leading-relaxed">
                    {selectedLayer === 'layer1' && 'Pemerintah Daerah — BPKAD Provinsi/Kabupaten/Kota, disetujui Kepala Daerah.'}
                    {selectedLayer === 'layer2' && 'Kementerian Keuangan (Badan Kebijakan Fiskal/BKF — Pusat Kebijakan APBN), berkoordinasi dengan BNPB dan Kemensos.'}
                    {selectedLayer === 'layer3' && 'Badan Pengelola Dana Lingkungan Hidup (BPDLH) sebagai BLU di bawah Kemenkeu, berkoordinasi dengan BNPB, Bappenas, dan Kemendagri.'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    SLA Kecepatan Pencairan
                  </span>
                  <div className="text-xs leading-relaxed font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-600" />
                    <span>
                      {selectedLayer === 'layer1' && '< 24 - 48 Jam (Respons Tanggap Darurat Kilat)'}
                      {selectedLayer === 'layer2' && '3 - 7 Hari Kerja (Fast-Track Penetapan Bersama Pusat)'}
                      {selectedLayer === 'layer3' && 'Klaim Parametrik Otomatis / Penarikan Standby Cat-DDO'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Flow */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Alur Prosedur Tetap (Protap) Pencairan Dana Kontinjensi:
                </h3>

                <div className="space-y-3">
                  {selectedLayer === 'layer1' && (
                    <>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Penetapan Status Darurat oleh Kepala Daerah</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Bupati/Walikota menandatangani SK Penetapan Status Keadaan Darurat Bencana berdasarkan kaji cepat BPBD.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Pengajuan Rencana Kebutuhan Belanja (RKB)</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Dinsos / BPBD menyusun rincian kebutuhan beras, logistik pengungsian, dan tenda darurat diajukan ke BPKAD.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Verifikasi PPKD &amp; Penerbitan SP2D BTT (&lt; 24 Jam)</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">PPKD menerbitkan SPD dan SP2D Langsung (LS) ke rekening penampungan darurat atau penyedia bahan pokok.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Penyampaian Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Pengguna anggaran menerbitkan SPTJM guna menjamin kepatuhan audit BPK/Inspektorat Daerah.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedLayer === 'layer2' && (
                    <>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Surat Pernyataan Keterbatasan Fiskal Daerah</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Kepala Daerah melayangkan surat resmi kepada Kepala BNPB dan Menteri Sosial bahwa sisa BTT APBD tidak mencukupi.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Verifikasi Tim Gabungan TRC BNPB &amp; Kemensos</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Validasi daftar calon penerima bansos adaptif berdasarkan data DTSEN Regsosek terpadu.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Otorisasi Dana Siap Pakai (DSP) &amp; Pagu Cadangan Bencana</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">BNPB menerbitkan persetujuan DSP dan Kemensos menerbitkan SK Menteri Sosial untuk top-up bansos darurat.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Penyaluran Kilat via Bank Himbara / PT Pos (SLA 3-7 Hari)</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Transfer langsung ke rekening KPM di kantong bencana guna memulihkan daya beli keluarga.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedLayer === 'layer3' && (
                    <>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Pemicu Parametrik Otomatis (BMKG / PVMBG)</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Sensor mendeteksi guncangan gempa Mw &gt; 6.5 atau erupsi VEI 4 yang melampaui indeks ambang asuransi bencana.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Pencairan Klaim Konsorsium Asuransi &amp; Reasuransi</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Dana klaim asuransi cair ke rekening BLU BPDLH tanpa memerlukan audit kerugian fisik berlarut-larut.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Aktivasi Pinjaman Siaga Kontinjensi (Cat DDO)</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Penarikan fasilitas pinjaman siaga Bank Dunia / ADB yang telah disiapkan sebelumnya untuk perlindungan likuiditas fiskal nasional.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">Rekonstruksi Fasilitas Publik &amp; Dana Abadi Bencana</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Pemulihan rumah sakit darurat, faskes, sekolah, dan dukungan pemulihan jangka panjang masyarakat miskin.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: POS BELANJA SAH VS DILARANG */}
          {/* ============================================================== */}
          {activeTab === 'belanja' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Kepatuhan Audit BPK &amp; BPKP:</strong> Penggunaan dana kontinjensi wajib memperhatikan rambu-rambu akuntabilitas keuangan negara agar tidak menimbulkan temuan penyalahgunaan anggaran bencana.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pos Sah */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pos Belanja yang Diperbolehkan (Eligible)</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedLayer === 'layer1' && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Bahan makanan pokok dapur umum Tagana dan ransum pengungsi.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Pengadaan terpal, matras, tenda darurat, selimut, dan pakaian layak.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Obat-obatan darurat, masker, dan mobilisasi ambulans/tim medis.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Santunan duka cita awal bagi keluarga korban meninggal dunia.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>BBM operasional alat berat evakuasi dan pembersihan material reruntuhan.</span>
                        </li>
                      </>
                    )}

                    {selectedLayer === 'layer2' && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Bantuan Langsung Tunai Adaptif (BLT-A) bagi KPM Desil 1–4 terdampak bencana.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Bantuan Stimulan Rumah Rusak Ringan/Sedang/Berat BNPB.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Logistik berskala besar (jembatan bailey darurat, helikopter water bombing).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Operasional posko komando gabungan BNPB-TNI-Polri-Kemensos.</span>
                        </li>
                      </>
                    )}

                    {selectedLayer === 'layer3' && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Pembayaran premi asuransi barang milik negara (ABMN) dan aset infrastruktur publik.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Penyaluran klaim asuransi bencana parametrik bagi pemulihan daerah katastropik.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Penarikan darurat fasilitas standby loan (Cat DDO) untuk menutupi defisit APBN.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <span>Rekonstruksi terpadu fasilitas kesehatan dan pendidikan lintas tahun.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Pos Dilarang */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Pos Belanja yang Dilarang (Ineligible)</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                      <span>Honorarium rutin ASN atau belanja perjalanan dinas di luar kedaruratan bencana.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                      <span>Pembangunan gedung kantor permanen yang tidak terdampak bencana langsung.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                      <span>Pengadaan barang inventaris kantor non-esensial (laptop dinas rutin, furniture).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                      <span>Penggantian kerugian bisnis komersial swasta tanpa dasar regulasi mandat sosial.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: AMBANG BATAS & PROTOKOL ESKALASI */}
          {/* ============================================================== */}
          {activeTab === 'eskalasi' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>Ambang Batas Pemicu Eskalasi Antar-Lapisan</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prinsip utama DRFI: Dana kontinjensi tidak boleh langsung melompat ke lapisan yang lebih tinggi kecuali lapisan di bawahnya telah menyerap secara maksimal atau secara obyektif tidak mampu menanggung beban bencana.
                </p>
              </div>

              <div className="space-y-3">
                {/* Step 1 to 2 */}
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                      Ambang Eskalasi L1 ➔ L2
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Kebutuhan Riil &gt; Kapasitas BTT APBD Daerah
                    </h4>
                    <p className="text-xs text-slate-600">
                      Terjadi ketika taksiran kebutuhan respon (misal Rp 18,5 Miliar) melebihi pagu BTT kas daerah (misal Rp 3,5 Miliar).
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-blue-700 block">Surat Keterangan Defisit BTT</span>
                    <span className="text-[10px] text-slate-500 font-mono">Lampiran SK Darurat</span>
                  </div>
                </div>

                {/* Step 2 to 3 */}
                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-purple-200 text-purple-900">
                      Ambang Eskalasi L2 ➔ L3
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Kebutuhan Katastropik &gt; Plafon Transfer APBN Tahunan
                    </h4>
                    <p className="text-xs text-slate-600">
                      Terjadi pada gempa megathrust, tsunami, atau erupsi multi-provinsi yang menguras cadangan APBN tahunan.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-purple-700 block">Aktivasi PFB &amp; Cat DDO</span>
                    <span className="text-[10px] text-slate-500 font-mono">Otorisasi Menkeu RI</span>
                  </div>
                </div>
              </div>

              {/* Data BKF Insight */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Fakta Fiskal Badan Kebijakan Fiskal (BKF 2024):
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Berdasarkan publikasi resmi Kemenkeu, dana cadangan bencana tahunan APBN sekitar Rp 3–5 triliun hanya mampu menutup sekitar <strong>50% dari kebutuhan riil</strong> penanggulangan bencana nasional. Karena itu, PFB dan instrumen transfer risiko asuransi dirancang khusus agar pemerintah tidak perlu memangkas alokasi bansos reguler saat terjadi krisis besar.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: SIMULASI ANGGARAN TERKINI */}
          {/* ============================================================== */}
          {activeTab === 'fiskal' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                    Koneksi Parameter Simulasi Aktif
                  </span>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">
                    Total Kebutuhan Anggaran: Rp {simulationData.fundingNeedMiliar.toFixed(1)} Miliar
                  </div>
                  <span className="text-xs text-slate-600">
                    Skenario Wilayah: {simulationData.scenarioName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center font-mono">
                    <span className="text-[9px] uppercase text-slate-400 block font-sans">BTT APBD</span>
                    <span className="text-xs font-bold text-blue-700">Rp {simulationData.apbdReserveCapacity.toFixed(1)} M</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center font-mono">
                    <span className="text-[9px] uppercase text-slate-400 block font-sans">Plafon APBN</span>
                    <span className="text-xs font-bold text-emerald-700">Rp {simulationData.apbnTransferCeiling.toFixed(1)} M</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Lapisan Pembiayaan</th>
                      <th className="p-3">Kantong Dana</th>
                      <th className="p-3">Kapasitas Maks</th>
                      <th className="p-3 text-right">Serapan Simulasi</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className={selectedLayer === 'layer1' ? 'bg-blue-50/40 font-semibold' : ''}>
                      <td className="p-3 font-bold text-blue-700">Lapisan 1 (APBD)</td>
                      <td className="p-3 text-slate-600">Belanja Tidak Terduga (BTT)</td>
                      <td className="p-3 font-mono">Rp {simulationData.apbdReserveCapacity.toFixed(1)} M</td>
                      <td className="p-3 font-mono font-bold text-right text-blue-700">
                        Rp {simulationData.layer1_APBD.toFixed(2)} M
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {simulationData.layer1_APBD > 0 ? 'AKTIF' : 'STANDBY'}
                        </span>
                      </td>
                    </tr>

                    <tr className={selectedLayer === 'layer2' ? 'bg-emerald-50/40 font-semibold' : ''}>
                      <td className="p-3 font-bold text-emerald-700">Lapisan 2 (APBN)</td>
                      <td className="p-3 text-slate-600">Dana Cadangan Bencana APBN</td>
                      <td className="p-3 font-mono">Rp {simulationData.apbnTransferCeiling.toFixed(1)} M</td>
                      <td className="p-3 font-mono font-bold text-right text-emerald-700">
                        Rp {simulationData.layer2_APBN.toFixed(2)} M
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          simulationData.layer2_APBN > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {simulationData.layer2_APBN > 0 ? 'ESKALASI AKTIF' : 'STANDBY'}
                        </span>
                      </td>
                    </tr>

                    <tr className={selectedLayer === 'layer3' ? 'bg-purple-50/40 font-semibold' : ''}>
                      <td className="p-3 font-bold text-purple-700">Lapisan 3 (PFB)</td>
                      <td className="p-3 text-slate-600">Pooling Fund Bencana &amp; Asuransi</td>
                      <td className="p-3 font-mono">Rp 7,3 T (Dana Pokok)</td>
                      <td className="p-3 font-mono font-bold text-right text-purple-700">
                        Rp {simulationData.layer3_Contingent.toFixed(2)} M
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          simulationData.layer3_Contingent > 0 ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {simulationData.layer3_Contingent > 0 ? 'TERPICU KATASTROFIK' : 'STANDBY (AMAN)'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mandatory Note */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 italic">
                *Estimasi ilustratif — ambang batas antar-lapisan memerlukan kalibrasi dengan data riil APBD per daerah.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (selectedLayer === 'layer3') setSelectedLayer('layer2');
                else if (selectedLayer === 'layer2') setSelectedLayer('layer1');
              }}
              disabled={selectedLayer === 'layer1'}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-bold text-slate-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lapisan Sebelumnya</span>
            </button>

            <button
              onClick={() => {
                if (selectedLayer === 'layer1') setSelectedLayer('layer2');
                else if (selectedLayer === 'layer2') setSelectedLayer('layer3');
              }}
              disabled={selectedLayer === 'layer3'}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-bold text-slate-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Lapisan Selanjutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Cetak SOP Kontinjensi</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors shadow-xs"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
