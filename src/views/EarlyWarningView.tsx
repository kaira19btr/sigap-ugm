import React, { useState, useMemo } from 'react';
import { RegionRiskData, UserRole, UserProfile } from '../types';
import { RealEarlyWarningMap } from '../components/RealEarlyWarningMap';
import { Indonesia3DGlobe } from '../components/Indonesia3DGlobe';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { EarlyWarningMetricModal, EarlyWarningMetricType } from '../components/EarlyWarningMetricModal';
import { RegionRadarChartModal } from '../components/RegionRadarChartModal';
import { TechnicalArchitectureModal } from '../components/TechnicalArchitectureModal';
import { GradientButton } from '@/components/ui/gradient-button';
import {
  AlertTriangle,
  Radio,
  Clock,
  Send,
  MapPin,
  TrendingUp,
  Droplets,
  Coins,
  ArrowUpRight,
  Filter,
  Layers,
  ChevronRight,
  Sparkles,
  Info,
  MousePointerClick,
  Radar,
  Workflow,
  Lock,
  Globe2,
  Map as MapIcon,
} from 'lucide-react';

interface EarlyWarningViewProps {
  regions: RegionRiskData[];
  selectedRegion: RegionRiskData;
  onSelectRegion: (region: RegionRiskData) => void;
  onOpenEmergencyAction: (region: RegionRiskData) => void;
  currentRole?: UserRole;
  activeProfile?: UserProfile;
}

export const EarlyWarningView: React.FC<EarlyWarningViewProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  onOpenEmergencyAction,
  currentRole = 'admin_pusat',
  activeProfile,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'darurat' | 'siaga' | 'normal'>('all');
  const [mapDisplayMode, setMapDisplayMode] = useState<'globe3d' | 'map2d'>('globe3d');
  const [activeMetricModal, setActiveMetricModal] = useState<EarlyWarningMetricType | null>(null);
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  // Filter regions based on active role (Role-Based Access Control)
  const isDaerah = currentRole === 'admin_daerah';
  const targetRegionName = activeProfile?.region || 'Kab. Cianjur';

  const scopedRegions = useMemo(() => {
    if (isDaerah) {
      return regions.filter((r) => r.regency.toLowerCase().includes('cianjur') || r.regency.toLowerCase().includes(targetRegionName.toLowerCase()));
    }
    return regions;
  }, [regions, isDaerah, targetRegionName]);

  // Ensure active selected region belongs to scopedRegions
  const effectiveSelectedRegion = useMemo(() => {
    const exists = scopedRegions.find((r) => r.id === selectedRegion?.id);
    return exists || scopedRegions[0] || selectedRegion;
  }, [scopedRegions, selectedRegion]);

  const filteredRegions = scopedRegions.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const daruratCount = scopedRegions.filter((r) => r.status === 'darurat').length;
  const siagaCount = scopedRegions.filter((r) => r.status === 'siaga').length;

  return (
    <div id="early-warning-module" className="p-6 space-y-6">
      {/* Header Title & Quick Architecture Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Modul 01 • Deteksi Dini &amp; Peringatan (Sensing)</span>
            {isDaerah && (
              <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Cakupan Wilayah Kerja: {targetRegionName}</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {isDaerah ? `Deteksi Dini & Peringatan • ${targetRegionName}` : 'Deteksi Dini & Peringatan Bencana'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isDaerah
              ? `Pemantauan telemetri multi-bahaya real-time khusus wilayah kerja ${targetRegionName} (${scopedRegions.length} titik operasional) dengan SLA adaptif`
              : 'Pemantauan telemetri multi-bahaya real-time di seluruh wilayah target nasional dengan SLA adaptif dan matriks 7 dimensi risiko'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 transition-all"
            title="Buka Diagram Arsitektur Teknis Sistem Terintegrasi"
          >
            <Workflow className="w-4 h-4 text-blue-600" />
            <span>Diagram Arsitektur Teknis</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive KPI Metrics with Hover Expand & Counter Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Wilayah Darurat */}
        <div
          id="card-kpi-wilayah-darurat"
          onClick={() => setActiveMetricModal('darurat')}
          className="bg-gradient-to-br from-white via-rose-50/50 to-amber-50/30 p-4 rounded-xl border border-rose-200/80 shadow-xs hover:shadow-xl hover:border-rose-400 hover:ring-2 hover:ring-rose-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-rose-500/15 via-rose-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500"></div>
          <div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-rose-700 transition-colors">Wilayah Darurat</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-rose-600 mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={daruratCount} duration={1200} />
              <span className="text-xs font-sans font-bold text-slate-400">Wilayah</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-rose-600 font-semibold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+1 eskalasi 24 jam terakhir</span>
            </div>
            <div className="text-[10px] text-slate-500 group-hover:text-rose-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik rincian krisis &amp; SOP</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-rose-600/20 group-hover:scale-110">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Wilayah Siaga */}
        <div
          id="card-kpi-wilayah-siaga"
          onClick={() => setActiveMetricModal('siaga')}
          className="bg-gradient-to-br from-white via-amber-50/50 to-rose-50/30 p-4 rounded-xl border border-amber-200/80 shadow-xs hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/15 via-amber-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-blue-600"></div>
          <div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">Wilayah Siaga</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-amber-600 mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={siagaCount} duration={1200} />
              <span className="text-xs font-sans font-bold text-slate-400">Wilayah</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
              <Sparkles className="w-3 h-3" />
              <span>Pra-aktivasi logistik aktif</span>
            </div>
            <div className="text-[10px] text-slate-500 group-hover:text-amber-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik pantauan indikator</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-amber-500/20 group-hover:scale-110">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Avg. Deteksi Dini */}
        <div
          id="card-kpi-deteksi-dini"
          onClick={() => setActiveMetricModal('detection')}
          className="bg-gradient-to-br from-white via-blue-50/50 to-rose-50/30 p-4 rounded-xl border border-blue-200/80 shadow-xs hover:shadow-xl hover:border-blue-400 hover:ring-2 hover:ring-blue-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/15 via-blue-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-rose-500 to-amber-500"></div>
          <div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Avg. Deteksi Dini</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 group-hover:text-blue-600 transition-colors mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={isDaerah ? 3.8 : 4.2} duration={1200} decimalPlaces={1} />
              <span className="text-xs font-sans font-bold text-slate-500">Hari</span>
            </div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">
              {isDaerah ? 'Lead time telemetri lokal Cianjur' : 'Lead time sebelum puncak krisis'}
            </div>
            <div className="text-[10px] text-slate-500 group-hover:text-blue-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik analisis sensor AI</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-blue-600/20 group-hover:scale-110">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Notifikasi Terkirim */}
        <div
          id="card-kpi-notifikasi-terkirim"
          onClick={() => setActiveMetricModal('notifikasi')}
          className="bg-gradient-to-br from-white via-indigo-50/50 to-rose-50/30 p-4 rounded-xl border border-indigo-200/80 shadow-xs hover:shadow-xl hover:border-indigo-400 hover:ring-2 hover:ring-indigo-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/15 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-blue-600 to-indigo-700"></div>
          <div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">Notifikasi Terkirim</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 group-hover:text-indigo-600 transition-colors mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={isDaerah ? 342 : 1248} duration={1200} />
              <span className="text-xs font-sans font-bold text-slate-400">Pesan</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              {isDaerah ? '100% diterima Tagana & Posko Wilayah' : '99.8% keterbacaan petugas'}
            </div>
            <div className="text-[10px] text-slate-500 group-hover:text-indigo-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik log gateway broadcast</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-rose-600 text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-indigo-600/20 group-hover:scale-110">
            <Send className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Interactive Map + Active Region Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-8 bg-gradient-to-br from-white via-slate-50/90 to-rose-50/20 rounded-xl border border-rose-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-gradient-to-r from-[#0F172A] via-[#1A0B22] to-[#0B1328] text-white border-b border-rose-950/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                {isDaerah ? `Pantauan Wilayah Kerja (${targetRegionName})` : 'Pusat Pantauan Kerentanan Wilayah'}
              </span>
              <span className="text-[10px] bg-rose-950/60 text-rose-300 border border-rose-800/40 px-2 py-0.5 rounded font-mono font-bold">
                {filteredRegions.length} Titik Fokus Aktif
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* View Mode Toggle: 3D Globe vs 2D GIS Map */}
              <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 shadow-xs">
                <button
                  id="btn-mode-globe-3d"
                  onClick={() => setMapDisplayMode('globe3d')}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer ${
                    mapDisplayMode === 'globe3d'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5 text-sky-300" />
                  <span>Globe 3D Indonesia</span>
                </button>
                <button
                  id="btn-mode-map-2d"
                  onClick={() => setMapDisplayMode('map2d')}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer ${
                    mapDisplayMode === 'map2d'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5 text-sky-300" />
                  <span>Peta 2D GIS</span>
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`text-[11px] font-semibold px-2 py-1 rounded transition-all cursor-pointer ${
                    filterStatus === 'all'
                      ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Semua ({scopedRegions.length})
                </button>
                <button
                  onClick={() => setFilterStatus('darurat')}
                  className={`text-[11px] font-semibold px-2 py-1 rounded transition-all cursor-pointer ${
                    filterStatus === 'darurat'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-rose-400 hover:bg-rose-950/40'
                  }`}
                >
                  Darurat ({daruratCount})
                </button>
                <button
                  onClick={() => setFilterStatus('siaga')}
                  className={`text-[11px] font-semibold px-2 py-1 rounded transition-all cursor-pointer ${
                    filterStatus === 'siaga'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-amber-400 hover:bg-amber-950/40'
                  }`}
                >
                  Siaga ({siagaCount})
                </button>
                <button
                  onClick={() => setFilterStatus('normal')}
                  className={`text-[11px] font-semibold px-2 py-1 rounded transition-all cursor-pointer ${
                    filterStatus === 'normal'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  Normal
                </button>
              </div>
            </div>
          </div>

          {/* Visualization: Globe 3D Indonesia or Real Interactive 2D Map */}
          <div className="relative">
            {mapDisplayMode === 'globe3d' ? (
              <Indonesia3DGlobe
                regions={filteredRegions}
                selectedRegion={effectiveSelectedRegion}
                onSelectRegion={onSelectRegion}
                onOpenEmergencyAction={onOpenEmergencyAction}
                onOpenRadar={(region) => {
                  onSelectRegion(region);
                  setIsRadarModalOpen(true);
                }}
                isDaerah={isDaerah}
              />
            ) : (
              <RealEarlyWarningMap
                regions={filteredRegions}
                selectedRegion={effectiveSelectedRegion}
                onSelectRegion={onSelectRegion}
                onOpenEmergencyAction={onOpenEmergencyAction}
                onOpenRadar={(region) => {
                  onSelectRegion(region);
                  setIsRadarModalOpen(true);
                }}
                isDaerah={isDaerah}
                regionTitle={targetRegionName}
              />
            )}
          </div>

          {/* Quick Region Selector Strip (Only shown in 2D mode, since 3D globe has built-in quick strip) */}
          {mapDisplayMode === 'map2d' && (
            <div className="p-3 bg-gradient-to-r from-[#0B0F19] via-[#1A0B22] to-[#0A1325] border-t border-rose-950/40 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-rose-400 uppercase shrink-0 pl-1">
                Fokus Wilayah:
              </span>
              {scopedRegions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => onSelectRegion(reg)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                    effectiveSelectedRegion.id === reg.id
                      ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      reg.status === 'darurat'
                        ? 'bg-rose-500 animate-ping'
                        : reg.status === 'siaga'
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                  ></span>
                  <span>{reg.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Region Detailed Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-white via-rose-50/40 to-amber-50/20 rounded-xl border border-rose-200/70 shadow-sm p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-rose-700 uppercase">
                  Detail Wilayah Terpilih
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{effectiveSelectedRegion.name}</h3>
                <p className="text-xs text-slate-500">
                  {effectiveSelectedRegion.regency}, {effectiveSelectedRegion.province}
                </p>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                  effectiveSelectedRegion.status === 'darurat'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : effectiveSelectedRegion.status === 'siaga'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {effectiveSelectedRegion.status}
              </span>
            </div>

            {/* Crisis Type Summary & SLA Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1A0B22] to-[#0A1325] text-white border border-rose-900/40 space-y-2 shadow-sm">
              <div>
                <span className="text-[10px] font-semibold text-rose-400 uppercase block">
                  Pemicu Utama Anomali
                </span>
                <p className="text-xs font-bold text-slate-100 mt-0.5">
                  {effectiveSelectedRegion.crisisType}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-1 border-t border-rose-900/40 text-xs">
                <span className="text-slate-400">Target SLA Penyaluran:</span>
                <span className="font-bold font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
                  {effectiveSelectedRegion.slaTargetDays} Hari Kerja
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Estimasi Terdampak:</span>
                <span className="font-bold text-slate-100">
                  {effectiveSelectedRegion.affectedPopulation.toLocaleString('id-ID')} Jiwa
                </span>
              </div>
            </div>

            {/* Key Telemetry Metrics */}
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-700 font-semibold">Indeks Kerentanan</span>
                  <span className="font-bold font-mono text-slate-900">
                    {effectiveSelectedRegion.vulnerabilityIndex} / 10.0
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      effectiveSelectedRegion.vulnerabilityIndex >= 8
                        ? 'bg-rose-500'
                        : effectiveSelectedRegion.vulnerabilityIndex >= 6
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${effectiveSelectedRegion.vulnerabilityIndex * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-white via-blue-50/50 to-white border border-blue-200/70 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-medium">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    <span>Curah Hujan</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {effectiveSelectedRegion.rainfall}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-gradient-to-br from-white via-amber-50/50 to-white border border-amber-200/70 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-medium">
                    <Coins className="w-3.5 h-3.5 text-amber-600" />
                    <span>Harga Beras</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {effectiveSelectedRegion.ricePrice}
                  </div>
                </div>
              </div>

              {/* Automatic Target DTSEN & Projected Budget Pill */}
              <div className="p-2.5 rounded-lg bg-slate-100/90 border border-slate-200 text-[11px] space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Sasaran DTSEN:</span>
                  <span className="font-mono font-bold text-slate-900">
                    ~{Math.round(effectiveSelectedRegion.affectedPopulation / 3.8).toLocaleString('id-ID')} KK
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Kebutuhan DSP:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    Rp {((Math.round(effectiveSelectedRegion.affectedPopulation / 3.8) * 600000) / 1_000_000_000).toFixed(2)} Miliar
                  </span>
                </div>
              </div>
            </div>

            {/* Radar 7-Indikator Quick View Button */}
            <GradientButton
              size="sm"
              variant="cobalt"
              onClick={() => setIsRadarModalOpen(true)}
              className="!w-full !min-w-0"
            >
              <Radar className="w-4 h-4 mr-1.5 text-sky-200" />
              <span>Lihat Grafik Radar 7 Indikator</span>
            </GradientButton>

            {/* Role-Specific Action Trigger Button */}
            <GradientButton
              id="btn-tinjau-tindakan-darurat"
              size="sm"
              variant={isDaerah ? 'amber' : 'rose'}
              onClick={() => onOpenEmergencyAction(effectiveSelectedRegion)}
              className="!w-full !min-w-0 shadow-md"
            >
              <span>
                {isDaerah
                  ? `Aktivasi Lapangan & Respon Cepat Daerah`
                  : `Otorisasi Respon Cepat & DSP Nasional`}
              </span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Early Warning Metric Modal */}
      <EarlyWarningMetricModal
        metricType={activeMetricModal}
        isOpen={!!activeMetricModal}
        onClose={() => setActiveMetricModal(null)}
        regions={scopedRegions}
        onSelectRegion={onSelectRegion}
        onOpenEmergencyAction={onOpenEmergencyAction}
      />

      {/* Region 7-Indicator Radar Chart Modal */}
      <RegionRadarChartModal
        region={effectiveSelectedRegion}
        isOpen={isRadarModalOpen}
        onClose={() => setIsRadarModalOpen(false)}
        onOpenEmergencyAction={onOpenEmergencyAction}
      />

      {/* Technical Architecture Modal */}
      <TechnicalArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
};
