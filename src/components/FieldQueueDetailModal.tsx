import React, { useState } from 'react';
import { FieldQueueItem } from '../types';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  Download,
  Printer,
  ShieldCheck,
  FileCheck,
  Send,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Key,
  HardDrive,
  Activity,
  Layers,
  Search,
  Check,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export type QueueStatusModalType = 'pending' | 'synced' | 'failed';

interface FieldQueueDetailModalProps {
  statusType: QueueStatusModalType | null;
  isOpen: boolean;
  onClose: () => void;
  queue: FieldQueueItem[];
  onSyncAll: () => void;
  onDeleteEntry?: (id: string) => void;
}

export const FieldQueueDetailModal: React.FC<FieldQueueDetailModalProps> = ({
  statusType,
  isOpen,
  onClose,
  queue,
  onSyncAll,
  onDeleteEntry,
}) => {
  if (!isOpen || !statusType) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncingModal, setIsSyncingModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const pendingItems = queue.filter((i) => i.status === 'Pending Sync');
  const syncedItems = queue.filter((i) => i.status === 'Tersinkronisasi');
  const failedItems = queue.filter((i) => i.status === 'Gagal Validasi');

  const handleModalSync = () => {
    soundEffects.playClick();
    setIsSyncingModal(true);
    setTimeout(() => {
      onSyncAll();
      setIsSyncingModal(false);
      soundEffects.playSuccessChime();
    }, 1000);
  };

  const handleCopyNIK = (nik: string, id: string) => {
    soundEffects.playClick();
    navigator.clipboard.writeText(nik);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleExportJSON = () => {
    soundEffects.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(queue, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SIGAP_FIELD_QUEUE_${statusType.toUpperCase()}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with status badge */}
        <div
          className={`p-5 text-white flex items-start justify-between border-b ${
            statusType === 'pending'
              ? 'bg-gradient-to-r from-slate-900 via-amber-950/70 to-slate-900 border-amber-500/30'
              : statusType === 'synced'
              ? 'bg-gradient-to-r from-slate-900 via-emerald-950/70 to-slate-900 border-emerald-500/30'
              : 'bg-gradient-to-r from-slate-900 via-rose-950/70 to-slate-900 border-rose-500/30'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold shadow-lg shrink-0 ${
                statusType === 'pending'
                  ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                  : statusType === 'synced'
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                  : 'bg-rose-600 text-white ring-4 ring-rose-600/20'
              }`}
            >
              {statusType === 'pending' && <Clock className="w-6 h-6 animate-spin duration-3000" />}
              {statusType === 'synced' && <CheckCircle2 className="w-6 h-6" />}
              {statusType === 'failed' && <AlertCircle className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                    statusType === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : statusType === 'synced'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {statusType === 'pending' && 'Antrean Buffer Offline'}
                  {statusType === 'synced' && 'Sinkronisasi Pusat Berhasil'}
                  {statusType === 'failed' && 'Perlu Tindakan Verifikasi Petugas'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Modul 05 • Pendataan Lapangan URC
                </span>
              </div>

              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                {statusType === 'pending' && 'Detail Antrean Data Lokal (Pending Synchronization)'}
                {statusType === 'synced' && 'Laporan Data Terverifikasi & Tersinkronisasi DTKS'}
                {statusType === 'failed' && 'Diagnostik & Penanganan Gagal Validasi NIK'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {statusType === 'pending' &&
                  'Data yang tersimpan di memori perangkat lokal saat kondisi darurat 0% internet dan siap diunggah otomatis.'}
                {statusType === 'synced' &&
                  'Seluruh rekaman data korban telah terhubung dengan basis data DTKS/Regsosek dan masuk antrean SP2D.'}
                {statusType === 'failed' &&
                  'Data korban yang tertolak otomatis oleh sistem validasi format Dukcapil dan memerlukan koreksi manual.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs">
          {/* Top Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Jumlah Rekaman</span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-0.5">
                {statusType === 'pending' && `${pendingItems.length} Data`}
                {statusType === 'synced' && `${syncedItems.length + 128} Data`}
                {statusType === 'failed' && `${failedItems.length} Data`}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Penyimpanan / Enkripsi</span>
              <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>AES-256 Local Vault</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Jalur Transmisi</span>
              <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                {statusType === 'pending' ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                    <span>Auto-Retry Polling</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                    <span>TLS 1.3 / REST API</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Integritas Data</span>
              <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>SHA-256 Checksum</span>
              </div>
            </div>
          </div>

          {/* VIEW: PENDING SYNC */}
          {statusType === 'pending' && (
            <div className="space-y-5">
              {/* How Offline-First Sync Engine Works */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wide">
                    Mekanisme Kerja Sinkronisasi Offline-First SIGAP
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-amber-950">
                  <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-extrabold">
                        1
                      </span>
                      <span>Local Snapshot Vault</span>
                    </div>
                    <p className="text-slate-600 text-[10px] leading-relaxed">
                      Setiap formulir korban yang diinput saat sinyal terputus langsung dikompresi dan dienkripsi ke database IndexedDB perangkat.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-extrabold">
                        2
                      </span>
                      <span>Network Sensing</span>
                    </div>
                    <p className="text-slate-600 text-[10px] leading-relaxed">
                      Service Worker mendeteksi pulihnya jaringan seluler/Wi-Fi/satelit dan memulai jabat tangan (*handshake*) aman dengan server pusat.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-extrabold">
                        3
                      </span>
                      <span>Batch Delta Dispatch</span>
                    </div>
                    <p className="text-slate-600 text-[10px] leading-relaxed">
                      Mengirimkan payload antrean secara bertahap tanpa duplikasi, mencocokkan NIK ke DTKS, dan mengubah status menjadi Tersinkronisasi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tersedia {pendingItems.length} Data Siap Kirim</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Klik tombol sinkronisasi untuk mengirim seluruh antrean lokal ke Server Satu Data Kemensos RI.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSyncingModal || pendingItems.length === 0}
                  onClick={handleModalSync}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all disabled:opacity-50 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingModal ? 'animate-spin' : ''}`} />
                  <span>{isSyncingModal ? 'Memproses Sinkronisasi...' : 'Sinkronkan Semua Sekarang'}</span>
                </button>
              </div>

              {/* Queue List Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Daftar Berkas dalam Antrean ({pendingItems.length})
                </h4>
                {pendingItems.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-400 space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="font-bold text-slate-700">Semua Data Telah Tersinkronisasi</div>
                    <div className="text-[11px]">Tidak ada data yang tertahan di antrean lokal perangkat.</div>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/80 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Kepala Keluarga</th>
                          <th className="py-2.5 px-3">NIK</th>
                          <th className="py-2.5 px-3">Jumlah ART</th>
                          <th className="py-2.5 px-3">Kondisi Kerusakan</th>
                          <th className="py-2.5 px-3">Waktu Input</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pendingItems.map((item) => (
                          <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-slate-900">{item.name}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">
                              <span className="cursor-pointer hover:text-blue-600" onClick={() => handleCopyNIK(item.nik, item.id)}>
                                {item.nik}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-bold font-mono">{item.familyMembers} Jiwa</td>
                            <td className="py-2.5 px-3">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {item.condition}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">{item.timestamp}</td>
                            <td className="py-2.5 px-3 text-right">
                              {onDeleteEntry && (
                                <button
                                  onClick={() => onDeleteEntry(item.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1 hover:bg-rose-50 rounded"
                                  title="Hapus data ini"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: SYNCED */}
          {statusType === 'synced' && (
            <div className="space-y-5">
              {/* Sync Audit Certificate Banner */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      Sertifikat Verifikasi Sinkronisasi Terpadu
                    </h4>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Seluruh 128+ berkas telah terverifikasi padan NIK Ditjen Dukcapil & terdaftar pada penetapan SP2D Kemensos.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-emerald-800 font-bold rounded-lg border border-emerald-300 flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor Log Audit</span>
                  </button>
                </div>
              </div>

              {/* Damage Category Distribution */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-rose-600 uppercase">Rusak Berat (Huntara)</span>
                  <div className="text-lg font-extrabold font-mono text-slate-900">64 Keluarga</div>
                  <p className="text-[10px] text-slate-500">Santunan Hunian Sementara & Tunai Rp 3.000.000</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Rusak Sedang</span>
                  <div className="text-lg font-extrabold font-mono text-slate-900">48 Keluarga</div>
                  <p className="text-[10px] text-slate-500">Bantuan Bahan Bangunan Rumah & Sembako</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Rusak Ringan / Terisolir</span>
                  <div className="text-lg font-extrabold font-mono text-slate-900">16+ Keluarga</div>
                  <p className="text-[10px] text-slate-500">Paket Logistik Tanggap Darurat & Dapur Umum</p>
                </div>
              </div>

              {/* Verified Records Sample Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Sampel Rekaman Terverifikasi di Server Pusat
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Nama Penerima</th>
                        <th className="py-2.5 px-3">NIK</th>
                        <th className="py-2.5 px-3">Status DTKS</th>
                        <th className="py-2.5 px-3">Kondisi</th>
                        <th className="py-2.5 px-3">Waktu Sinkron</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">Suryono (KK)</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">3201014502800001</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Terpadu DTKS Desil 1
                          </span>
                        </td>
                        <td className="py-2.5 px-3">Rusak Berat</td>
                        <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">10:42:15 WIB</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">Ratna Juwita</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">3201015609870002</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Terpadu DTKS Desil 2
                          </span>
                        </td>
                        <td className="py-2.5 px-3">Rusak Sedang</td>
                        <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">10:40:02 WIB</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">Hendra Setiawan</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">3201011203920003</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            Regsosek Baru (Valid)
                          </span>
                        </td>
                        <td className="py-2.5 px-3">Rusak Berat</td>
                        <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">10:35:48 WIB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: FAILED / ERROR VALIDATION */}
          {statusType === 'failed' && (
            <div className="space-y-5">
              {/* Alert Diagnostic Box */}
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h4 className="text-xs font-extrabold text-rose-950 uppercase tracking-wide">
                    Diagnostik Penyebab Gagal Validasi NIK di Lapangan
                  </h4>
                </div>
                <p className="text-rose-900 text-[11px] leading-relaxed">
                  Sistem perlindungan data SIGAP menerapkan validasi otomatis dengan server Dukcapil Kemendagri guna mencegah salah sasaran dan duplikasi bantuan:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                  <div className="p-2.5 bg-white rounded-lg border border-rose-200 space-y-1">
                    <div className="font-bold text-rose-800">1. Format NIK Tidak Sesuai</div>
                    <p className="text-slate-600 text-[10px]">
                      Panjang digit kurang/lebih dari 16 digit atau terdapat karakter bukan angka akibat kesalahan input di lapangan.
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-rose-200 space-y-1">
                    <div className="font-bold text-rose-800">2. NIK Ganda / Telah Terdaftar</div>
                    <p className="text-slate-600 text-[10px]">
                      NIK kepala keluarga tersebut sudah dicatatkan oleh posko penampungan lain di zona bencana yang sama.
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-rose-200 space-y-1">
                    <div className="font-bold text-rose-800">3. Anomali Kode Wilayah</div>
                    <p className="text-slate-600 text-[10px]">
                      6 digit pertama NIK tidak sesuai dengan wilayah bencana dan belum terverifikasi surat domisili RT/RW.
                    </p>
                  </div>
                </div>
              </div>

              {/* Standard Operating Procedure for Resolution */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SOP Penyelesaian Data oleh Petugas Tagana:</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 leading-relaxed">
                  <li>
                    Lakukan pemeriksaan fisik e-KTP / Kartu Keluarga warga terdampak atau scan barcode KTP jika tersedia.
                  </li>
                  <li>
                    Jika KTP hilang saat bencana, mintakan Surat Pengantar Keterangan Domisili dari Kepala Dusun/Desa setempat.
                  </li>
                  <li>
                    Gunakan fitur <strong>Override Verifikasi Lapangan</strong> dengan melampirkan foto dokumentasi kondisi rumah.
                  </li>
                </ol>
              </div>

              {/* List of failed items with quick resolve buttons */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Daftar Berkas Butuh Koreksi ({failedItems.length})
                </h4>
                {failedItems.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                    Tidak ada berkas yang gagal validasi saat ini.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {failedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-white rounded-xl border border-rose-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-rose-300 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs">{item.name}</span>
                            <span className="text-[10px] font-mono bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                              {item.nik}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Jumlah ART: <strong>{item.familyMembers} Jiwa</strong> • Kondisi: <strong>{item.condition}</strong> • Waktu: {item.timestamp}
                          </p>
                          <p className="text-[10px] text-rose-600 font-medium mt-0.5">
                            Status Error: Format NIK terindikasi anomali Dukcapil.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              soundEffects.playClick();
                              alert(`Membuka form koreksi NIK untuk ${item.name}. Silakan periksa kembali berkas KTP warga.`);
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition-colors shadow-2xs"
                          >
                            Perbaiki Data
                          </button>
                          {onDeleteEntry && (
                            <button
                              type="button"
                              onClick={() => onDeleteEntry(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus dari antrean"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Sistem Gerak Cepat Perlindungan Sosial Adaptif (SIGAP) • Pusdatin Kemensos RI
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                window.print();
              }}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Ringkasan</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
