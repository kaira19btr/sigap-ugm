import React, { useState } from 'react';
import { SystemUser } from '../types';
import { Avatar } from '../components/Avatar';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  CheckCircle2,
  Lock,
  KeyRound,
  RotateCcw,
  Check,
} from 'lucide-react';

interface ManajemenPenggunaViewProps {
  users: SystemUser[];
  onAddUser: (user: Omit<SystemUser, 'id'>) => void;
  onToggleUserStatus: (id: string) => void;
}

export const ManajemenPenggunaView: React.FC<ManajemenPenggunaViewProps> = ({
  users,
  onAddUser,
  onToggleUserStatus,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Admin Daerah');
  const [agency, setAgency] = useState('Dinas Sosial Daerah');
  const [region, setRegion] = useState('Wilayah Daerah');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddUser({
      name,
      role,
      agency,
      region,
      isActive: true,
    });

    setName('');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [resetNotification, setResetNotification] = useState<string | null>(null);

  const handleResetPassword = (userName: string) => {
    setResetNotification(`Tautan reset kata sandi berhasil dikirim ke email kedinasan ${userName}.`);
    setTimeout(() => {
      setResetNotification(null);
    }, 4000);
  };

  return (
    <div id="manajemen-pengguna-module" className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
          <span>Modul 08 • Tata Kelola Akun Aparatur</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Manajemen Pengguna &amp; Hak Akses
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pengaturan akun aparatur dinas sosial dan relawan lapangan berbasis peran (Role-Based Access Control)
        </p>
      </div>

      {resetNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{resetNotification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Tambah Pengguna */}
        <div className="lg:col-span-4 bg-gradient-to-br from-white via-slate-50/70 to-rose-50/20 rounded-xl border border-rose-200/70 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
            <UserPlus className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Tambah Pengguna Baru
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap &amp; Gelar
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Ratna Juwita, S.Sos"
                className="w-full p-2.5 text-xs bg-white/90 border border-rose-200/70 rounded-xl focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Peran Akses (RBAC)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 text-xs bg-white/90 border border-rose-200/70 rounded-xl focus:ring-2 focus:ring-rose-500 text-slate-800 font-semibold shadow-2xs"
              >
                <option value="Admin Pusat (Kemensos)">Admin Pusat (Kemensos)</option>
                <option value="Admin Daerah (Dinsos)">Admin Daerah (Dinsos)</option>
                <option value="Petugas Verifikasi (Posko)">Petugas Verifikasi (Posko)</option>
                <option value="Relawan Tagana Lapangan">Relawan Tagana Lapangan</option>
                <option value="Auditor BPKP / Inspektorat">Auditor BPKP / Inspektorat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instansi / Lembaga
              </label>
              <input
                type="text"
                required
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                placeholder="Contoh: Dinsos Kab. Cianjur"
                className="w-full p-2.5 text-xs bg-white/90 border border-rose-200/70 rounded-xl focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Wilayah Tugas Operasional
              </label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Jawa Barat / Kab. Cianjur"
                className="w-full p-2.5 text-xs bg-white/90 border border-rose-200/70 rounded-xl focus:ring-2 focus:ring-rose-500 text-slate-800 shadow-2xs"
              />
            </div>

            <button
              id="btn-create-user"
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-blue-600 hover:from-rose-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Buat Akun Aparatur</span>
            </button>
          </form>
        </div>

        {/* Right Table: List of Users */}
        <div className="lg:col-span-8 bg-gradient-to-br from-white via-blue-50/30 to-rose-50/20 rounded-xl border border-blue-200/70 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-blue-100 flex items-center justify-between gap-3 bg-white/60">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari aparatur, peran, atau instansi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-blue-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 shadow-2xs"
              />
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-medium">
              {filteredUsers.length} Akun Terdaftar
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/70 border-b border-blue-100 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nama Aparatur</th>
                  <th className="py-3 px-4">Peran Akses</th>
                  <th className="py-3 px-4">Instansi &amp; Wilayah</th>
                  <th className="py-3 px-4 text-center">Status Akses</th>
                  <th className="py-3 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50/60 bg-white/40">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/90 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={user.name} size="xs" />
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 block">{user.agency}</span>
                      <span className="text-[10px] text-slate-400">{user.region}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onToggleUserStatus(user.id)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                          user.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        ></span>
                        <span>{user.isActive ? 'Aktif' : 'Dinonaktifkan'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleResetPassword(user.name)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200 hover:border-rose-300 cursor-pointer"
                        title="Kirim tautan reset kata sandi"
                      >
                        Reset Sandi
                      </button>
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
