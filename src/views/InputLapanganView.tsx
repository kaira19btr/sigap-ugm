import React, { useState } from 'react';
import { FieldQueueItem } from '../types';
import {
  WifiOff,
  RefreshCw,
  Plus,
  Trash2,
  Send,
  MessageSquare,
  Copy,
  Check,
  AlertCircle,
  Database,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface InputLapanganViewProps {
  queue: FieldQueueItem[];
  onAddNewEntry: (entry: Omit<FieldQueueItem, 'id' | 'timestamp' | 'status'>) => void;
  onSyncAll: () => void;
  onDeleteEntry: (id: string) => void;
  onOpenNewEntryModal: () => void;
}

export const InputLapanganView: React.FC<InputLapanganViewProps> = ({
  queue,
  onAddNewEntry,
  onSyncAll,
  onDeleteEntry,
  onOpenNewEntryModal,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedSMS, setCopiedSMS] = useState(false);

  const pendingCount = queue.filter((i) => i.status === 'Pending Sync').length;
  const errorCount = queue.filter((i) => i.status === 'Gagal Validasi').length;
  const syncedCount = queue.filter((i) => i.status === 'Tersinkronisasi').length + 128;

  const handleSyncClick = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onSyncAll();
      setIsSyncing(false);
    }, 1200);
  };

  const handleCopySms = () => {
    navigator.clipboard.writeText('SIGAP#3201012304850001#320101#4#RUSAK_BERAT');
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 2000);
  };

  return (
    <div id="input-lapangan-module" className="p-6 space-y-6">
      {/* Offline Alert Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              Mode Offline Aktif (Penyimpanan Perangkat Lokal)
            </h3>
            <p className="text-xs text-amber-800 mt-0.5">
              Data tetap dapat diinput tanpa koneksi internet dan akan otomatis tersinkronisasi saat sinyal tersedia.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-sync-offline-now"
            onClick={handleSyncClick}
            disabled={isSyncing}
            className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs flex items-center gap-2 transition-all shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
          </button>
        </div>
      </div>

      {/* Header & New Entry Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>Modul 05 • Pendataan Lapangan Tanggap Darurat</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Input Lapangan & Antrean Sinkronisasi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pendataan terpusat petugas Tagana dan relawan di lokasi bencana minim sinyal
          </p>
        </div>

        <button
          id="btn-open-new-field-entry"
          onClick={onOpenNewEntryModal}
          className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Input Data Korban Baru</span>
        </button>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Antrean Lokal (Pending)</span>
            <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{pendingCount} Data</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Berhasil Tersinkronisasi</span>
            <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">{syncedCount} Data</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Gagal Validasi NIK</span>
            <div className="text-2xl font-bold font-mono text-rose-600 mt-1">{errorCount} Data</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Local Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Daftar Antrean Pendataan Lokal
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Total: {queue.length} Item</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Nama Kepala Keluarga</th>
                <th className="py-3 px-4">NIK (Terenkripsi)</th>
                <th className="py-3 px-4">Jumlah ART</th>
                <th className="py-3 px-4">Kondisi Kerusakan</th>
                <th className="py-3 px-4">Waktu Input</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{item.nik}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {item.familyMembers} Orang
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {item.condition}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{item.timestamp}</td>
                  <td className="py-3.5 px-4">
                    {item.status === 'Pending Sync' && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>Pending Sync</span>
                      </span>
                    )}
                    {item.status === 'Tersinkronisasi' && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Tersinkronisasi</span>
                      </span>
                    )}
                    {item.status === 'Gagal Validasi' && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <AlertCircle className="w-3 h-3" />
                        <span>Gagal Validasi</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onDeleteEntry(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus dari antrean lokal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMS Gateway Helper */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Panduan Jalur Darurat SMS Gateway (Khusus 0% Sinyal Internet)
            </h3>
          </div>
          <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded">
            Nomor: 99123 (Bebas Pulsa)
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Jika jaringan data 3G/4G lumpuh total, petugas dapat mengirim data warga terdampak melalui SMS format terstandar:
        </p>

        <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto">
          <span>SIGAP#NIK#KODE_DESA#JUMLAH_ART#KONDISI</span>
          <button
            onClick={handleCopySms}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-sans transition-colors shrink-0 ml-4"
          >
            {copiedSMS ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSMS ? 'Tersalin!' : 'Salin Format'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
