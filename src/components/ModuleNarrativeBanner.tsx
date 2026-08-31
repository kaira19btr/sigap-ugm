import React from 'react';
import { AppModule } from '../types';
import { Sparkles, ArrowRight, ShieldAlert, UserCheck, Activity, Layers } from 'lucide-react';

interface ModuleNarrativeBannerProps {
  currentModule: AppModule;
  narrativeText: string;
  previousStepName?: string;
  nextStepName?: string;
  shockBadge?: 'kovariat' | 'idiosinkratik';
  shockCustomNote?: string;
}

export const ModuleNarrativeBanner: React.FC<ModuleNarrativeBannerProps> = ({
  currentModule,
  narrativeText,
  previousStepName,
  nextStepName,
  shockBadge,
  shockCustomNote,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 text-slate-100 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Main narrative story text */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-blue-400">
                Alur Narasi Perjalanan Ketahanan
              </span>
              {shockBadge === 'kovariat' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <ShieldAlert className="w-3 h-3 text-amber-400" />
                  <span>SHOCK KOVARIAT (Bencana Alam / Agregat Area)</span>
                </span>
              )}
              {shockBadge === 'idiosinkratik' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <UserCheck className="w-3 h-3 text-purple-400" />
                  <span>SHOCK IDIOSINKRATIK (Individual / PHK / Sakit Kronis)</span>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              "{narrativeText}"
            </p>
          </div>
        </div>

        {/* Previous -> Next Stepper Context */}
        {(previousStepName || nextStepName) && (
          <div className="flex items-center gap-2 text-[11px] bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            {previousStepName && (
              <div className="text-slate-400">
                <span className="text-[9px] uppercase tracking-wider block font-mono text-slate-500">Sebelumnya:</span>
                <span className="font-semibold text-slate-300">{previousStepName}</span>
              </div>
            )}
            {previousStepName && nextStepName && (
              <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            )}
            {nextStepName && (
              <div className="text-slate-400">
                <span className="text-[9px] uppercase tracking-wider block font-mono text-blue-400">Melanjutkan Ke:</span>
                <span className="font-bold text-blue-300">{nextStepName}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explanatory note for shock type if present */}
      {shockBadge === 'kovariat' && (
        <div className="text-[11px] text-amber-200/90 bg-amber-950/40 border border-amber-800/60 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
          <span>
            {shockCustomNote ||
              'Prinsip Shock Kovariat: Verifikasi berjalan berbasis sampling area (satuan wilayah terdampak), bukan per rumah tangga, guna mencegah bottleneck logistik pada bencana masal.'}
          </span>
        </div>
      )}

      {shockBadge === 'idiosinkratik' && (
        <div className="text-[11px] text-purple-200/90 bg-purple-950/40 border border-purple-800/60 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>
          <span>
            {shockCustomNote ||
              'Prinsip Shock Idiosinkratik: Verifikasi berjalan melalui pendekatan case management pendamping sosial per kasus, berfokus pada hilangnya pendapatan kepala keluarga.'}
          </span>
        </div>
      )}
    </div>
  );
};
