import React, { useState } from 'react';
import {
  Shield,
  HeartPulse,
  TrendingUp,
  Database,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Clock,
  Building2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { JourneyStage } from './ResilienceJourneyTracker';

interface ResilienceJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStage?: JourneyStage;
  onSelectStage?: (stage: JourneyStage) => void;
}

export const ResilienceJourneyModal: React.FC<ResilienceJourneyModalProps> = ({
  isOpen,
  onClose,
  activeStage = 'shield',
  onSelectStage,
}) => {
  const [selectedTab, setSelectedTab] = useState<'roadmap' | 'criteria' | 'engine'>('roadmap');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 via-blue-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Resilience Journey Roadmap
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  DTSEN Terpadu
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Satu Rangkaian Berkelanjutan: Penyelamatan Darurat ➔ Perlindungan Modal Manusia ➔ Graduasi Mandiri
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setSelectedTab('roadmap')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'roadmap'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alur 3 Pilar Terpadu</span>
          </button>
          <button
            onClick={() => setSelectedTab('criteria')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'criteria'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Kriteria Transisi Antar-Pilar</span>
          </button>
          <button
            onClick={() => setSelectedTab('engine')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'engine'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Fondasi: Data &amp; Trigger Engine</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* TAB 1: ROADMAP */}
          {selectedTab === 'roadmap' && (
            <div className="space-y-6">
              <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl text-xs text-blue-900 leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Prinsip Inti SIGAP:</strong> Rumah tangga rentan tidak boleh ditinggalkan setelah fase tanggap darurat selesai. Penanganan bergerak dinamis melalui satu jalur terkoordinasi (<em>single pathway</em>) yang memastikan modal manusia dan kapasitas ekonomi terbangun kembali secara permanen.
                </p>
              </div>

              {/* 3 Pillar Cards in Modal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pilar 1: SHIELD */}
                <div className="p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 hover:border-rose-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-rose-100 text-rose-800 border border-rose-200">
                        Pilar 1 • Respons Kilat
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 font-mono">&lt; 48 Jam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                        <Shield className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-slate-900">SHIELD</h4>
                    </div>
                    <p className="text-xs text-rose-800 font-semibold">
                      Perlindungan Konsumsi &amp; Stabilisasi Darurat
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Mencegah keluarga terdampak jatuh ke jurang kemiskinan ekstrem akibat bencana atau guncangan ekonomi mendadak.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-200/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Telemetri BMKG &amp; Skala 120 Poin</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Pembiayaan Berlapis (BTT, DSP, PFB)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Top-Up Bansos Adaptif &lt; 5 Hari</span>
                    </div>

                    {onSelectStage && (
                      <button
                        onClick={() => {
                          onSelectStage('shield');
                          onClose();
                        }}
                        className="w-full mt-2 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Buka Pilar SHIELD</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Pilar 2: CONVERGE (Dinas Daerah: Cobalt / Blue) */}
                <div className="p-5 rounded-2xl bg-blue-50/50 border-2 border-blue-200 hover:border-blue-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 border border-blue-200">
                        Pilar 2 • Layanan Dasar
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 font-mono">Berkelanjutan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <HeartPulse className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-slate-900">CONVERGE</h4>
                    </div>
                    <p className="text-xs text-blue-800 font-semibold">
                      Konvergensi Layanan Kesehatan &amp; Pendidikan
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Melindungi aset modal manusia agar anak-anak tidak putus sekolah dan balita terhindar dari gizi buruk saat masa krisis.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-blue-200/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Pemetaan Kerentanan Modal Manusia</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Afirmasi BPJS PBI, JKN &amp; KIP</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Pemerataan Sarana Puskesmas Prima</span>
                    </div>

                    {onSelectStage && (
                      <button
                        onClick={() => {
                          onSelectStage('converge');
                          onClose();
                        }}
                        className="w-full mt-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Buka Pilar CONVERGE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Pilar 3: RISE (Tagana Lapangan: Emerald / Green) */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border-2 border-emerald-200 hover:border-emerald-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Pilar 3 • Kemandirian
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 font-mono">Skor &gt; 70</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-slate-900">RISE</h4>
                    </div>
                    <p className="text-xs text-emerald-800 font-semibold">
                      Inklusi Produktif &amp; Graduasi Ekonomi
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Membimbing keluarga bertransisi dari penerima bantuan pasif menjadi pelaku usaha mandiri dan lulus graduasi kemiskinan.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-200/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Kohort 5 Tahap Graduasi Bertingkat</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Pembiayaan Mikro (PNM Mekaar / UMi)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Validasi Kelulusan &amp; Sertifikat DTSEN</span>
                    </div>

                    {onSelectStage && (
                      <button
                        onClick={() => {
                          onSelectStage('rise');
                          onClose();
                        }}
                        className="w-full mt-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Buka Pilar RISE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSITION CRITERIA */}
          {selectedTab === 'criteria' && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900">
                Ambang Batas &amp; Protokol Transisi Lintas-Pilar
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Fase Transisi</th>
                      <th className="p-3">Kondisi Pemicu (Trigger)</th>
                      <th className="p-3">Intervensi yang Diaktifkan</th>
                      <th className="p-3">Keluaran (Output)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-rose-700">
                        SHIELD ➔ CONVERGE
                      </td>
                      <td className="p-3">
                        Status tanggap darurat selesai, bansos pangan darurat terdistribusi, pengungsi mulai kembali ke hunian sementara.
                      </td>
                      <td className="p-3">
                        Verifikasi NIK anak usia sekolah, aktivasi PBI JKN darurat, pemantauan status gizi balita oleh kader Posyandu.
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        Zero drop-out, layanan kesehatan pulih 100%.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-emerald-700">
                        CONVERGE ➔ RISE
                      </td>
                      <td className="p-3">
                        Modal manusia stabil (anak bersekolah penuh, kepesertaan BPJS aktif, anggota keluarga usia produktif siap dilatih).
                      </td>
                      <td className="p-3">
                        Pendaftaran Kohort Inklusi Produktif, asesmen aset usaha keluarga, penyaluran modal bibit/alat kerja.
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        Memulai usaha mikro &amp; tabungan rutin.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-purple-700">
                        RISE ➔ MANDIRI
                      </td>
                      <td className="p-3">
                        Pendapatan keluarga stabil di atas garis kemiskinan selama 6 bulan berturut-turut, skor graduasi &gt; 70 poin.
                      </td>
                      <td className="p-3">
                        Penerbitan Sertifikat Graduasi DTSEN, pelepasan bertahap dari bansos reguler, akses ke KUR perbankan.
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        Keluarga Mandiri DTSEN (Lulus Bansos).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DATA & TRIGGER ENGINE */}
          {selectedTab === 'engine' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-black uppercase tracking-wider">
                    SIGAP Data &amp; Trigger Engine
                  </h4>
                </div>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Menjadi jembatan data tunggal yang menyatukan basis data lintas kementerian/lembaga: Regsosek/DTSEN Bappenas, DTKS Kemensos, Pusdatin Kemenkes, Dapodik Kemendikbudristek, dan InaRISK BNPB.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase block">01 • Integritas NIK</span>
                  <div className="font-bold text-slate-900">Single Household ID</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Setiap rumah tangga memiliki satu rekam jejak ketahanan terpadu yang tidak terduplikasi antar-program.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase block">02 • Pemicu Otomatis</span>
                  <div className="font-bold text-slate-900">Parametric Triggers</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Sistem mendeteksi anomali telemetri dan langsung mengaktifkan antrean verifikasi tanpa birokrasi berbelit.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-purple-600 uppercase block">03 • Akuntabilitas</span>
                  <div className="font-bold text-slate-900">Audit Trail &amp; Monev</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Setiap perpindahan tahap tercatat dengan waktu, petugas penanggung jawab, serta data dukung lapangan.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Kerangka Ketahanan Adaptif • Berlandaskan DTSEN Bappenas / Kemensos / Kemenkeu
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
