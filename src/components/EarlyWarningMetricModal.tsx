import React from 'react';
import { RegionRiskData } from '../types';
import {
  X,
  AlertTriangle,
  Radio,
  Clock,
  Send,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Flame,
  Droplets,
  Coins,
  ShieldCheck,
  Bell,
  Activity,
  Users,
  Layers,
  ChevronRight,
  ExternalLink,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';

export type EarlyWarningMetricType = 'darurat' | 'siaga' | 'detection' | 'notifikasi';

interface EarlyWarningMetricModalProps {
  metricType: EarlyWarningMetricType | null;
  isOpen: boolean;
  onClose: () => void;
  regions: RegionRiskData[];
  onSelectRegion?: (region: RegionRiskData) => void;
  onOpenEmergencyAction?: (region: RegionRiskData) => void;
}

export const EarlyWarningMetricModal: React.FC<EarlyWarningMetricModalProps> = ({
  metricType,
  isOpen,
  onClose,
  regions,
  onSelectRegion,
  onOpenEmergencyAction,
}) => {
  if (!isOpen || !metricType) return null;

  const daruratRegions = regions.filter((r) => r.status === 'darurat');
  const siagaRegions = regions.filter((r) => r.status === 'siaga');

  const totalDaruratPop = daruratRegions.reduce((sum, r) => sum + r.affectedPopulation, 0);
  const totalSiagaPop = siagaRegions.reduce((sum, r) => sum + r.affectedPopulation, 0);

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
                metricType === 'darurat'
                  ? 'bg-gradient-to-tr from-rose-600 to-red-500'
                  : metricType === 'siaga'
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
                  : metricType === 'detection'
                  ? 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                  : 'bg-gradient-to-tr from-indigo-600 to-purple-600'
              }`}
            >
              {metricType === 'darurat' && <AlertTriangle className="w-6 h-6" />}
              {metricType === 'siaga' && <Radio className="w-6 h-6" />}
              {metricType === 'detection' && <Clock className="w-6 h-6" />}
              {metricType === 'notifikasi' && <Send className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/20">
                  {metricType === 'darurat' && 'Status: Level 3 (Tanggap Darurat)'}
                  {metricType === 'siaga' && 'Status: Level 2 (Kesiapsiagaan Dini)'}
                  {metricType === 'detection' && 'Telemetri AI & Sensor Real-Time'}
                  {metricType === 'notifikasi' && 'Multi-Channel Push Broadcast Gateway'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Data Terverifikasi BNPB/BMKG
                </span>
              </div>

              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                {metricType === 'darurat' && 'Laporan Komprehensif Wilayah Darurat Bencana'}
                {metricType === 'siaga' && 'Laporan Pemantauan & Peringatan Dini Wilayah Siaga'}
                {metricType === 'detection' && 'Analisis Kecepatan Deteksi Dini & Algoritma Anomali'}
                {metricType === 'notifikasi' && 'Audit Log & Keandalan Pengiriman Notifikasi Lapangan'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {metricType === 'darurat' && `Menampilkan ${daruratRegions.length} wilayah berstatus Darurat aktif dengan total ${totalDaruratPop.toLocaleString('id-ID')} jiwa terdampak.`}
                {metricType === 'siaga' && `Menampilkan ${siagaRegions.length} wilayah berstatus Siaga aktif dengan total ${totalSiagaPop.toLocaleString('id-ID')} jiwa dalam radius pemantauan.`}
                {metricType === 'detection' && 'Waktu rata-rata 4.2 hari memberi ruang mobilisasi bantuan sebelum bencana melumpuhkan rantai pasok.'}
                {metricType === 'notifikasi' && 'Tingkat keberhasilan pengiriman notifikasi 99.8% ke 1.248 personel Tagana, BPBD, dan Dinsos.'}
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
          {/* 1. CONTENT FOR WILAYAH DARURAT */}
          {metricType === 'darurat' && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
                  <span className="text-[11px] font-bold text-rose-800 uppercase block">Total Wilayah Darurat</span>
                  <div className="text-2xl font-extrabold font-mono text-rose-700 mt-1">
                    {daruratRegions.length} Kabupaten/Kota
                  </div>
                  <span className="text-[10px] text-rose-600 mt-0.5 block">+1 eskalasi dalam 24 jam</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Total Populasi Terdampak</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                    {totalDaruratPop.toLocaleString('id-ID')} Jiwa
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Termasuk lansia & balita rentan</span>
                </div>

                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <span className="text-[11px] font-bold text-indigo-800 uppercase block">Protokol Penyaluran Cepat</span>
                  <div className="text-2xl font-extrabold font-mono text-indigo-700 mt-1">
                    SLA &lt; 24 Jam
                  </div>
                  <span className="text-[10px] text-indigo-600 mt-0.5 block">Sesuai Permensos No. 3/2021</span>
                </div>
              </div>

              {/* Regions Detailed List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Daftar Wilayah Status Darurat Aktif</span>
                  <span className="text-[11px] font-normal text-slate-500">Klik wilayah untuk membuka navigasi atau aktivasi bantuan</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {daruratRegions.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-4 bg-white rounded-xl border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all space-y-3 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                            <h5 className="font-extrabold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                              {reg.name}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{reg.regency}, {reg.province}</span>
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          Skor: {reg.vulnerabilityIndex}/10
                        </span>
                      </div>

                      <div className="p-2.5 bg-rose-50/70 rounded-lg text-xs space-y-1">
                        <span className="text-[10px] font-bold text-rose-800 uppercase block">Pemicu Kedaruratan:</span>
                        <p className="font-medium text-slate-800">{reg.crisisType}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-rose-100 font-mono">
                          <span>Curah Hujan: <strong>{reg.rainfall}</strong></span>
                          <span>Harga Beras: <strong>{reg.ricePrice}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500 font-semibold">
                          Terdampak: <strong className="text-slate-800">{reg.affectedPopulation.toLocaleString('id-ID')} Jiwa</strong>
                        </span>
                        <div className="flex items-center gap-1.5">
                          {onSelectRegion && (
                            <button
                              onClick={() => {
                                onSelectRegion(reg);
                                onClose();
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                            >
                              Fokus Peta
                            </button>
                          )}
                          {onOpenEmergencyAction && (
                            <button
                              onClick={() => {
                                onOpenEmergencyAction(reg);
                                onClose();
                              }}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                            >
                              Aktivasi Bantuan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. CONTENT FOR WILAYAH SIAGA */}
          {metricType === 'siaga' && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="text-[11px] font-bold text-amber-800 uppercase block">Total Wilayah Siaga</span>
                  <div className="text-2xl font-extrabold font-mono text-amber-700 mt-1">
                    {siagaRegions.length} Kabupaten/Kota
                  </div>
                  <span className="text-[10px] text-amber-600 mt-0.5 block">Radius pemantauan level 2</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Populasi Terpantau</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                    {totalSiagaPop.toLocaleString('id-ID')} Jiwa
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Potensi terdampak jika eskalasi</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Tindakan Preventif</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">
                    Pra-Aktivasi Logistik
                  </div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Buffer stock lumbung sosial siap</span>
                </div>
              </div>

              {/* Regions Detailed List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Daftar Wilayah Status Siaga Aktif</span>
                  <span className="text-[11px] font-normal text-slate-500">Peringatan dini multi-indikator sebelum ambang darurat</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {siagaRegions.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <h5 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                              {reg.name}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{reg.regency}, {reg.province}</span>
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          Skor: {reg.vulnerabilityIndex}/10
                        </span>
                      </div>

                      <div className="p-2.5 bg-amber-50/70 rounded-lg text-xs space-y-1">
                        <span className="text-[10px] font-bold text-amber-800 uppercase block">Anomali Terdeteksi:</span>
                        <p className="font-medium text-slate-800">{reg.crisisType}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-amber-100 font-mono">
                          <span>Curah Hujan: <strong>{reg.rainfall}</strong></span>
                          <span>Harga Beras: <strong>{reg.ricePrice}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500 font-semibold">
                          Populasi: <strong className="text-slate-800">{reg.affectedPopulation.toLocaleString('id-ID')} Jiwa</strong>
                        </span>
                        {onSelectRegion && (
                          <button
                            onClick={() => {
                              onSelectRegion(reg);
                              onClose();
                            }}
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                          >
                            Pantau Wilayah
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. CONTENT FOR DETECTION & TELEMETRY */}
          {metricType === 'detection' && (
            <div className="space-y-5">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Mekanisme Peringatan Dini AI SIGAP</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Sistem SIGAP mengolah 4 lapis telemetri geospasial real-time: Curah Hujan BMKG, Indeks Kekeringan SPI, Fluktuasi Harga Pangan PIHPS Bank Indonesia, dan Seismik Geologi PVMBG. Anomali terdeteksi rata-rata <strong>4.2 hari</strong> sebelum krisis puncak terjadi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Sensor 1: Hidrometeorologi BMKG</span>
                  <h5 className="text-xs font-bold text-slate-800">Pemantauan Curah Hujan & Gelombang Tinggi</h5>
                  <p className="text-xs text-slate-600">
                    Mendeteksi anomali presipitasi di atas 150mm/24 jam atau defisit &lt;10mm selama 20 hari berturut-turut.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-600 font-bold">Latency: 15 Menit Stream</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Sensor 2: Harga Pangan Strategis Bapanas</span>
                  <h5 className="text-xs font-bold text-slate-800">Spike Inflasi Beras & Komoditas Pokok</h5>
                  <p className="text-xs text-slate-600">
                    Memberi sinyal dini jika harga beras medium naik lebih dari 10% dalam 7 hari akibat pasokan terputus.
                  </p>
                  <div className="text-[11px] font-mono text-indigo-600 font-bold">Sinkronisasi: Setiap 06:00 WIB</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Sensor 3: Seismik & Vulkanologi PVMBG</span>
                  <h5 className="text-xs font-bold text-slate-800">Status Gunung Api & Gempa Tektonik</h5>
                  <p className="text-xs text-slate-600">
                    Otomatis memetakan zona Kawasan Rawan Bencana (KRB III & II) dan radius bahaya evakuasi penduduk.
                  </p>
                  <div className="text-[11px] font-mono text-rose-600 font-bold">Trigger: Real-time API Push</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Sensor 4: Indeks Kerentanan Sosial Kemensos</span>
                  <h5 className="text-xs font-bold text-slate-800">Desil Regsosek & Demografi Lansia/Disabilitas</h5>
                  <p className="text-xs text-slate-600">
                    Menghitung bobot kerentanan agregat per desa untuk memprioritaskan penyaluran bansos adaptif.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-600 font-bold">Akurasi: 99.4% DTKS-Dukcapil</div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CONTENT FOR NOTIFIKASI TERKIRIM */}
          {metricType === 'notifikasi' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <span className="text-[11px] font-bold text-indigo-800 uppercase block">Total Notifikasi 24 Jam</span>
                  <div className="text-2xl font-extrabold font-mono text-indigo-700 mt-1">1,248 Pesan</div>
                  <span className="text-[10px] text-indigo-600 mt-0.5 block">Melalui WhatsApp API & SMS</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Delivery Rate / Sukses</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">99.8%</div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Fallback otomatis ke SMS blast</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Penerima Sasaran</span>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">Petugas & Pemda</div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Tagana, Kadinsos, BPBD, Camat</span>
                </div>
              </div>

              {/* Log Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Log Siaran Notifikasi Terakhir
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-semibold text-slate-500">
                      <tr>
                        <th className="p-2.5">Waktu</th>
                        <th className="p-2.5">Wilayah Target</th>
                        <th className="p-2.5">Kanal Pengiriman</th>
                        <th className="p-2.5">Konten Peringatan</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2.5 font-mono text-slate-500">09:12 WIB</td>
                        <td className="p-2.5 font-bold text-slate-900">Tagulandang (Gn. Ruang)</td>
                        <td className="p-2.5 text-slate-600">WhatsApp Gateway + SMS</td>
                        <td className="p-2.5 text-slate-700">[DARURAT] Evakuasi Radius 6km & Kesiapan BLT Darurat</td>
                        <td className="p-2.5 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold font-mono text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terkirim (100%)</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-slate-500">08:45 WIB</td>
                        <td className="p-2.5 font-bold text-slate-900">Tanah Datar (Marapi)</td>
                        <td className="p-2.5 text-slate-600">WhatsApp Broadcast</td>
                        <td className="p-2.5 text-slate-700">[DARURAT] Siaga Lahar Dingin Galodo Hulu Sungai</td>
                        <td className="p-2.5 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold font-mono text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terkirim (99.6%)</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-slate-500">07:30 WIB</td>
                        <td className="p-2.5 font-bold text-slate-900">Sumba Timur</td>
                        <td className="p-2.5 text-slate-600">SMS Blast + Dashboard</td>
                        <td className="p-2.5 text-slate-700">[PERINGATAN] Defisit Pangan & Rekomendasi Bantuan Pangan</td>
                        <td className="p-2.5 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold font-mono text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terkirim (100%)</span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Sumber Data: Pusat Pengendalian Operasi (Pusdalops) SIGAP Kemensos RI
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Laporan</span>
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
