import React, { useState } from 'react';
import { Info, Sparkles, Shield, Zap, Heart, Database } from 'lucide-react';
import { LogoPhilosophyModal } from './LogoPhilosophyModal';
import { soundEffects } from '../utils/soundEffects';

interface SigapLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showText?: boolean;
  showSubtitle?: boolean;
  showBadge?: boolean;
  interactive?: boolean;
  isAuthenticating?: boolean;
  className?: string;
}

export const SigapLogo: React.FC<SigapLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
  showSubtitle = true,
  showBadge = false,
  interactive = true,
  isAuthenticating = false,
  className = '',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = variant === 'dark';

  const sizeConfig = {
    sm: {
      svgSize: 32,
      container: 'w-8 h-8',
      title: 'text-base font-extrabold',
      subtitle: 'text-[9px]',
      gap: 'gap-2',
    },
    md: {
      svgSize: 40,
      container: 'w-10 h-10',
      title: 'text-lg font-extrabold',
      subtitle: 'text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      svgSize: 48,
      container: 'w-12 h-12',
      title: 'text-xl font-extrabold',
      subtitle: 'text-xs',
      gap: 'gap-3',
    },
    xl: {
      svgSize: 68,
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-2xl font-extrabold',
      subtitle: 'text-xs',
      gap: 'gap-3.5',
    },
  };

  const cfg = sizeConfig[size];

  return (
    <>
      <div
        className={`flex items-center ${cfg.gap} ${className} ${
          interactive ? 'group cursor-pointer' : ''
        }`}
        onClick={interactive ? () => {
          soundEffects.playClick();
          setModalOpen(true);
        } : undefined}
        title={interactive ? 'Klik untuk melihat filosofi makna logo SIGAP' : undefined}
      >
        {/* Custom Symbolic Vector Emblem */}
        <div className={`relative shrink-0 ${cfg.container} flex items-center justify-center transition-transform duration-300 ${interactive && !isAuthenticating ? 'group-hover:scale-105' : ''}`}>
          {/* Authentication Dynamic Pulse Waves & Orbit Rings */}
          {isAuthenticating && (
            <>
              {/* Outer Energy Shockwave Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-rose-500/80 bg-rose-500/10 animate-sigap-wave pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full border border-amber-400/80 bg-amber-500/10 animate-sigap-wave-delay pointer-events-none"></div>
              
              {/* Orbital Rotating Ring with Satellite Sparks */}
              <div className="absolute -inset-2.5 rounded-full border border-dashed border-blue-400/60 animate-sigap-orbit pointer-events-none">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></div>
              </div>
              <div className="absolute -inset-4 rounded-full border border-dotted border-rose-400/40 animate-sigap-orbit-reverse pointer-events-none">
                <div className="absolute -bottom-1 right-1/4 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_#f43f5e]"></div>
              </div>
            </>
          )}

          <svg
            width={cfg.svgSize}
            height={cfg.svgSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-md transition-all ${isAuthenticating ? 'animate-sigap-pulse scale-110' : ''}`}
          >
            <defs>
              {/* Outer Shield Gradient */}
              <linearGradient id="sigapShieldGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E11D48" /> {/* Rose Red: Tanggap Darurat & Kepedulian */}
                <stop offset="45%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#1E3A8A" /> {/* Navy Blue: Keandalan Data & Negara */}
              </linearGradient>

              {/* Caring Wings/Hands Gradient */}
              <linearGradient id="sigapHandsGrad" x1="20" y1="30" x2="80" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Fast Lightning / Adaptive Pulse Gradient */}
              <linearGradient id="sigapPulseGrad" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FDE047" /> {/* Gold: Harapan & Kecepatan */}
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="sigapGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation={isAuthenticating ? "6" : "3"} floodColor="#E11D48" floodOpacity={isAuthenticating ? "0.8" : "0.35"} />
                {isAuthenticating && (
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#F59E0B" floodOpacity="0.7" />
                )}
              </filter>
            </defs>

            {/* Base Shield (Perisai Ketahanan Sosial) */}
            <path
              d="M50 6C65 6 86 12 90 26C90 56 68 84 50 94C32 84 10 56 10 26C14 12 35 6 50 6Z"
              fill="url(#sigapShieldGrad)"
            />

            {/* Inner Shield Contour Accent */}
            <path
              d="M50 11C62 11 81 16 85 28C85 54 65 79 50 88C35 79 15 54 15 28C19 16 38 11 50 11Z"
              stroke="#FFFFFF"
              strokeOpacity={isAuthenticating ? "0.4" : "0.18"}
              strokeWidth="2"
              fill="none"
            />

            {/* Caring Hands / Embracing Wings (Tangan Merangkul & Perlindungan Sosial) */}
            {/* Left Wing / Caring Hand */}
            <path
              d="M50 32C42 22 28 24 22 36C18 45 22 58 32 66C38 71 44 75 50 78C46 71 34 60 30 52C26 44 30 36 38 34C43 32 48 35 50 38Z"
              fill="url(#sigapHandsGrad)"
              fillOpacity={isAuthenticating ? "1" : "0.9"}
            />
            {/* Right Wing / Caring Hand */}
            <path
              d="M50 32C58 22 72 24 78 36C82 45 78 58 68 66C62 71 56 75 50 78C54 71 66 60 70 52C74 44 70 36 62 34C57 32 52 35 50 38Z"
              fill="url(#sigapHandsGrad)"
              fillOpacity={isAuthenticating ? "1" : "0.9"}
            />

            {/* Dynamic Lightning Bolt / Adaptive Response Wave (Gerak Cepat & Peringatan Dini) */}
            <path
              d="M54 18L40 45H53L46 72L63 41H50L56 22L54 18Z"
              fill="url(#sigapPulseGrad)"
              filter="url(#sigapGlow)"
            />

            {/* Central Unified Data Hub Core (Titik Satu Data Terpadu DTKS-Regsosek) */}
            <circle cx="50" cy="46" r={isAuthenticating ? "4.5" : "3.5"} fill="#FFFFFF" />
            <circle cx="50" cy="46" r={isAuthenticating ? "8" : "6"} stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity={isAuthenticating ? "1" : "0.75"} />
          </svg>

          {/* Interactive small info indicator */}
          {interactive && !isAuthenticating && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-900 text-rose-300 rounded-full border border-slate-700 flex items-center justify-center text-[9px] shadow-xs group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Info className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        {/* Text Details */}
        {showText && (
          <div className="leading-tight select-none">
            <div className="flex items-center gap-1.5">
              <span
                className={`${cfg.title} tracking-tight font-extrabold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                SIGAP
              </span>
              {showBadge && (
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Sosial Adaptif
                </span>
              )}
            </div>
            {showSubtitle && (
              <p
                className={`${cfg.subtitle} font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Perlindungan Sosial Adaptif
              </p>
            )}
          </div>
        )}
      </div>

      {/* Philosophy Modal dialog */}
      <LogoPhilosophyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
