import React, { useState } from 'react';
import { SigapLogo } from '../components/SigapLogo';
import { TechnicalArchitectureModal } from '../components/TechnicalArchitectureModal';
import { soundEffects } from '../utils/soundEffects';
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
} from 'lucide-react';

interface LandingViewProps {
  onLoginClick: () => void;
  onEnterDashboard: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onLoginClick,
  onEnterDashboard,
}) => {
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(soundEffects.getMuted());

  return (
    <div id="landing-page-container" className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-100">
      {/* Top Navigation */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <SigapLogo size="md" variant="light" showBadge={true} />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#fitur" className="hover:text-blue-600 transition-colors">Fitur Utama</a>
            <a href="#agregat-data" className="hover:text-blue-600 transition-colors">Data Agregat</a>
            <a href="#alur-kerja" className="hover:text-blue-600 transition-colors">Alur Kerja</a>
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <Workflow className="w-3.5 h-3.5 text-blue-600" />
              <span>Arsitektur Sistem</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Sound FX Toggle Button */}
            <button
              id="btn-landing-sound-toggle"
              onClick={() => {
                const nextMuted = soundEffects.toggleMute();
                setIsSoundMuted(nextMuted);
              }}
              className={`p-2 rounded-lg transition-colors border ${
                isSoundMuted
                  ? 'text-slate-400 hover:text-slate-700 bg-slate-50 border-slate-200'
                  : 'text-blue-600 hover:text-blue-700 bg-blue-50/70 border-blue-200'
              }`}
              title={isSoundMuted ? 'Efek Suara: Bisu (Klik untuk aktifkan)' : 'Efek Suara: Aktif (Klik untuk matikan)'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              id="btn-landing-login"
              onClick={onLoginClick}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              Masuk Akun
            </button>
            <button
              id="btn-landing-enter-dashboard"
              onClick={onEnterDashboard}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <span>Akses Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-6 border border-blue-200">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Platform Siaga Bencana &amp; Perlindungan Adaptif Indonesia</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Sistem Gerak Cepat{' '}
            <span className="text-blue-600">Perlindungan Sosial</span> Adaptif
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Platform terpadu untuk respons cepat, penilaian risiko otomatis berbasis 8 indikator analitis (120 Poin), dan tata kelola bantuan sosial adaptif geospasial real-time saat krisis dan bencana.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              id="btn-hero-primary-dashboard"
              onClick={onEnterDashboard}
              className="px-7 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2.5 group"
            >
              <span>Buka Dasbor Siaga</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="btn-hero-architecture"
              onClick={() => setIsArchitectureModalOpen(true)}
              className="px-7 py-3.5 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-sm transition-all flex items-center gap-2"
            >
              <Workflow className="w-4 h-4 text-blue-600" />
              <span>Diagram Arsitektur</span>
            </button>
            <button
              id="btn-hero-login-modal"
              onClick={onLoginClick}
              className="px-6 py-3.5 text-base font-bold text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-100 rounded-xl transition-all"
            >
              Masuk Dinas / Instansi
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200">
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">4.2 Hari</div>
              <div className="text-xs text-slate-600 font-semibold mt-1">Rata-rata SLA Penyaluran Nasional</div>
              <div className="text-[10px] text-slate-400 font-medium">(agregat 12 wilayah pilot)</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">94.8%</div>
              <div className="text-xs text-slate-600 font-semibold mt-1">Akurasi Target Penerima (DTKS)</div>
              <div className="text-[10px] text-slate-400 font-medium">(Desil 1-2 &amp; Regsosek)</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">120 Poin</div>
              <div className="text-xs text-slate-600 font-semibold mt-1">Standar Matriks 8 Indikator</div>
              <div className="text-[10px] text-slate-400 font-medium">(Maks. 15 Poin per Indikator)</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">Offline-First</div>
              <div className="text-xs text-slate-600 font-semibold mt-1">Pendataan Lapangan Tagana</div>
              <div className="text-[10px] text-slate-400 font-medium">(Sinkronisasi Cepat PWA)</div>
            </div>
          </div>
        </div>

        {/* Dashboard Graphic Mockup */}
        <div className="max-w-6xl mx-auto mt-14 px-4">
          <div className="rounded-2xl bg-slate-900 p-2 sm:p-3 ring-1 ring-slate-800 shadow-2xl shadow-slate-900/40">
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
                  <div className="h-52 rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="text-center z-10">
                      <p className="text-sm font-semibold text-slate-200">
                        Telemetri Sensor Iklim, Harga Pangan &amp; Seismik Aktif
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
                    <span className="text-[11px] text-slate-400 font-semibold block">Sinkronisasi Data Lapangan</span>
                    <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">98.5% Lengkap</span>
                    <p className="text-[10px] text-slate-500 mt-1">DTKS + Regsosek + Laporan Tagana</p>
                  </div>
                  <button
                    onClick={onEnterDashboard}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Buka Dasbor Interaktif →
                  </button>
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
            <button
              onClick={onEnterDashboard}
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 self-start"
            >
              <span>Eksplorasi 12 Wilayah di Peta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
        <div className="text-center max-w-3xl mx-auto mb-16">
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
