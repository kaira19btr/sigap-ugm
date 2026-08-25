import React, { useState } from 'react';
import { SatuDataItem } from '../types';
import {
  AlertTriangle,
  X,
  CheckCircle2,
  GitCompare,
  Database,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DataConflictModalProps {
  item: SatuDataItem | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (resolvedItem: SatuDataItem) => void;
}

export const DataConflictModal: React.FC<DataConflictModalProps> = ({
  item,
  isOpen,
  onClose,
  onResolve,
}) => {
  const [selectedSource, setSelectedSource] = useState<'dtks' | 'regsosek' | 'merged'>('merged');
  const [isResolved, setIsResolved] = useState(false);

  if (!isOpen || !item) return null;

  const handleApplyResolution = () => {
    setIsResolved(true);
    setTimeout(() => {
      onResolve({
        ...item,
        status: 'Selesai',
        completeness: 94.5,
        sources: ['DTKS', 'Regsosek', 'Rekonsiliasi-NIK'],
      });
      setIsResolved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Penyelesaian Konflik Data NIK
              </h3>
              <p className="text-xs text-amber-800 font-medium">
                {item.village} • {item.regency}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isResolved ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Konflik Data Berhasil Diurai!</h4>
            <p className="text-xs text-slate-500">
              Data terverifikasi telah disinkronkan ke basis data Satu Data DTKS & Regsosek.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
              <strong>Anomali Terdeteksi:</strong> Ditemukan selisih 170 NIK kepala keluarga antara data DTKS (2.950 KK) dan hasil pendataan Regsosek BPS (3.120 KK).
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1 */}
              <div
                onClick={() => setSelectedSource('dtks')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedSource === 'dtks'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Sumber: DTKS Kemensos</span>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">
                    2.950 KK
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Basis data penerima bansos PKH/BPNT terdaftar reguler.
                </p>
              </div>

              {/* Option 2 */}
              <div
                onClick={() => setSelectedSource('regsosek')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedSource === 'regsosek'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Sumber: Regsosek BPS</span>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                    3.120 KK
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Hasil sensus ekonomi sosial lapangan terbaru termasuk desil 1-3.
                </p>
              </div>
            </div>

            {/* Recommended Action: Deduplication Merge */}
            <div
              onClick={() => setSelectedSource('merged')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedSource === 'merged'
                  ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">
                  Rekomendasi SIGAP: Rekonsiliasi Master NIK Terpadu (3.045 KK)
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Menggabungkan data dengan validasi Dukcapil online dan mengeliminasi 75 data duplikat/pindah domisili.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApplyResolution}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Terapkan Rekonsiliasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
