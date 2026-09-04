import React, { useState } from 'react';
import { AppModule } from '../types';
import {
  Shield,
  HeartPulse,
  TrendingUp,
  CheckCircle2,
  Database,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { ResilienceJourneyModal } from './ResilienceJourneyModal';
import { GradientButton } from './ui/gradient-button';

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
      subtitle: 'Perlindungan Konsumsi & Stabilisasi Darurat',
      themeRole: 'Respons Kilat',
      leadSummary: 'Deteksi telemetri BMKG, penilaian 120 poin & aktivasi pembiayaan kontinjensi (DRFI)',
      icon: Shield,
      themeColor: 'rose',
      status: getStageStatus('shield'),
      targetModule: 'early_warning' as AppModule,
      slaText: 'Respons: < 24-48 Jam',
      keyTags: ['Telemetri BMKG', 'Skala 120 Poin', 'BLT Adaptif <5 Hari'],
    },
    {
      id: 'converge' as JourneyStage,
      nodeKey: 'CONVERGE',
      nodeNumber: '2',
      title: 'CONVERGE',
      subtitle: 'Konvergensi Layanan Kesehatan & Pendidikan',
      themeRole: 'Layanan Dasar',
      leadSummary: 'Pemetaan kerentanan modal manusia, proteksi stunting & keberlanjutan sekolah',
      icon: HeartPulse,
      themeColor: 'cobalt',
      status: getStageStatus('converge'),
      targetModule: 'converge_vulnerability_map' as AppModule,
      slaText: 'Proteksi: Berkelanjutan',
      keyTags: ['Peta Kerentanan', 'Zero Stunting', 'Puskesmas Prima'],
    },
    {
      id: 'rise' as JourneyStage,
      nodeKey: 'RISE',
      nodeNumber: '3',
      title: 'RISE',
      subtitle: 'Inklusi Produktif & Graduasi Ekonomi',
      themeRole: 'Kemandirian',
      leadSummary: 'Kohort 5 tahap graduasi, modal mikro UMi/KUR, pelatihan & sertifikasi mandiri DTSEN',
      icon: TrendingUp,
      themeColor: 'emerald',
      status: getStageStatus('rise'),
      targetModule: 'rise_inclusion_tracker' as AppModule,
      slaText: 'Target: Mandiri DTSEN',
      keyTags: ['Kohort 5 Tahap', 'Kredit Mikro UMi', 'Skor Graduasi >70'],
    },
  ];

  const isGovernanceModule = currentStage === 'governance';

  return (
    <>
      <div
        id="resilience-journey-tracker-root"
        className={`w-full bg-slate-950/95 border border-slate-800/90 rounded-2xl shadow-2xl transition-all relative overflow-hidden ${
          compact ? 'p-3.5' : 'p-4 sm:p-5'
        }`}
      >
        {/* Ambient atmospheric aura */}
        <div className="absolute top-0 right-1/4 w-96 h-28 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-28 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header bar / Household Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 mb-3.5 border-b border-slate-800/80 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-rose-500/20 via-blue-500/20 to-emerald-500/20 border border-slate-700/80 text-white text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="bg-gradient-to-r from-rose-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
                Resilience Journey Tracker
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden md:inline font-medium">
              • Satu Rangkaian Pemulihan Berkelanjutan (Shield ➔ Converge ➔ Rise)
            </span>
          </div>

          {/* Right side context: Household tag, Roadmap Button & Governance engine */}
          <div className="flex flex-wrap items-center gap-2">
            {householdContextName && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 text-xs font-semibold">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Keluarga:</span>
                <span className="font-bold text-white">{householdContextName}</span>
                {householdNik && <span className="text-[10px] font-mono text-cyan-400">({householdNik})</span>}
              </div>
            )}

            {/* Roadmap Detail Modal Trigger Button */}
            <GradientButton
              variant="variant"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="cursor-pointer font-bold shadow-xs"
              title="Klik untuk membuka roadmap lengkap perjalanan ketahanan"
            >
              <Info className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span>Panduan Roadmap</span>
            </GradientButton>

            {/* Governance Engine Node Button */}
            <GradientButton
              variant={isGovernanceModule ? "cobalt" : "default"}
              size="sm"
              onClick={() => onNavigateStage && onNavigateStage('governance')}
              className={`cursor-pointer font-bold transition-all ${
                isGovernanceModule ? 'ring-2 ring-blue-400/80 shadow-md' : 'opacity-85 hover:opacity-100'
              }`}
              title="Fondasi Lintas-Pilar: Monev, Bot Pengaduan, Persetujuan & Privasi Data DTSEN"
            >
              <Database className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>Data &amp; Trigger Engine</span>
            </GradientButton>
          </div>
        </div>

        {/* Stepper Horizontal Nodes with Glowing Colored Pathway */}
        <div className="relative">
          {/* Background connector line */}
          <div className="hidden md:block absolute top-10 left-16 right-16 h-1.5 bg-slate-800/90 rounded-full z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm shadow-blue-400/50"
              style={{
                width:
                  currentStage === 'shield'
                    ? '20%'
                    : currentStage === 'converge'
                    ? '60%'
                    : '100%',
              }}
            />
          </div>

          {/* 3 Step Cards / Nodes: SHIELD -> CONVERGE -> RISE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {stages.map((stg) => {
              const Icon = stg.icon;
              const isCurrent = currentStage === stg.id;
              const isCompleted = stg.status === 'selesai';

              // Gradient box styling matching Pusat Kemensos (Rose), Dinas Daerah (Cobalt), Tagana Lapangan (Emerald)
              let gradientBoxClass = '';
              let iconStyle = '';
              let badgePillarStyle = '';
              let statusBadgeStyle = '';
              let titleColor = 'text-white font-black';
              let subtitleColor = '';
              let summaryColor = '';
              let tagStyle = '';
              let footerColor = '';
              let activeRing = isCurrent ? 'ring-2 shadow-2xl scale-[1.01]' : 'hover:-translate-y-1 hover:shadow-xl';

              if (stg.themeColor === 'rose') {
                // Pusat Kemensos: Rose / Ruby
                gradientBoxClass = 'gradient-box gradient-box-rose';
                subtitleColor = 'text-rose-200/90';
                summaryColor = 'text-rose-100/75';
                footerColor = 'text-rose-300 group-hover:text-white';

                if (isCurrent) {
                  activeRing += ' ring-rose-400/80 shadow-rose-950/70';
                  iconStyle = 'bg-gradient-to-br from-rose-500 to-amber-600 text-white shadow-lg shadow-rose-600/50 scale-105 border border-rose-300/40';
                  badgePillarStyle = 'bg-rose-500/20 text-rose-200 border-rose-400/40 backdrop-blur-xs';
                  statusBadgeStyle = 'bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black shadow-md shadow-rose-500/40 border border-white/20';
                  tagStyle = 'bg-rose-950/70 text-rose-200 border-rose-700/50';
                } else if (isCompleted) {
                  iconStyle = 'bg-rose-600/80 text-white shadow-sm border border-rose-400/30';
                  badgePillarStyle = 'bg-rose-950/60 text-rose-300 border-rose-700/40';
                  statusBadgeStyle = 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold';
                  tagStyle = 'bg-rose-950/50 text-rose-300/80 border-rose-800/40';
                } else {
                  iconStyle = 'bg-rose-950/80 text-rose-300 border border-rose-800/50';
                  badgePillarStyle = 'bg-slate-900/80 text-rose-300/80 border-rose-900/40';
                  statusBadgeStyle = 'bg-slate-900/80 text-rose-300/70 border border-rose-900/40';
                  tagStyle = 'bg-slate-900/60 text-rose-300/70 border-rose-900/40';
                }
              } else if (stg.themeColor === 'cobalt') {
                // Dinas Daerah: Cobalt / Deep Sky Blue
                gradientBoxClass = 'gradient-box gradient-box-cobalt';
                subtitleColor = 'text-sky-200/90';
                summaryColor = 'text-sky-100/75';
                footerColor = 'text-sky-300 group-hover:text-white';

                if (isCurrent) {
                  activeRing += ' ring-sky-400/80 shadow-blue-950/70';
                  iconStyle = 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/50 scale-105 border border-sky-300/40';
                  badgePillarStyle = 'bg-blue-500/20 text-sky-200 border-sky-400/40 backdrop-blur-xs';
                  statusBadgeStyle = 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-black shadow-md shadow-blue-500/40 border border-white/20';
                  tagStyle = 'bg-blue-950/70 text-sky-200 border-blue-700/50';
                } else if (isCompleted) {
                  iconStyle = 'bg-blue-600/80 text-white shadow-sm border border-blue-400/30';
                  badgePillarStyle = 'bg-blue-950/60 text-sky-300 border-blue-700/40';
                  statusBadgeStyle = 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold';
                  tagStyle = 'bg-blue-950/50 text-sky-300/80 border-blue-800/40';
                } else {
                  iconStyle = 'bg-blue-950/80 text-sky-300 border border-blue-800/50';
                  badgePillarStyle = 'bg-slate-900/80 text-sky-300/80 border-blue-900/40';
                  statusBadgeStyle = 'bg-slate-900/80 text-sky-300/70 border border-blue-900/40';
                  tagStyle = 'bg-slate-900/60 text-sky-300/70 border-blue-900/40';
                }
              } else {
                // Tagana Lapangan: Emerald / Green
                gradientBoxClass = 'gradient-box gradient-box-emerald';
                subtitleColor = 'text-emerald-200/90';
                summaryColor = 'text-emerald-100/75';
                footerColor = 'text-emerald-300 group-hover:text-white';

                if (isCurrent) {
                  activeRing += ' ring-emerald-400/80 shadow-emerald-950/70';
                  iconStyle = 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/50 scale-105 border border-emerald-300/40';
                  badgePillarStyle = 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 backdrop-blur-xs';
                  statusBadgeStyle = 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-black shadow-md shadow-emerald-500/40 border border-white/20';
                  tagStyle = 'bg-emerald-950/70 text-emerald-200 border-emerald-700/50';
                } else if (isCompleted) {
                  iconStyle = 'bg-emerald-600/80 text-white shadow-sm border border-emerald-400/30';
                  badgePillarStyle = 'bg-emerald-950/60 text-emerald-300 border-emerald-700/40';
                  statusBadgeStyle = 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold';
                  tagStyle = 'bg-emerald-950/50 text-emerald-300/80 border-emerald-800/40';
                } else {
                  iconStyle = 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50';
                  badgePillarStyle = 'bg-slate-900/80 text-emerald-300/80 border-emerald-900/40';
                  statusBadgeStyle = 'bg-slate-900/80 text-emerald-300/70 border border-emerald-900/40';
                  tagStyle = 'bg-slate-900/60 text-emerald-300/70 border-emerald-900/40';
                }
              }

              return (
                <button
                  key={stg.id}
                  id={`journey-node-${stg.id}`}
                  type="button"
                  onClick={() => onNavigateStage && onNavigateStage(stg.id)}
                  disabled={!onNavigateStage}
                  className={`text-left rounded-2xl p-4 sm:p-5 transition-all relative flex flex-col justify-between overflow-hidden group cursor-pointer ${gradientBoxClass} ${activeRing}`}
                >
                  {/* Top Row: Icon + Badges */}
                  <div className="space-y-3 w-full relative z-10">
                    <div className="flex items-center justify-between">
                      {/* Pillar Badge */}
                      <span
                        className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider border ${badgePillarStyle}`}
                      >
                        Pilar {stg.nodeNumber} • {stg.themeRole}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${statusBadgeStyle}`}
                      >
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-300 shrink-0" />}
                        <span>{isCurrent ? 'Aktif Sekarang' : isCompleted ? 'Selesai' : 'Tahap Berikutnya'}</span>
                      </span>
                    </div>

                    {/* Main Title & Icon Header */}
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0 mt-0.5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs transition-transform ${iconStyle}`}
                        >
                          {isCompleted && !isCurrent ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>

                        {/* Glowing ring indicator when active */}
                        {isCurrent && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span
                              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                stg.themeColor === 'rose'
                                  ? 'bg-rose-400'
                                  : stg.themeColor === 'cobalt'
                                  ? 'bg-sky-400'
                                  : 'bg-emerald-400'
                              }`}
                            ></span>
                            <span
                              className={`relative inline-flex rounded-full h-3 w-3 ${
                                stg.themeColor === 'rose'
                                  ? 'bg-rose-500 shadow-rose-500/50'
                                  : stg.themeColor === 'cobalt'
                                  ? 'bg-blue-500 shadow-blue-500/50'
                                  : 'bg-emerald-500 shadow-emerald-500/50'
                              }`}
                            ></span>
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className={`text-base font-black tracking-tight leading-snug drop-shadow-xs ${titleColor}`}>
                          {stg.title}
                        </h3>
                        <p className={`text-xs mt-0.5 leading-snug ${subtitleColor}`}>
                          {stg.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Lead Summary paragraph */}
                    {!compact && (
                      <p className={`text-[11px] leading-relaxed pt-1 line-clamp-2 ${summaryColor}`}>
                        {stg.leadSummary}
                      </p>
                    )}

                    {/* Micro Tags / Key Interventions */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stg.keyTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${tagStyle}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Metric / SLA */}
                  <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-between text-[11px] relative z-10">
                    <div className="flex items-center gap-1 text-slate-300 font-mono text-[10px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{stg.slaText}</span>
                    </div>

                    <div
                      className={`font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs ${footerColor}`}
                    >
                      <span>Buka Pilar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resilience Journey Roadmap Modal */}
      <ResilienceJourneyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activeStage={currentStage}
        onSelectStage={(stg) => {
          if (onNavigateStage) onNavigateStage(stg);
        }}
      />
    </>
  );
};

