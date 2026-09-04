import React, { useState } from 'react';
import { UserRole } from '../types';
import { SigapLogo } from '../components/SigapLogo';
import { TechnicalArchitectureModal } from '../components/TechnicalArchitectureModal';
import { ResilienceJourneyTracker } from '../components/ResilienceJourneyTracker';
import { soundEffects } from '../utils/soundEffects';
import { SmokeyBackground, LoginForm } from '@/components/ui/login-form';
import { GradientButton } from '@/components/ui/gradient-button';
import {
  Shield,
  Radio,
  Database,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Lock,
  Wifi,
  Activity,
  Layers,
  FileSpreadsheet,
  Globe,
  Award,
  Sparkles,
  Workflow,
  Users,
  Building2,
  Clock,
  TrendingUp,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkle,
  Radar,
  AlertTriangle,
  ChevronRight,
  LogIn,
} from 'lucide-react';

interface LandingViewProps {
  onLoginClick: () => void;
  onEnterDashboard: (role?: UserRole) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onLoginClick,
  onEnterDashboard,
}) => {
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(soundEffects.getMuted());
  const [showFullscreenDemo, setShowFullscreenDemo] = useState<boolean>(false);
  const cobaltShaderColor = '#1D4ED8'; // Tema Warna Cobalt SIGAP

  // Full-screen interactive demo mode matching demo.tsx
  if (showFullscreenDemo) {
    return (
      <main className="relative w-screen h-screen bg-slate-950 overflow-hidden text-slate-100 flex flex-col justify-between">
        {/* Interactive WebGL Shader in SIGAP Cobalt */}
        <SmokeyBackground className="absolute inset-0" color={cobaltShaderColor} backdropBlurAmount="md" />

        {/* Top Control Bar */}
        <header className="relative z-20 px-6 py-4 flex items-center justify-between bg-slate-950/60 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center gap-3">
            <SigapLogo size="sm" variant="dark" showText={true} />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-600/30 text-sky-300 border border-blue-500/40">
              Interactive Cobalt Shader Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GradientButton
              size="sm"
              variant="variant"
              onClick={() => {
                soundEffects.playClick();
                setShowFullscreenDemo(false);
              }}
              className="!min-w-[120px] !text-xs !py-1.5 !px-3"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              <span>Kembali ke Beranda</span>
            </GradientButton>
          </div>
        </header>

        {/* Centered Glassmorphic Login Form */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          <LoginForm
            title="Portal SIGAP"
            subtitle="Sistem Gerak Cepat Perlindungan Sosial Adaptif"
            onLogin={(email, role) => {
              soundEffects.playSuccessChime();
              onEnterDashboard();
            }}
          />
        </div>

        {/* Bottom Hint */}
        <footer className="relative z-20 py-3 text-center text-xs text-slate-400 bg-slate-950/60 backdrop-blur-md border-t border-white/5 flex items-center justify-center gap-2">
          <Sparkle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Gerakkan kursor pada layar untuk melihat distorsi gelombang shader WebGL interaktif</span>
        </footer>
      </main>
    );
  }

  return (
    <div id="landing-page-container" className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-rose-100">
      {/* Top Navigation */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <SigapLogo size="md" variant="light" showBadge={true} />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#fitur" className="hover:text-rose-600 transition-colors">Fitur Utama</a>
            <a href="#agregat-data" className="hover:text-rose-600 transition-colors">Data Agregat</a>
            <a href="#alur-kerja" className="hover:text-rose-600 transition-colors">Alur Kerja</a>
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Workflow className="w-3.5 h-3.5 text-rose-600" />
              <span>Arsitektur Sistem</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Fullscreen Demo Mode Trigger */}
            <GradientButton
              id="btn-fullscreen-demo"
              size="sm"
              variant="variant"
              onClick={() => {
                soundEffects.playClick();
                setShowFullscreenDemo(true);
              }}
              className="hidden lg:inline-flex !text-xs !py-2 !px-3.5 text-slate-100"
              title="Tampilkan demo login-form layar penuh dengan WebGL smokey shader"
            >
              <Maximize2 className="w-3.5 h-3.5 mr-1 text-rose-400" />
              <span>Demo Shader Layar Penuh</span>
            </GradientButton>

            {/* Sound FX Toggle Button */}
            <button
              id="btn-landing-sound-toggle"
              onClick={() => {
                const nextMuted = soundEffects.toggleMute();
                setIsSoundMuted(nextMuted);
              }}
              className={`p-2 rounded-lg transition-colors border cursor-pointer ${
                isSoundMuted
                  ? 'text-slate-400 hover:text-slate-700 bg-slate-50 border-slate-200'
                  : 'text-rose-600 hover:text-rose-700 bg-rose-50/70 border-rose-200'
              }`}
              title={isSoundMuted ? 'Efek Suara: Bisu (Klik untuk aktifkan)' : 'Efek Suara: Aktif (Klik untuk matikan)'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <GradientButton
              id="btn-landing-login"
              size="sm"
              variant="cobalt"
              onClick={onLoginClick}
              className="!text-xs !py-2 !px-4"
            >
              <span>Masuk Akun</span>
            </GradientButton>
            <GradientButton
              id="btn-landing-enter-dashboard"
              size="sm"
              variant="rose"
              onClick={onEnterDashboard}
              className="!text-xs !py-2 !px-4 shadow-md shadow-rose-600/20"
            >
              <span>Akses Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </GradientButton>
          </div>
        </div>
      </header>

      {/* Hero Section with Interactive WebGL Smokey Shader Background */}
      <section className="relative pt-12 pb-20 px-6 bg-gradient-to-b from-[#080C16] via-[#100A1C] to-[#0A1429] text-white overflow-hidden">
        {/* Interactive WebGL Shader Layer in SIGAP Palette */}
        <SmokeyBackground
          className="absolute inset-0 opacity-80"
          color={cobaltShaderColor}
          backdropBlurAmount="sm"
        />

        {/* Ambient atmospheric backlights */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Badge, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sky-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>Platform Siaga Bencana &amp; Perlindungan Adaptif Indonesia</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12]">
                Sistem Gerak Cepat{' '}
                <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-amber-100 bg-clip-text text-transparent">
                  Perlindungan Sosial
                </span>{' '}
                Adaptif
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Respons darurat berbasis telemetri BMKG/PVMBG, penilaian risiko 8 indikator analitis (Skala 120 Poin), dan penyaluran bantuan adaptif geospasial real-time &lt; 5 hari saat krisis dan bencana.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <GradientButton
                  id="btn-hero-primary-dashboard"
                  size="lg"
                  variant="rose"
                  onClick={onEnterDashboard}
                  className="shadow-xl shadow-rose-900/40"
                >
                  <span>Buka Dasbor Siaga</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </GradientButton>
                <GradientButton
                  id="btn-hero-architecture"
                  size="lg"
                  variant="cobalt"
                  onClick={() => setIsArchitectureModalOpen(true)}
                >
                  <Workflow className="w-4 h-4 mr-1.5 text-sky-300" />
                  <span>Diagram Arsitektur</span>
                </GradientButton>
                <GradientButton
                  id="btn-hero-fullscreen-trigger"
                  size="lg"
                  variant="variant"
                  onClick={() => {
                    soundEffects.playClick();
                    setShowFullscreenDemo(true);
                  }}
                >
                  <Maximize2 className="w-4 h-4 mr-1.5 text-rose-300" />
                  <span>Mode Demo Shader</span>
                </GradientButton>
              </div>

              {/* Quick Metrics Bar in Dark Contrast */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 max-w-2xl">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">4.2 Hari</div>
                  <div className="text-[11px] text-slate-300 font-medium">SLA Penyaluran</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">94.8%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Akurasi DTKS/DTSEN</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-black text-blue-400 font-mono">120 Poin</div>
                  <div className="text-[11px] text-slate-300 font-medium">Matriks 8 Indikator</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">Offline-1st</div>
                  <div className="text-[11px] text-slate-300 font-medium">PWA Tagana URC</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Command Center & Beranda Showcase Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Subtle ambient glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-rose-500/20 rounded-3xl blur-2xl pointer-events-none"></div>
              
              <div className="w-full max-w-md bg-slate-950/85 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative z-10 space-y-4 text-left">
                {/* Card Top Header & Status */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-sky-300">
                      <Radar className="w-5 h-5 animate-spin text-sky-400" style={{ animationDuration: '6s' }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white tracking-wide flex items-center gap-1.5">
                        <span>Pusat Kendali SIGAP</span>
                        <span className="text-[9px] bg-rose-500/30 text-rose-300 font-mono font-bold px-1.5 py-0.5 rounded border border-rose-500/40">
                          LIVE
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Portal Terpadu SPBE Perlindungan Sosial Adaptif
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>24/7 Terkoneksi</span>
                  </div>
                </div>

                {/* 3-Pillar Real-Time Status Overview */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Status 3 Pilar Ketahanan (Real-Time):
                  </span>

                  {/* SHIELD */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 shrink-0">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>SHIELD</span>
                          <span className="text-[9px] font-mono text-blue-300 font-normal">Early Warning &amp; Trigger</span>
                        </div>
                        <div className="text-[10px] text-slate-400">BMKG/PVMBG • 3 Hotspot Darurat</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                      Siaga Aktif
                    </span>
                  </div>

                  {/* CONVERGE */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-indigo-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 shrink-0">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>CONVERGE</span>
                          <span className="text-[9px] font-mono text-indigo-300 font-normal">Poverty Map &amp; Supply</span>
                        </div>
                        <div className="text-[10px] text-slate-400">15.240 KPM Terpetakan • Lintas K/L</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-sky-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                      Interoperable
                    </span>
                  </div>

                  {/* RISE */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>RISE</span>
                          <span className="text-[9px] font-mono text-emerald-300 font-normal">Inclusion &amp; Graduation</span>
                        </div>
                        <div className="text-[10px] text-slate-400">3.420 Keluarga Mandiri • Kurasi Modal</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Graduasi Aktif
                    </span>
                  </div>
                </div>

                {/* Primary Enter Action Button */}
                <div className="pt-1">
                  <GradientButton
                    id="btn-hero-enter-now"
                    size="lg"
                    variant="rose"
                    onClick={() => {
                      soundEffects.playSuccessChime();
                      onEnterDashboard();
                    }}
                    className="w-full !py-3 shadow-lg shadow-rose-900/50 flex items-center justify-center"
                  >
                    <span className="font-extrabold text-sm">Masuk ke Dasbor Siaga Bencana</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </GradientButton>
                </div>

                {/* Quick 1-Click Role Direct Access */}
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/10 text-center space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Pilih Peran Demo untuk Langsung Masuk:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <GradientButton
                      size="sm"
                      variant="rose"
                      onClick={() => {
                        soundEffects.playClick();
                        onEnterDashboard('admin_pusat');
                      }}
                      className="!min-w-0 !w-full !py-1.5 !px-1 text-[10px] leading-tight"
                      title="Masuk sebagai Administrator Pusat Kemensos"
                    >
                      Pusat Kemensos
                    </GradientButton>
                    <GradientButton
                      size="sm"
                      variant="cobalt"
                      onClick={() => {
                        soundEffects.playClick();
                        onEnterDashboard('dinas_daerah');
                      }}
                      className="!min-w-0 !w-full !py-1.5 !px-1 text-[10px] leading-tight"
                      title="Masuk sebagai Dinas Sosial Daerah"
                    >
                      Dinas Daerah
                    </GradientButton>
                    <GradientButton
                      size="sm"
                      variant="emerald"
                      onClick={() => {
                        soundEffects.playClick();
                        onEnterDashboard('petugas_lapangan');
                      }}
                      className="!min-w-0 !w-full !py-1.5 !px-1 text-[10px] leading-tight"
                      title="Masuk sebagai Petugas Lapangan Tagana"
                    >
                      Tagana Lapangan
                    </GradientButton>
                  </div>
                </div>

                {/* Secondary Option: Login Screen Link */}
                <div className="text-center pt-1 border-t border-white/10 flex items-center justify-center gap-2">
                  <span className="text-[11px] text-slate-400">Petugas terdaftar?</span>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onLoginClick();
                    }}
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <LogIn className="w-3 h-3" />
                    <span>Masuk via Login Akun SPBE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Telemetry Window Bar Mockup */}
        <div className="max-w-6xl mx-auto mt-14 px-4 relative z-10">
          <div className="rounded-2xl bg-slate-900 p-2 sm:p-3 ring-1 ring-slate-800 shadow-2xl shadow-black/60 backdrop-blur-md">
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
              {/* Fake Window Bar */}
              <div className="h-9 bg-slate-900/90 px-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  sigap.kemensos.go.id/early-warning-system
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE TELEMETRY (12 WILAYAH)
                </div>
              </div>

              {/* Preview UI */}
              <div className="p-4 sm:p-6 bg-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-rose-500 animate-ping" />
                      Peta Pantauan Krisis &amp; Kerentanan Multi-Bahaya
                    </span>
                    <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-mono font-bold">
                      2 WILAYAH DARURAT • 5 SIAGA
                    </span>
                  </div>
                  <div className="h-44 rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="text-center z-10 px-4">
                      <p className="text-sm font-semibold text-slate-200">
                        Telemetri Sensor Iklim BMKG, Harga Pangan Bapanas &amp; Seismik PVMBG
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Sumba Timur (Defisit Hujan 12mm) • Cianjur (Pasca Gempa) • Demak (Banjir Tanggul)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Indeks Kerentanan Tertinggi</span>
                    <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">9.2 / 10.0 (Cianjur Kota)</span>
                    <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-rose-500 h-1.5 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Status Penyaluran Cepat</span>
                    <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">&lt; 3.8 Hari Rata-rata</span>
                    <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Sinkronisasi Data Lapangan</span>
                    <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">98.5% Lengkap</span>
                    <p className="text-[10px] text-slate-400 mt-1">DTKS + Regsosek + Laporan Tagana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aggregate National Metrics Section (Item C1) */}
      <section id="agregat-data" className="py-16 px-6 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-500/30">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Statistik Agregat Nasional Terpadu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Cakupan Intervensi &amp; Kinerja Perlindungan Sosial
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Rekapitulasi nasional dari 12 wilayah fokus pilot project SIGAP di seluruh Indonesia
              </p>
            </div>
            <GradientButton
              onClick={onEnterDashboard}
              size="sm"
              variant="cobalt"
              className="mt-4 md:mt-0 self-start"
            >
              <span>Eksplorasi 12 Wilayah di Peta</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </GradientButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Jiwa Terdampak</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-white pt-1">
                445.800
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terdata dalam DTKS Desil 1-2</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Rata-rata SLA Penyaluran Nasional</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-amber-400 pt-1">
                4.2 Hari
              </div>
              <div className="text-[11px] text-slate-400 font-semibold pt-1">
                (agregat 12 wilayah pilot • Target: 3-5 Hari)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Alokasi Bantuan Adaptif</span>
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 pt-1">
                Rp 28.6 M
              </div>
              <div className="text-[11px] text-slate-400 font-semibold pt-1">
                Tersalurkan via Himbara &amp; PT Pos
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Wilayah Pantauan Pilot</span>
                <Radio className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-white pt-1">
                12 Wilayah
              </div>
              <div className="text-[11px] text-rose-400 font-semibold pt-1">
                2 Darurat • 5 Siaga • 5 Normal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Pillar Resilience Journey Framework Section */}
      <section id="fitur" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Satu Rumah Tangga, Satu Resilience Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Alur Perjalanan Ketahanan Berkelanjutan
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            SIGAP bukan tiga sistem terpisah yang berdiri sendiri, melainkan <strong>satu rangkaian perjalanan berurutan</strong> untuk setiap rumah tangga terdampak: menstabilkan konsumsi saat krisis (<strong>SHIELD</strong>), melindungi modal manusia kesehatan &amp; pendidikan (<strong>CONVERGE</strong>), hingga mandiri ekonomi (<strong>RISE</strong>) berlandaskan <strong>DTSEN (Data Tunggal Ekonomi Sosial Nasional)</strong>.
          </p>
        </div>

        {/* Paragraf Penjelasan Backbone: SIGAP Data & Trigger Engine */}
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-sm sm:text-[15px] text-slate-700 bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 sm:p-5 leading-relaxed text-center sm:text-left shadow-xs">
            Ketiga pilar ini digerakkan oleh satu fondasi yang sama: <strong>SIGAP Data &amp; Trigger Engine</strong>, yang menyilangkan data sosial, bencana, kesehatan, pendidikan, dan ketenagakerjaan menjadi satu skor risiko per rumah tangga sebelum diteruskan ke Shield, Converge, atau Rise. Tanpa fondasi ini, ketiga pilar akan tetap berjalan terpisah — persis kondisi fragmentasi yang selama ini terjadi.
          </p>
        </div>

        {/* Hero Visual: Resilience Journey Tracker (SHIELD -> CONVERGE -> RISE) */}
        <div className="max-w-5xl mx-auto mb-14 shadow-sm rounded-2xl overflow-hidden">
          <ResilienceJourneyTracker
            activeStageOverride="shield"
            householdContextName="Simulasi Alur Rumah Tangga"
            householdNik="3201************"
            onNavigateStage={() => onEnterDashboard()}
          />
        </div>

        {/* 3 Continuous Journey Cards with Sequential Connected Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Tahap 1: SHIELD */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-rose-50/60 via-white to-rose-50/20 border-2 border-rose-200 shadow-lg shadow-rose-900/5 hover:border-rose-300 transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-mono text-[10px] font-extrabold tracking-wider uppercase">
                  Pilar 1 • Respons Kilat
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                SHIELD
              </h3>
              <p className="text-xs font-semibold text-rose-600 mb-3 uppercase tracking-wide">
                Perlindungan Konsumsi &amp; Stabilisasi Darurat
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Respons darurat berbasis telemetri BMKG/PVMBG, penilaian risiko 8 indikator analitis (Skala 120 Poin), pembiayaan kontinjensi berlapis (DRFI: APBD BTT, APBN DSP, Pooling Fund Bencana), dan top-up bansos adaptif (PKH/BPNT/BLT Kemensos) &lt; 5 hari.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-100 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Deteksi Dini, Aktivasi 120 Poin &amp; DRFI</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Safeguard Human-in-the-Loop 45-35-20</span>
              </div>
            </div>
          </div>

          {/* Tahap 2: CONVERGE */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20 border-2 border-emerald-200 shadow-lg shadow-emerald-900/5 hover:border-emerald-300 transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-extrabold tracking-wider uppercase">
                  Pilar 2 • Layanan Dasar
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                CONVERGE
              </h3>
              <p className="text-xs font-semibold text-emerald-600 mb-3 uppercase tracking-wide">
                Konvergensi Layanan Kesehatan &amp; Pendidikan
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pemetaan kerentanan modal manusia: prevalensi stunting, Angka Partisipasi Murni (APM) sekolah, kepesertaan JKN/PBI Kemenkes, afirmasi KIP Kemendikbudristek, serta pemerataan sarana esensial (Puskesmas Prima, PLTS, sanitasi).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Human Capital Vulnerability Mapping</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Supply-Side Equalization Dashboard</span>
              </div>
            </div>
          </div>

          {/* Tahap 3: RISE */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-purple-50/60 via-white to-purple-50/20 border-2 border-purple-200 shadow-lg shadow-purple-900/5 hover:border-purple-300 transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-mono text-[10px] font-extrabold tracking-wider uppercase">
                  Pilar 3 • Kemandirian
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                RISE
              </h3>
              <p className="text-xs font-semibold text-purple-600 mb-3 uppercase tracking-wide">
                Inklusi Produktif &amp; Graduasi Ekonomi
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kohort 5 tahap bertingkat (Stabilize ➔ Assess ➔ Build ➔ Connect ➔ Graduate), pelatihan Kartu Prakerja, permodalan PNM Mekaar / UMi, kemitraan BUMDes &amp; E-Katalog LKPP, serta validasi kelulusan mandiri DTSEN.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-100 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Sequenced Productive Inclusion Tracker</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Graduation Scorecard &amp; Sertifikat Mandiri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="alur-kerja" className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
              Mekanisme Kerja Terpadu
            </h2>
            <p className="text-3xl font-extrabold text-slate-900">
              4 Tahap Alur Kerja Sistem SIGAP
            </p>
            <p className="text-slate-600 text-sm mt-2">
              Alur kerja terstandardisasi dari deteksi dini multi-bahaya hingga monitoring graduasi dan akuntabilitas dua arah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-mono font-extrabold text-blue-600 mb-3">01</div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Tahap 1 • Sensing</div>
              <h4 className="font-bold text-slate-900 mb-1">Deteksi Dini &amp; Peringatan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Data anomali cuaca BMKG, seismik PVMBG, dan harga pangan memicu sinyal peringatan dini ke Command Center.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-mono font-extrabold text-indigo-600 mb-3">02</div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Tahap 2 • Targeting</div>
              <h4 className="font-bold text-slate-900 mb-1">Satu Data Terpadu (DTSEN)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pencocokan dan deduplikasi data DTKS, Regsosek, dan kependudukan untuk registrasi sasaran satu keluarga utuh.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-mono font-extrabold text-rose-600 mb-3">03</div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Tahap 3 • Activation &amp; Service</div>
              <h4 className="font-bold text-slate-900 mb-1">Penilaian Risiko &amp; Rujukan Terpadu</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluasi 8 indikator risiko (Skala 120 Poin), otorisasi HITL, penyaluran bansos kilat, dan rujukan nakes/sekolah.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-3xl font-mono font-extrabold text-purple-600 mb-3">04</div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Tahap 4 • Graduation &amp; Feedback</div>
              <h4 className="font-bold text-slate-900 mb-1">Inklusi Produktif &amp; Akuntabilitas</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pelacakan graduasi mandiri ekonomi (Rise), kanal aspirasi &amp; whistleblowing warga, serta monitoring SLA 360°.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo & Identity Philosophy Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left max-w-2xl">
                <div className="shrink-0 p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
                  <SigapLogo size="xl" variant="dark" showText={false} interactive={true} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-2.5 border border-rose-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Filosofi Desain Identitas SIGAP</span>
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white">
                    Simbolisme Perlindungan Sosial yang Tangkas &amp; Humanis
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Logo SIGAP menggabungkan <strong>Perisai Ketahanan Sosial</strong>, <strong>Sayap Merangkul Kemanusiaan</strong>, <strong>Kilat Gerak Cepat</strong>, dan <strong>Nukleus Satu Data</strong>. Selaras dengan mandat sistem: respons darurat dalam hitungan hari dengan akurasi target berbasis data terpadu.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <SigapLogo size="md" variant="dark" showText={false} interactive={true} />
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Klik logo untuk eksplorasi makna simbol &amp; warna
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <SigapLogo size="sm" variant="dark" />
          </div>

          <div className="flex items-center gap-6 text-xs">
            <button onClick={onEnterDashboard} className="hover:text-white transition-colors">
              Peta Siaga Bencana
            </button>
            <button onClick={onEnterDashboard} className="hover:text-white transition-colors">
              Satu Data Terpadu (DTSEN)
            </button>
            <button onClick={() => setIsArchitectureModalOpen(true)} className="hover:text-white transition-colors">
              Arsitektur Sistem
            </button>
            <button onClick={onLoginClick} className="hover:text-white transition-colors">
              Portal Dinas Sosial
            </button>
          </div>

          <div className="text-xs text-slate-500">
            © 2024-2026 SIGAP Indonesia. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>

      {/* Technical Architecture Modal */}
      <TechnicalArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
};
