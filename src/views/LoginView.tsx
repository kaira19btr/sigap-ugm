import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { SigapLogo } from '../components/SigapLogo';
import { soundEffects } from '../utils/soundEffects';
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
  Loader2,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
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
  const [email, setEmail] = useState('budi.santoso@dinsos.daerah.go.id');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<number>(0);
  const [targetRole, setTargetRole] = useState<UserRole | null>(null);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  const toggleSound = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundEffects.playClick();
    }
  };

  const handleTabChange = (tab: 'daerah' | 'pusat') => {
    if (isAuthenticating) return;
    soundEffects.playTabSwitch();
    setActiveTab(tab);
    if (tab === 'pusat') {
      setEmail('dr.budi.setiawan@kemensos.go.id');
    } else {
      setEmail('budi.santoso@dinsos.daerah.go.id');
    }
  };

  const triggerLoginSequence = (role: UserRole) => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    setTargetRole(role);
    setAuthStep(1);

    // Audio SFX: High-tech resonance & energy sweep
    soundEffects.playLoginStart();

    // Step 1: Verification of credentials & TLS handshake
    const timer1 = setTimeout(() => {
      setAuthStep(2);
      soundEffects.playTabSwitch();
    }, 450);

    // Step 2: Satu Data Kemensos link
    const timer2 = setTimeout(() => {
      setAuthStep(3);
      soundEffects.playRoleSelect();
    }, 850);

    // Step 3: Success fanfare chime & redirect
    const timer3 = setTimeout(() => {
      soundEffects.playSuccessChime();
      setTimeout(() => {
        onLoginSuccess(role);
      }, 250);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticating) return;
    const role: UserRole = activeTab === 'pusat' ? 'admin_pusat' : 'admin_daerah';
    triggerLoginSequence(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C16] via-[#1C0A22] to-[#0A1429] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic atmospheric gradient orbs matching SIGAP logo */}
      <div className="absolute -top-28 -left-28 w-[420px] h-[420px] bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-[450px] h-[450px] bg-sky-600/15 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Background radial highlight & Dynamic Burst on Auth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.12),rgba(255,255,255,0))]"></div>
      {isAuthenticating && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_25%,rgba(225,29,72,0.25),rgba(245,158,11,0.18),transparent_70%)] animate-pulse pointer-events-none transition-all duration-700"></div>
      )}

      {/* Top action controls: return & sound toggle */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <button
          id="btn-back-to-landing"
          disabled={isAuthenticating}
          onClick={() => {
            soundEffects.playClick();
            onBackToLanding();
          }}
          className="pointer-events-auto flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-rose-950/60 hover:border-rose-700/60 transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronLeft className="w-4 h-4 text-rose-400" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          id="btn-toggle-sound"
          type="button"
          onClick={toggleSound}
          title={isMuted ? 'Aktifkan Efek Suara' : 'Bisukan Efek Suara'}
          className={`pointer-events-auto flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all hover:scale-105 active:scale-95 shadow-md backdrop-blur-md ${
            isMuted
              ? 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/80 shadow-emerald-500/10'
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Suara: Mati</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Efek Suara: Aktif</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header with Animated Logo */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="relative mb-3.5 flex flex-col items-center">
            {/* Ambient Backlight Glow during Authentication */}
            {isAuthenticating && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-rose-500/40 via-amber-500/40 to-blue-500/40 rounded-full blur-xl animate-pulse pointer-events-none"></div>
            )}

            <SigapLogo
              size="xl"
              variant="dark"
              showText={false}
              interactive={!isAuthenticating}
              isAuthenticating={isAuthenticating}
            />

            {/* Authentication Realtime Status HUD */}
            {isAuthenticating && (
              <div className="mt-3 px-3 py-1.5 rounded-full bg-slate-950/90 border border-amber-500/40 shadow-lg shadow-amber-500/10 flex items-center gap-2 animate-bounce">
                {authStep < 3 ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="text-[11px] font-semibold text-slate-200">
                  {authStep === 1 && 'Memverifikasi Kredensial NIP...'}
                  {authStep === 2 && 'Sinkronisasi Kunci Enkripsi TLS 1.3...'}
                  {authStep === 3 && 'Kredensial Sah! Membuka Portal SIGAP...'}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {isAuthenticating ? (
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Memproses Masuk...
              </span>
            ) : (
              <>
                Masuk ke Portal{' '}
                <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-amber-200 bg-clip-text text-transparent font-black tracking-wider">
                  SIGAP
                </span>
              </>
            )}
          </h1>
          <p className="text-xs text-rose-300 font-medium mt-1">
            Sistem Gerak Cepat Perlindungan Sosial Adaptif
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Kementerian Sosial RI & Multi-Agency Disaster Relief
          </p>
        </div>

        {/* Login Card */}
        <div className={`bg-slate-950/80 backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 transition-all duration-300 relative overflow-hidden ${
          isAuthenticating ? 'border-amber-500/50 ring-2 ring-amber-500/30' : 'border-rose-950/50'
        }`}>
          {/* Top Decorative Card Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-sky-400" />

          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-slate-900/90 rounded-xl mb-6 border border-rose-950/40">
            <button
              id="tab-login-daerah"
              type="button"
              disabled={isAuthenticating}
              onClick={() => handleTabChange('daerah')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'daerah'
                  ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              } disabled:opacity-60`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Dinas Sosial (Daerah)</span>
            </button>
            <button
              id="tab-login-pusat"
              type="button"
              disabled={isAuthenticating}
              onClick={() => handleTabChange('pusat')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'pusat'
                  ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              } disabled:opacity-60`}
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
                <Mail className="w-4 h-4 text-rose-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-login-email"
                  type="email"
                  required
                  disabled={isAuthenticating}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all disabled:opacity-60 shadow-inner"
                  placeholder="nama@instansi.go.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-rose-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-login-password"
                  type="password"
                  required
                  disabled={isAuthenticating}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all disabled:opacity-60 shadow-inner"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={isAuthenticating}
                  checked={rememberMe}
                  onChange={(e) => {
                    soundEffects.playClick();
                    setRememberMe(e.target.checked);
                  }}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-rose-600 focus:ring-rose-500 disabled:opacity-60"
                />
                <span className="text-slate-400">Ingat sesi saya</span>
              </label>
              <button
                type="button"
                disabled={isAuthenticating}
                className="text-rose-400 hover:text-rose-300 transition-colors disabled:opacity-60"
                onClick={() => {
                  soundEffects.playClick();
                  alert('Fitur pemulihan kata sandi dapat dihubungi melalui Helpdesk Pusdatin Kemensos.');
                }}
              >
                Lupa kata sandi?
              </button>
            </div>

            <button
              id="btn-submit-login"
              type="submit"
              disabled={isAuthenticating}
              className={`w-full py-3 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 relative overflow-hidden ${
                isAuthenticating
                  ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-blue-600 shadow-rose-600/30'
                  : 'bg-gradient-to-r from-rose-600 via-rose-500 to-blue-600 hover:from-rose-500 hover:to-blue-500 shadow-lg shadow-rose-950/50 hover:scale-[1.01] active:scale-[0.99] border border-rose-400/20'
              }`}
            >
              {isAuthenticating && (
                <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none"></div>
              )}
              {isAuthenticating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Mengotentikasi Sesi SIGAP...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard SIGAP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Simulation Profiles */}
          <div className="mt-6 pt-5 border-t border-rose-950/40">
            <p className="text-[11px] font-semibold text-rose-300/80 mb-2.5 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-rose-500" />
              <span>Akses Cepat Demo Pengguna</span>
              <span className="w-1 h-1 rounded-full bg-sky-500" />
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerLoginSequence('admin_pusat')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-rose-950/60 hover:border-rose-500/50 text-[10px] font-medium text-slate-300 hover:text-white text-center transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-xs"
              >
                <div className="font-bold text-rose-400">Pusat</div>
                <div>Kemensos RI</div>
              </button>
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerLoginSequence('admin_daerah')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-blue-950/60 hover:border-blue-500/50 text-[10px] font-medium text-slate-300 hover:text-white text-center transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-xs"
              >
                <div className="font-bold text-sky-400">Daerah</div>
                <div>Dinas Daerah</div>
              </button>
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerLoginSequence('petugas_lapangan')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-emerald-950/60 hover:border-emerald-500/50 text-[10px] font-medium text-slate-300 hover:text-white text-center transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-xs"
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

