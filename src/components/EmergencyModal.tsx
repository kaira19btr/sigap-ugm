import React, { useState } from 'react';
import { RegionRiskData } from '../types';
import {
  AlertTriangle,
  X,
  CheckCircle2,
  Send,
  ShieldAlert,
  ArrowRight,
  Package,
  Users,
  Radio,
  FileCheck,
} from 'lucide-react';

interface EmergencyModalProps {
  region: RegionRiskData | null;
  isOpen: boolean;
  onClose: () => void;
  onDispatchAction: (details: { packageType: string; recipientQuota: number; notes: string }) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  region,
  isOpen,
  onClose,
  onDispatchAction,
}) => {
  const [packageType, setPackageType] = useState('Bantuan Tunai Langsung Adaptif (BLT-A)');
  const [recipientQuota, setRecipientQuota] = useState(region?.affectedPopulation || 12000);
  const [notes, setNotes] = useState('Diusulkan aktivasi tanggap darurat tahap I berdasarkan telemetri sensor anomali iklim dan harga.');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !region) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onDispatchAction({ packageType, recipientQuota, notes });
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="modal-emergency-action"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-rose-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Protokol Tindakan Darurat
              </h3>
              <p className="text-xs text-rose-700 font-medium">
                {region.name} • {region.regency}
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

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Usulan Tindakan Diteruskan!</h4>
            <p className="text-xs text-slate-500">
              Notifikasi telah dikirimkan ke Antrean Persetujuan Kemensos & Posko Tagana Daerah.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Quick Status Pill */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Pemicu Status</span>
                <span className="font-bold text-slate-900">{region.crisisType}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-medium block">Indeks Kerentanan</span>
                <span className="font-mono font-bold text-rose-600">
                  {region.vulnerabilityIndex} / 10.0
                </span>
              </div>
            </div>

            {/* Package Choice */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Paket Respons Adaptif yang Direkomendasikan
              </label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              >
                <option value="Bantuan Tunai Langsung Adaptif (BLT-A)">
                  Bantuan Tunai Langsung Adaptif (BLT-A) - Rp 600.000 / KK
                </option>
                <option value="Bantuan Cadangan Beras Pemerintah (CBP) Darurat">
                  Bantuan Cadangan Beras Pemerintah (CBP) Darurat - 20 Kg / KK
                </option>
                <option value="Paket Logistik Pengungsian, Tenda & Dapur Umum">
                  Paket Logistik Pengungsian, Tenda & Dapur Umum
                </option>
                <option value="Bantuan Sanitasi & Air Bersih Tanggap Kekeringan">
                  Bantuan Sanitasi & Air Bersih Tanggap Kekeringan
                </option>
              </select>
            </div>

            {/* Quota Target */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Kuota KK / Jiwa Penerima
              </label>
              <input
                type="number"
                value={recipientQuota}
                onChange={(e) => setRecipientQuota(Number(e.target.value))}
                className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Catatan Verifikator Lapangan / Tim Reaksi Cepat
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Usulan Tindakan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
