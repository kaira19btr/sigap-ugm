import React from 'react';
import {
  X,
  Clock,
  Coins,
  Target,
  Smile,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  Printer,
  Download,
  Building2,
  Receipt,
  Award,
  Sparkles,
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export type MonevMetricType = 'waktu_penyaluran' | 'total_dana' | 'akurasi_sasaran' | 'kepuasan_warga';

interface MonevMetricModalProps {
  metricType: MonevMetricType | null;
  isOpen: boolean;
  onClose: () => void;
  ratingScore?: number;
  totalSurveys?: number;
}

export const MonevMetricModal: React.FC<MonevMetricModalProps> = ({
  metricType,
  isOpen,
  onClose,
  ratingScore = 4.6,
  totalSurveys = 8940,
}) => {
  if (!isOpen || !metricType) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold shadow-lg shrink-0 ${
                metricType === 'waktu_penyaluran'
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-500'
                  : metricType === 'total_dana'
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-500'
                  : metricType === 'akurasi_sasaran'
                  ? 'bg-gradient-to-tr from-indigo-600 to-purple-600'
                  : 'bg-gradient-to-tr from-amber-500 to-orange-500'
              }`}
            >
              {metricType === 'waktu_penyaluran' && <Clock className="w-6 h-6" />}
              {metricType === 'total_dana' && <Coins className="w-6 h-6" />}
              {metricType === 'akurasi_sasaran' && <Target className="w-6 h-6" />}
              {metricType === 'kepuasan_warga' && <Smile className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/20">
                  {metricType === 'waktu_penyaluran' && 'Efisiensi Waktu & Kecepatan Layanan'}
                  {metricType === 'total_dana' && 'Akuntabilitas Realisasi Anggaran APBN'}
                  {metricType === 'akurasi_sasaran' && 'Validasi Biometrik & Audit BPKP'}
                  {metricType === 'kepuasan_warga' && 'Indeks Kepuasan Penerima Manfaat (IKM)'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Audit BPKP & Kemenkeu
                </span>
              </div>

              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                {metricType === 'waktu_penyaluran' && 'Laporan Komparasi & Timeline Rata-rata Waktu Penyaluran'}
                {metricType === 'total_dana' && 'Laporan Realisasi & Penyerapan Dana Bantuan Darurat'}
                {metricType === 'akurasi_sasaran' && 'Laporan Akurasi Penerima Manfaat & Pencegahan Kebocoran'}
                {metricType === 'kepuasan_warga' && 'Hasil Survei Kepuasan & Umpan Balik Warga Penerima'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {metricType === 'waktu_penyaluran' && 'Rata-rata 4.2 hari dari SK tanggap darurat hingga dana/sembako tiba di tangan warga (efisiensi +78%).'}
                {metricType === 'total_dana' && 'Realisasi Rp 12.4 Triliun (92.4% alokasi) tersalurkan secara nontunai dan transfer terverifikasi.'}
                {metricType === 'akurasi_sasaran' && 'Tingkat akurasi 94.8% terbebas dari penerima ganda atau data anomali berkat integrasi NIK Padan.'}
                {metricType === 'kepuasan_warga' && `Skor rata-rata ${ratingScore.toFixed(1)} / 5.0 dari total ${totalSurveys.toLocaleString('id-ID')} responden via saluran SMS & WhatsApp.`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. WAKTU PENYALURAN */}
          {metricType === 'waktu_penyaluran' && (
            <div className="space-y-6">
              {/* Top summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Rata-rata Penyaluran SIGAP</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">4.2 Hari</div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Turun drastis dari 21 hari (Manual)</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Penghematan Waktu</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">16.8 Hari</div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Warga terbantu saat fase paling kritis</span>
                </div>

                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <span className="text-[11px] font-bold text-indigo-800 uppercase block">Otomasi Alur Data</span>
                  <div className="text-2xl font-extrabold font-mono text-indigo-700 mt-1">96% Digital</div>
                  <span className="text-[10px] text-indigo-600 mt-0.5 block">Pencocokan BNBA tanpa manual form</span>
                </div>
              </div>

              {/* Day by Day Milestone Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Rincian Tahapan Penyaluran Cepat (End-to-End Timeline)
                </h4>

                <div className="space-y-2.5">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                      T+0
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Deteksi Dini & Penetapan Status Darurat</span>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold">Durasi: 4 Jam</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Sistem SIGAP mengidentifikasi anomali telemetri dan menerbitkan usulan darurat otomatis ke Kepala Daerah/Kemensos.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                      T+1
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Kliring Data BNBA & Validasi NIK Padan Dukcapil</span>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold">Durasi: 12 Jam</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Penyelarasan daftar penerima by name by address dengan DTKS & Regsosek, mengeliminasi penerima fiktif secara instan.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                      T+2
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Penerbitan SP2D & Otorisasi Bank Penyalur / Pos</span>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold">Durasi: 18 Jam</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Kementerian Keuangan dan KPPN mencairkan anggaran darurat ke rekening penampung Bank Himbara & PT Pos Indonesia.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                      T+3..4
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Penyaluran Tunai / Top-Up KKS & Penyerahan Sembako</span>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold">Durasi: 24-48 Jam</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">
                        Distribusi langsung ke tangan penerima manfaat melalui pos darurat lapangan, ATM Bansos, atau layanan pos keliling terpadu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TOTAL DANA TERSALURKAN */}
          {metricType === 'total_dana' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="text-[11px] font-bold text-blue-800 uppercase block">Total Realisasi Penyaluran</span>
                  <div className="text-2xl font-extrabold font-mono text-blue-700 mt-1">Rp 12.4 Triliun</div>
                  <span className="text-[10px] text-blue-600 mt-0.5 block">92.4% dari total pagu darurat Rp 13.4T</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Cadangan Kas Darurat (Buffer)</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">Rp 1.0 Triliun</div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Tersedia untuk bencana mendadak</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Efisiensi Biaya Operasional</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">-42% Biaya Ops</div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Berkat digitalisasi transaksi</span>
                </div>
              </div>

              {/* Breakdown per Disaster Event Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Alokasi Realisasi Berdasarkan Kategori Bencana & Intervensi
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-semibold text-slate-500">
                      <tr>
                        <th className="p-2.5">Kategori Bencana</th>
                        <th className="p-2.5">Alokasi Anggaran</th>
                        <th className="p-2.5">Realisasi Terserap</th>
                        <th className="p-2.5">Jumlah Penerima (KK)</th>
                        <th className="p-2.5 text-right">Persentase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Gempa Bumi & Tsunami</td>
                        <td className="p-2.5 text-slate-700">Rp 4.200 Miliar</td>
                        <td className="p-2.5 font-bold text-emerald-600">Rp 3.980 Miliar</td>
                        <td className="p-2.5 text-slate-700">142.500 KK</td>
                        <td className="p-2.5 text-right font-bold text-slate-800">94.8%</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Erupsi Gunung Api</td>
                        <td className="p-2.5 text-slate-700">Rp 2.800 Miliar</td>
                        <td className="p-2.5 font-bold text-emerald-600">Rp 2.650 Miliar</td>
                        <td className="p-2.5 text-slate-700">88.200 KK</td>
                        <td className="p-2.5 text-right font-bold text-slate-800">94.6%</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Banjir Bandang & Lahar Hujan</td>
                        <td className="p-2.5 text-slate-700">Rp 3.500 Miliar</td>
                        <td className="p-2.5 font-bold text-emerald-600">Rp 3.220 Miliar</td>
                        <td className="p-2.5 text-slate-700">115.400 KK</td>
                        <td className="p-2.5 text-right font-bold text-slate-800">92.0%</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-900">Kekeringan Parah & Anomali Pangan</td>
                        <td className="p-2.5 text-slate-700">Rp 2.900 Miliar</td>
                        <td className="p-2.5 font-bold text-emerald-600">Rp 2.550 Miliar</td>
                        <td className="p-2.5 text-slate-700">95.800 KK</td>
                        <td className="p-2.5 text-right font-bold text-slate-800">87.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. AKURASI SASARAN PENERIMA */}
          {metricType === 'akurasi_sasaran' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <span className="text-[11px] font-bold text-indigo-800 uppercase block">Akurasi Sasaran BNBA</span>
                  <div className="text-2xl font-extrabold font-mono text-indigo-700 mt-1">94.8%</div>
                  <span className="text-[10px] text-indigo-600 mt-0.5 block">Lolos uji sampling BPKP 2026</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Pencegahan Dana Bocor</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">Rp 480 Miliar</div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Dari deteksi anomali NIK & ganda</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Exclusion Error</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">&lt; 3.2%</div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Turun dari 18.5% sistem lama</span>
                </div>
              </div>

              {/* Data Quality Pillars */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  4 Pilar Penjamin Akurasi Data Perlindungan Sosial SIGAP
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>1. Integrasi Padan NIK Dukcapil</span>
                    </div>
                    <p className="text-slate-600">
                      Setiap calon penerima wajib memiliki NIK 16 digit yang aktif dan padan di server pusat Kemendagri tanpa data ganda.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>2. Peringkat Desil Regsosek BPS</span>
                    </div>
                    <p className="text-slate-600">
                      Prioritas mutlak diberikan kepada kepala keluarga Desil 1 (Sangat Miskin) dan Desil 2 (Miskin) yang terdampak bencana.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>3. Geotagging Lapangan Tagana</span>
                    </div>
                    <p className="text-slate-600">
                      Verifikasi koordinat GPS tempat tinggal dan foto kerusakan fisik hunian yang tersinkronisasi offline-first.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>4. Kanal Sanggah & Pengaduan Warga</span>
                    </div>
                    <p className="text-slate-600">
                      Masyarakat dapat melaporkan ketidaktepatan sasaran secara terbuka via SMS/WhatsApp yang ditindaklanjuti dalam 24 jam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. SKOR KEPUASAN WARGA */}
          {metricType === 'kepuasan_warga' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="text-[11px] font-bold text-amber-800 uppercase block">Indeks Kepuasan (CSAT)</span>
                  <div className="text-2xl font-extrabold font-mono text-amber-600 mt-1 flex items-center gap-1.5">
                    <span>{ratingScore.toFixed(1)} / 5.0</span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] text-amber-700 mt-0.5 block">Kategori: Sangat Memuaskan</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Total Responden Valid</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                    {totalSurveys.toLocaleString('id-ID')} Warga
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Survei 2 arah via SMS & WA Bot</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Tanpa Potongan Liar (Pungli)</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">99.9% Utuh</div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Diterima utuh tanpa biaya apa pun</span>
                </div>
              </div>

              {/* Sub-Dimension Ratings */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Rincian Penilaian Dimensi Layanan Penyaluran
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">1. Kecepatan Bantuan Tiba Sejak Hari Pertama Bencana</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[94%]"></div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">4.7 / 5.0</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">2. Kemudahan Prosedur & Persyaratan Pengambilan</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[92%]"></div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">4.6 / 5.0</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">3. Ketepatan Nominal Uang & Kelayakan Sembako</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[96%]"></div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">4.8 / 5.0</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">4. Keramahan & Bantuan Petugas Lapangan (Tagana/Dinsos)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[90%]"></div>
                      </div>
                      <span className="font-mono font-bold text-slate-900">4.5 / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Sumber Data: Dashboard Terpadu Sistem Monitoring & Evaluasi Kemensos RI
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Hasil Monev</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
