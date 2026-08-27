import React, { useState } from 'react';
import { GrievanceItem } from '../types';
import {
  X,
  MessageSquareWarning,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building,
  ArrowRight,
  Send,
  Printer,
  Copy,
  Check,
  FileText,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  History,
  Sparkles,
  Share2,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface GrievanceDetailModalProps {
  item: GrievanceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'Baru' | 'Diproses' | 'Selesai') => void;
}

export const GrievanceDetailModal: React.FC<GrievanceDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen || !item) return null;

  const [officerNote, setOfficerNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([
    'Verifikasi koordinat lapangan dengan Posko Dinsos & Tagana setempat.',
    'Data pelapor telah dicocokkan dengan basis data Satu Data DTKS Kemensos.',
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerNote.trim()) return;
    soundEffects.playClick();
    setSavedNotes((prev) => [...prev, officerNote.trim()]);
    setOfficerNote('');
  };

  const handleCopySummary = () => {
    soundEffects.playClick();
    const text = `[LAPORAN SIGAP ${item.id}]\nKategori: ${item.category}\nLokasi: ${item.village}\nWaktu: ${item.timestamp}\nStatus: ${item.status}\nPelapor: ${item.senderPhone || '-'}\nRingkasan: ${item.summary}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    soundEffects.playClick();
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  // Determine priority/urgency based on category
  const isHighPriority =
    item.category.includes('Pungutan Liar') ||
    item.category.includes('Tidak Tepat Sasaran') ||
    item.category.includes('Infrastruktur Rusak');

  const cleanPhone = item.senderPhone?.replace(/[^0-9]/g, '') || '';
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=Halo%20kami%20dari%20Tim%20SIGAP%20Kemensos%20terkait%20Laporan%20${encodeURIComponent(item.id)}` : '#';

  return (
    <div
      id="modal-grievance-detail"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                item.status === 'Baru'
                  ? 'bg-rose-100 text-rose-700'
                  : item.status === 'Diproses'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-slate-900">
                  Laporan Whistleblowing {item.id}
                </h3>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    item.status === 'Baru'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : item.status === 'Diproses'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  Status: {item.status}
                </span>
                {isHighPriority && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Prioritas Tinggi
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Diterima via Kanal Whistleblowing Terpadu SIGAP • {item.timestamp}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopySummary}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              title="Salin Ringkasan Laporan"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              title="Cetak Berita Acara Disposisi"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-700 text-xs">
          {/* Main Info Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Kategori Laporan
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">{item.category}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Lokasi Desa / Posko
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{item.village}</span>
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Kontak Pelapor
              </span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs font-mono font-bold text-slate-900">
                  {item.senderPhone || '+62 812-XXXX-XXXX'}
                </p>
                {item.senderPhone && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-emerald-600 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>WA</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Chronological Narrative */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide">
              <FileText className="w-4 h-4" />
              <span>Rincian &amp; Kronologi Keluhan Warga</span>
            </div>
            <p className="text-slate-800 text-xs leading-relaxed font-medium bg-white p-3 rounded-lg border border-rose-200/60 shadow-2xs">
              &quot;{item.summary}&quot;
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Sumber Saluran: <strong>Kanal Whistleblowing SIGAP Kemensos &amp; SP4N-LAPOR!</strong></span>
              <span className="font-mono text-[10px] text-slate-400">Verifikasi Enkripsi PDP UU 27/2022</span>
            </div>
          </div>

          {/* Satu Data Cross-Check Card */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Interoperabilitas Satu Data DTKS &amp; Regsosek</span>
              </span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                Terverifikasi Otomatis
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Status DTKS</span>
                <span className="font-bold text-slate-800">Terdaftar Aktif</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Desil Kesejahteraan</span>
                <span className="font-bold text-slate-800">Desil 1 (Sangat Rentan)</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Penyaluran Terakhir</span>
                <span className="font-bold text-emerald-700">Tahap II (Himbara)</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Kecocokan NIK Dukcapil</span>
                <span className="font-bold text-emerald-700">100% Padan</span>
              </div>
            </div>
          </div>

          {/* Workflow & Audit Progress */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <History className="w-4 h-4 text-blue-600" />
              <span>Alur Tindak Lanjut &amp; Audit Trail (SLA Respons &lt; 48 Jam)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. Penerimaan Bot</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Laporan tercatat otomatis di server pusat dan diberi tag kategori via AI NLP.
                </p>
              </div>

              <div
                className={`p-3 rounded-xl border space-y-1 ${
                  item.status === 'Diproses' || item.status === 'Selesai'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  {item.status === 'Diproses' || item.status === 'Selesai' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                  <span>2. Investigasi Lapangan</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Disposisi ke Tim Tagana / Dinsos wilayah untuk verifikasi faktual posko.
                </p>
              </div>

              <div
                className={`p-3 rounded-xl border space-y-1 ${
                  item.status === 'Selesai'
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  {item.status === 'Selesai' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                  <span>3. Penyelesaian &amp; Berita Acara</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Koreksi data atau penambahan logistik telah dipenuhi dan disetujui.
                </p>
              </div>
            </div>
          </div>

          {/* Officer Action & Notes Log */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Catatan Verifikasi Petugas</span>
            </h4>
            <div className="space-y-1.5">
              {savedNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-[11px] text-slate-700"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
              <input
                type="text"
                value={officerNote}
                onChange={(e) => setOfficerNote(e.target.value)}
                placeholder="Tambahkan catatan tindak lanjut..."
                className="flex-1 p-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Simpan</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 flex-wrap gap-2">
          <div className="text-[11px] text-slate-500">
            Ubah Status Laporan:
          </div>

          <div className="flex items-center gap-2">
            {item.status !== 'Baru' && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onUpdateStatus(item.id, 'Baru');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 transition-colors"
              >
                Tandai Baru
              </button>
            )}

            {item.status !== 'Diproses' && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onUpdateStatus(item.id, 'Diproses');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 transition-colors"
              >
                Sedang Ditindaklanjuti
              </button>
            )}

            {item.status !== 'Selesai' && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playSuccessChime();
                  onUpdateStatus(item.id, 'Selesai');
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Selesaikan Laporan</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
