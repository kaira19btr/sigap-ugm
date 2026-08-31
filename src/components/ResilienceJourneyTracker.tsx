import React from 'react';
import { AppModule } from '../types';
import {
  Shield,
  HeartPulse,
  TrendingUp,
  CheckCircle2,
  Database,
  Sparkles,
} from 'lucide-react';

export type JourneyStage = 'shield' | 'converge' | 'rise' | 'governance';

interface ResilienceJourneyTrackerProps {
  currentModule?: AppModule;
  activeStageOverride?: JourneyStage;
  onNavigateStage?: (stage: JourneyStage) => void;
  householdContextName?: string;
  householdNik?: string;
  customStatus?: {
    shieldStatus?: 'selesai' | 'aktif' | 'belum';
    convergeStatus?: 'selesai' | 'aktif' | 'belum';
    riseStatus?: 'selesai' | 'aktif' | 'belum';
  };
  compact?: boolean;
}

export const getStageFromModule = (module?: AppModule): JourneyStage => {
  if (!module) return 'shield';
  if (
    [
      'early_warning',
      'satu_data',
      'risk_assessment',
      'contingency_financing',
      'input_lapangan',
    ].includes(module)
  ) {
    return 'shield';
  }
  if (['converge_vulnerability_map', 'converge_supply_side'].includes(module)) {
    return 'converge';
  }
  if (['rise_inclusion_tracker', 'rise_graduation_scorecard'].includes(module)) {
    return 'rise';
  }
  return 'governance';
};

export const ResilienceJourneyTracker: React.FC<ResilienceJourneyTrackerProps> = ({
  currentModule,
  activeStageOverride,
  onNavigateStage,
  householdContextName,
  householdNik,
  customStatus,
  compact = false,
}) => {
  const currentStage: JourneyStage = activeStageOverride || getStageFromModule(currentModule);

  // Status mapping for the 3 main nodes: SHIELD -> CONVERGE -> RISE
  const getStageStatus = (stage: 'shield' | 'converge' | 'rise') => {
    if (customStatus) {
      if (stage === 'shield') return customStatus.shieldStatus || 'aktif';
      if (stage === 'converge') return customStatus.convergeStatus || 'belum';
      if (stage === 'rise') return customStatus.riseStatus || 'belum';
    }

    if (currentStage === 'governance') {
      return 'selesai';
    }

    if (stage === 'shield') {
      if (currentStage === 'shield') return 'aktif';
      return 'selesai';
    }
    if (stage === 'converge') {
      if (currentStage === 'shield') return 'belum';
      if (currentStage === 'converge') return 'aktif';
      return 'selesai';
    }
    if (stage === 'rise') {
      if (currentStage === 'rise') return 'aktif';
      return 'belum';
    }
    return 'belum';
  };

  const stages = [
    {
      id: 'shield' as JourneyStage,
      nodeKey: 'SHIELD',
      nodeNumber: '1',
      title: 'SHIELD',
      subtitle: 'SHIELD — Deteksi dini & aktivasi perlindungan darurat',
      icon: Shield,
      color: 'rose',
      status: getStageStatus('shield'),
      targetModule: 'early_warning' as AppModule,
    },
    {
      id: 'converge' as JourneyStage,
      nodeKey: 'CONVERGE',
      nodeNumber: '2',
      title: 'CONVERGE',
      subtitle: 'CONVERGE — Layanan kesehatan & pendidikan tetap berjalan',
      icon: HeartPulse,
      color: 'emerald',
      status: getStageStatus('converge'),
      targetModule: 'converge_vulnerability_map' as AppModule,
    },
    {
      id: 'rise' as JourneyStage,
      nodeKey: 'RISE',
      nodeNumber: '3',
      title: 'RISE',
      subtitle: 'RISE — Menuju kemandirian ekonomi',
      icon: TrendingUp,
      color: 'purple',
      status: getStageStatus('rise'),
      targetModule: 'rise_inclusion_tracker' as AppModule,
    },
  ];

  const isGovernanceModule = currentStage === 'governance';

  return (
    <div
      id="resilience-journey-tracker-root"
      className={`w-full bg-white border border-slate-200/90 rounded-2xl shadow-xs transition-all ${
        compact ? 'p-3' : 'p-4 sm:p-5'
      }`}
    >
      {/* Header bar / Household Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-blue-500/10 border border-slate-200 text-slate-800 text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Resilience Journey Tracker</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            • Satu Rangkaian Perjalanan Pemulihan Rumah Tangga (Shield → Converge → Rise)
          </span>
        </div>

        {/* Right side context: Household tag or Governance engine tag */}
        <div className="flex items-center gap-2">
          {householdContextName && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Keluarga:</span>
              <span className="font-bold">{householdContextName}</span>
              {householdNik && <span className="text-[10px] font-mono text-blue-700">({householdNik})</span>}
            </div>
          )}

          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
              isGovernanceModule
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
            title="Fondasi Lintas-Pilar: Monev, Bot Pengaduan, Persetujuan, Manajemen Pengguna & Privasi Data"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">Governance &amp; Data Engine</span>
          </div>
        </div>
      </div>

      {/* Stepper Horizontal Nodes */}
      <div className="relative">
        {/* Background connector line */}
        <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-slate-200 rounded-full z-0">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-emerald-500 to-purple-500 rounded-full transition-all duration-500"
            style={{
              width:
                currentStage === 'shield'
                  ? '18%'
                  : currentStage === 'converge'
                  ? '55%'
                  : currentStage === 'rise'
                  ? '100%'
                  : '100%',
            }}
          />
        </div>

        {/* 3 Step Cards / Nodes: SHIELD -> CONVERGE -> RISE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
          {stages.map((stg) => {
            const Icon = stg.icon;
            const isCurrent = currentStage === stg.id;
            const isCompleted = stg.status === 'selesai';

            return (
              <button
                key={stg.id}
                id={`journey-node-${stg.id}`}
                type="button"
                onClick={() => onNavigateStage && onNavigateStage(stg.id)}
                disabled={!onNavigateStage}
                className={`text-left rounded-xl p-3 sm:p-3.5 transition-all border relative flex items-start gap-3 ${
                  onNavigateStage ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
                } ${
                  isCurrent
                    ? 'bg-white ring-2 ring-blue-600 border-blue-400 shadow-md'
                    : isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                    : 'bg-slate-50/70 border-slate-200 text-slate-400 opacity-70'
                }`}
              >
                {/* Node Icon Avatar with Indicator Badge */}
                <div className="relative shrink-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs transition-transform ${
                      isCurrent
                        ? stg.id === 'shield'
                          ? 'bg-rose-600 text-white shadow-rose-600/30 scale-105'
                          : stg.id === 'converge'
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                          : 'bg-purple-600 text-white shadow-purple-600/30 scale-105'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Pulsing indicator when active */}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                    </span>
                  )}
                </div>

                {/* Node Text Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                          isCurrent
                            ? 'bg-blue-100 text-blue-800'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        Pilar {stg.nodeNumber}
                      </span>
                      <span
                        className={`text-sm font-extrabold tracking-tight truncate ${
                          isCurrent
                            ? 'text-slate-900 font-black'
                            : isCompleted
                            ? 'text-emerald-950 font-bold'
                            : 'text-slate-500'
                        }`}
                      >
                        {stg.title}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isCurrent
                          ? 'bg-blue-600 text-white animate-pulse'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCurrent ? 'Aktif Sekarang' : isCompleted ? 'Selesai' : 'Tahap Berikutnya'}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] leading-snug mt-1 ${
                      isCurrent
                        ? 'text-slate-700 font-medium'
                        : isCompleted
                        ? 'text-slate-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {stg.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
