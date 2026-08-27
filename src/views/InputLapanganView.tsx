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
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { FieldQueueDetailModal, QueueStatusModalType } from '../components/FieldQueueDetailModal';
import { soundEffects } from '../utils/soundEffects';

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
  const [selectedStatusModal, setSelectedStatusModal] = useState<QueueStatusModalType | null>(null);

  const pendingCount = queue.filter((i) => i.status === 'Pending Sync').length;
  const errorCount = queue.filter((i) => i.status === 'Gagal Validasi').length;
  const syncedCount = queue.filter((i) => i.status === 'Tersinkronisasi').length + 128;

  const handleSyncClick = () => {
    soundEffects.playClick();
    setIsSyncing(true);
    setTimeout(() => {
      onSyncAll();
      setIsSyncing(false);
      soundEffects.playSuccessChime();
    }, 1200);
  };

  const handleCopySms = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText('SIGAP#3201012304850001#320101#4#RUSAK_BERAT');
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 2000);
  };

  const handleOpenStatusModal = (type: QueueStatusModalType) => {
    soundEffects.playClick();
    setSelectedStatusModal(type);
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

      {/* 3 Interactive Expandable Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Antrean Lokal */}
        <div
          id="card-status-pending"
          onClick={() => handleOpenStatusModal('pending')}
          className="group relative bg-gradient-to-br from-white via-amber-50/50 to-rose-50/20 p-4 sm:p-5 rounded-2xl border border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/15 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 group-hover:text-amber-900 transition-colors">
                <span>Antrean Lokal (Pending)</span>
                <Sparkles className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-amber-600 mt-1 tracking-tight">
                {pendingCount} <span className="text-xs font-sans font-bold text-slate-400">Data</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs group-hover:rotate-6">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-100/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-amber-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              Menunggu transmisi
            </span>
            <span className="font-bold text-amber-700 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Info &amp; Aksi <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Berhasil Tersinkronisasi */}
        <div
          id="card-status-synced"
          onClick={() => handleOpenStatusModal('synced')}
          className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-blue-50/20 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 hover:border-emerald-400 shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/15 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 group-hover:text-emerald-900 transition-colors">
                <span>Berhasil Tersinkronisasi</span>
                <Sparkles className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-emerald-600 mt-1 tracking-tight">
                {syncedCount} <span className="text-xs font-sans font-bold text-slate-400">Data</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs group-hover:rotate-6">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-emerald-100/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Padan DTKS &amp; SP2D
            </span>
            <span className="font-bold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Info &amp; Audit <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Gagal Validasi NIK */}
        <div
          id="card-status-failed"
          onClick={() => handleOpenStatusModal('failed')}
          className="group relative bg-gradient-to-br from-white via-rose-50/50 to-amber-50/20 p-4 sm:p-5 rounded-2xl border border-rose-200/80 hover:border-rose-400 shadow-xs hover:shadow-xl hover:shadow-rose-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full pointer-events-none group-hover:bg-rose-500/15 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 group-hover:text-rose-900 transition-colors">
                <span>Gagal Validasi NIK</span>
                <Sparkles className="w-3 h-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-rose-600 mt-1 tracking-tight">
                {errorCount} <span className="text-xs font-sans font-bold text-slate-400">Data</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-100/70 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all shadow-xs group-hover:rotate-6">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-rose-100/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-rose-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Butuh koreksi Tagana
            </span>
            <span className="font-bold text-rose-700 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Info &amp; Perbaikan <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Local Queue Table */}
      <div className="bg-gradient-to-br from-white via-slate-50/70 to-rose-50/20 rounded-xl border border-rose-200/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-rose-100/80 flex items-center justify-between bg-gradient-to-r from-white via-rose-50/20 to-amber-50/10">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Daftar Antrean Pendataan Lokal
            </span>
          </div>
          <span className="text-[11px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">Total: {queue.length} Item</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
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
                      <span
                        onClick={() => handleOpenStatusModal('pending')}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
                      >
                        <Clock className="w-3 h-3" />
                        <span>Pending Sync</span>
                      </span>
                    )}
                    {item.status === 'Tersinkronisasi' && (
                      <span
                        onClick={() => handleOpenStatusModal('synced')}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Tersinkronisasi</span>
                      </span>
                    )}
                    {item.status === 'Gagal Validasi' && (
                      <span
                        onClick={() => handleOpenStatusModal('failed')}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 cursor-pointer hover:bg-rose-100 transition-colors"
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>Gagal Validasi</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onDeleteEntry(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
      <div className="bg-gradient-to-br from-white via-blue-50/40 to-rose-50/20 rounded-xl border border-blue-200/80 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Panduan Jalur Darurat SMS Gateway (Khusus 0% Sinyal Internet)
            </h3>
          </div>
          <span className="text-[10px] bg-rose-50 text-rose-700 font-mono font-bold px-2.5 py-0.5 rounded-full border border-rose-200">
            Nomor: 99123 (Bebas Pulsa)
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Jika jaringan data 3G/4G lumpuh total, petugas dapat mengirim data warga terdampak melalui SMS format terstandar:
        </p>

        <div className="p-3.5 bg-gradient-to-r from-[#0F172A] via-[#1A0B22] to-[#0B1328] text-slate-200 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto border border-rose-900/40 shadow-inner">
          <span className="text-amber-300 font-bold">SIGAP#NIK#KODE_DESA#JUMLAH_ART#KONDISI</span>
          <button
            onClick={handleCopySms}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-rose-600 to-blue-600 hover:from-rose-500 hover:to-blue-500 text-white rounded-lg text-xs font-sans transition-colors shrink-0 ml-4 cursor-pointer shadow-xs"
          >
            {copiedSMS ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSMS ? 'Tersalin!' : 'Salin Format'}</span>
          </button>
        </div>
      </div>

      {/* Detail Modal for Queue Status */}
      <FieldQueueDetailModal
        statusType={selectedStatusModal}
        isOpen={!!selectedStatusModal}
        onClose={() => setSelectedStatusModal(null)}
        queue={queue}
        onSyncAll={onSyncAll}
        onDeleteEntry={onDeleteEntry}
      />
    </div>
  );
};
