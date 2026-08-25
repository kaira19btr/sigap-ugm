import React, { useState } from 'react';
import { UserRole } from '../types';
import { SigapLogo } from '../components/SigapLogo';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  Building2,
  Landmark,
  ChevronLeft,
  KeyRound,
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (role: UserRole) => void;
  onBackToLanding: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<'daerah' | 'pusat'>('daerah');
  const [email, setEmail] = useState('budi.santoso@dinsos.jabarprov.go.id');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleTabChange = (tab: 'daerah' | 'pusat') => {
    setActiveTab(tab);
    if (tab === 'pusat') {
      setEmail('dr.budi.setiawan@kemensos.go.id');
    } else {
      setEmail('budi.santoso@dinsos.jabarprov.go.id');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'pusat') {
      onLoginSuccess('admin_pusat');
    } else {
      onLoginSuccess('admin_daerah');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>

      {/* Top return button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          id="btn-back-to-landing"
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-3">
            <SigapLogo size="xl" variant="dark" showText={false} interactive={true} />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Masuk ke Portal SIGAP
          </h1>
          <p className="text-xs text-rose-300 font-medium mt-1">
            Sistem Gerak Cepat Perlindungan Sosial Adaptif
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Kementerian Sosial RI & Multi-Agency Disaster Relief
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl mb-6 border border-slate-800">
            <button
              id="tab-login-daerah"
              type="button"
              onClick={() => handleTabChange('daerah')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'daerah'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Dinas Sosial (Daerah)</span>
            </button>
            <button
              id="tab-login-pusat"
              type="button"
              onClick={() => handleTabChange('pusat')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'pusat'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Kementerian (Pusat)</span>
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Alamat Email Kedinasan / NIP
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="nama@instansi.go.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-400">Ingat sesi saya</span>
              </label>
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                onClick={() => alert('Fitur pemulihan kata sandi dapat dihubungi melalui Helpdesk Pusdatin Kemensos.')}
              >
                Lupa kata sandi?
              </button>
            </div>

            <button
              id="btn-submit-login"
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Masuk ke Dashboard SIGAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Simulation Profiles */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 mb-2.5 uppercase tracking-wider text-center">
              Akses Cepat Demo Pengguna
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onLoginSuccess('admin_pusat')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-white text-center transition-colors"
              >
                <div className="font-bold text-blue-400">Pusat</div>
                <div>Kemensos RI</div>
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess('admin_daerah')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-white text-center transition-colors"
              >
                <div className="font-bold text-indigo-400">Daerah</div>
                <div>Dinsos Jabar</div>
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess('petugas_lapangan')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-white text-center transition-colors"
              >
                <div className="font-bold text-emerald-400">Lapangan</div>
                <div>Tagana URC</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="mt-6 text-center text-slate-500 text-[11px] flex items-center justify-center gap-2">
          <KeyRound className="w-3.5 h-3.5 text-slate-400" />
          <span>Tersertifikasi ISO 27001 • Enkripsi TLS 1.3 End-to-End</span>
        </div>
      </div>
    </div>
  );
};
