import React, { useState } from 'react';
import { GrievanceItem } from '../types';
import {
  MessageSquareWarning,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Check,
  User,
  Phone,
  Building,
  Sparkles,
} from 'lucide-react';

interface PengaduanViewProps {
  grievances: GrievanceItem[];
  onAddGrievance: (g: Omit<GrievanceItem, 'id' | 'timestamp' | 'status'>) => void;
  onUpdateStatus: (id: string, status: 'Baru' | 'Diproses' | 'Selesai') => void;
}

export const PengaduanView: React.FC<PengaduanViewProps> = ({
  grievances,
  onAddGrievance,
  onUpdateStatus,
}) => {
  const [category, setCategory] = useState('Bantuan Tidak Tepat Sasaran');
  const [village, setVillage] = useState('Ds. Sukamaju');
  const [senderPhone, setSenderPhone] = useState('+62 812-3344-5566');
  const [summary, setSummary] = useState('');
  const [selectedItem, setSelectedItem] = useState<GrievanceItem | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    onAddGrievance({
      category,
      village,
      summary,
      senderPhone,
    });

    setSummary('');
  };

  const newCount = grievances.filter((g) => g.status === 'Baru').length;
  const inProgressCount = grievances.filter((g) => g.status === 'Diproses').length;
  const resolvedCount = grievances.filter((g) => g.status === 'Selesai').length;

  return (
    <div id="pengaduan-module" className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
          <span>Modul 06 • Aspirasi & Saluran Keluhan Warga</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Bot Pengaduan & Aspirasi Warga
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Kanal komunikasi dua arah penerima manfaat untuk transparansi dan mitigasi kecurangan
        </p>
      </div>

      {/* 3 Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Tiket Pengaduan Baru</span>
            <div className="text-2xl font-bold font-mono text-rose-600 mt-1">{newCount} Tiket</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Sedang Ditindaklanjuti</span>
            <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{inProgressCount} Tiket</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Terselesaikan (Klir)</span>
            <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">{resolvedCount} Tiket</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Create / Simulator Form */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MessageSquareWarning className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Kirim Aduan Lapangan (Simulasi Bot)
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Laporan
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800 font-medium"
              >
                <option value="Bantuan Tidak Tepat Sasaran">Bantuan Tidak Tepat Sasaran</option>
                <option value="Pungutan Liar / Pemotongan Bantuan">Pungutan Liar / Pemotongan Bantuan</option>
                <option value="Keterlambatan Penyaluran">Keterlambatan Penyaluran</option>
                <option value="Infrastruktur Rusak / Akses Tertutup">Infrastruktur Rusak / Akses Tertutup</option>
                <option value="Data Ganda / Duplikasi NIK">Data Ganda / Duplikasi NIK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lokasi Desa / Kelurahan
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Contoh: Ds. Sukamaju, Kec. Cugenang"
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Kontak Pelapor (WhatsApp)
              </label>
              <input
                type="text"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rincian Keluhan / Kronologi
              </label>
              <textarea
                rows={4}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Jelaskan kendala, lokasi RT/RW, dan nama oknum bila ada pemotongan bantuan..."
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 text-slate-800"
              />
            </div>

            <button
              id="btn-submit-grievance"
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pengaduan ke Sistem</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Daftar Pengaduan Masuk Real-Time
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {grievances.length} Tiket Terdaftar
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tiket & Waktu</th>
                  <th className="py-3 px-4">Kategori & Lokasi</th>
                  <th className="py-3 px-4">Rincian Ringkas</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grievances.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{g.id}</span>
                      <span className="text-[10px] text-slate-400">{g.timestamp}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{g.category}</span>
                      <span className="text-[11px] text-slate-500">{g.village}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-slate-600 line-clamp-2 text-[11px]">{g.summary}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      {g.status === 'Baru' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          Baru
                        </span>
                      )}
                      {g.status === 'Diproses' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Diproses
                        </span>
                      )}
                      {g.status === 'Selesai' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Selesai
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {g.status !== 'Selesai' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          {g.status === 'Baru' && (
                            <button
                              onClick={() => onUpdateStatus(g.id, 'Diproses')}
                              className="px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                            >
                              Proses
                            </button>
                          )}
                          <button
                            onClick={() => onUpdateStatus(g.id, 'Selesai')}
                            className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                          >
                            Selesaikan
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
