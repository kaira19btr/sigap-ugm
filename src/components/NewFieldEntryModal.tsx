import React, { useState } from 'react';
import { FieldQueueItem } from '../types';
import {
  X,
  Plus,
  User,
  CreditCard,
  Users,
  MapPin,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface NewFieldEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<FieldQueueItem, 'id' | 'timestamp' | 'status'>) => void;
}

export const NewFieldEntryModal: React.FC<NewFieldEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [familyMembers, setFamilyMembers] = useState(4);
  const [villageCode, setVillageCode] = useState('320101');
  const [condition, setCondition] = useState('RUSAK_BERAT');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nik) return;

    // Mask NIK for display safety
    const maskedNik =
      nik.length >= 8
        ? `${nik.slice(0, 4)}••••••••${nik.slice(-4)}`
        : nik;

    onSubmit({
      name,
      nik: maskedNik,
      familyMembers,
      villageCode,
      condition,
    });

    setName('');
    setNik('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Input Data Warga Terdampak
              </h3>
              <p className="text-xs text-blue-700 font-medium">
                Penyimpanan Otomatis ke Cache Lokal
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap Kepala Keluarga
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Hendra Gunawan"
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Induk Kependudukan (NIK 16 Digit)
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="3201xxxxxxxx0001"
              className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jumlah Anggota Keluarga
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kode Desa / Kelurahan
              </label>
              <input
                type="text"
                value={villageCode}
                onChange={(e) => setVillageCode(e.target.value)}
                className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kondisi Dampak Bencana
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
            >
              <option value="RUSAK_BERAT">Rusak Berat (Rumah Runtuh / Mengungsi)</option>
              <option value="TERDAMPAK_SEDANG">Terdampak Sedang (Perlu Logistik Mendesak)</option>
              <option value="TERDAMPAK_RINGAN">Terdampak Ringan (Kebutuhan Air Bersih)</option>
              <option value="RUSAK_TOTAL">Rusak Total / Hilang</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan ke Antrean</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
