import React, { useState } from 'react';
import { RegionRiskData } from '../types';
import { RealEarlyWarningMap } from '../components/RealEarlyWarningMap';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { EarlyWarningMetricModal, EarlyWarningMetricType } from '../components/EarlyWarningMetricModal';
import { RegionRadarChartModal } from '../components/RegionRadarChartModal';
import { TechnicalArchitectureModal } from '../components/TechnicalArchitectureModal';
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
  ShieldCheck,
} from 'lucide-react';

interface EarlyWarningViewProps {
  regions: RegionRiskData[];
  selectedRegion: RegionRiskData;
  onSelectRegion: (region: RegionRiskData) => void;
  onOpenEmergencyAction: (region: RegionRiskData) => void;
}

export const EarlyWarningView: React.FC<EarlyWarningViewProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  onOpenEmergencyAction,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'darurat' | 'siaga' | 'normal'>('all');
  const [activeMetricModal, setActiveMetricModal] = useState<EarlyWarningMetricType | null>(null);
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  const filteredRegions = regions.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const daruratCount = regions.filter((r) => r.status === 'darurat').length;
  const siagaCount = regions.filter((r) => r.status === 'siaga').length;

  return (
    <div id="early-warning-module" className="p-6 space-y-6">
      {/* Header Title & Quick Architecture Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Modul 01 • Deteksi Dini &amp; Peringatan (Sensing)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Deteksi Dini &amp; Peringatan Bencana
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemantauan telemetri multi-bahaya real-time di 12 wilayah target dengan SLA adaptif dan matriks 7 dimensi risiko
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
          className="bg-white p-4 rounded-xl border border-rose-200 shadow-xs hover:shadow-xl hover:border-rose-400 hover:ring-2 hover:ring-rose-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-rose-700 transition-colors">Wilayah Darurat</span>
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
            <div className="text-[10px] text-slate-400 group-hover:text-rose-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik rincian krisis &amp; SOP</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 group-hover:bg-rose-600 group-hover:text-white text-rose-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Wilayah Siaga */}
        <div
          id="card-kpi-wilayah-siaga"
          onClick={() => setActiveMetricModal('siaga')}
          className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-700 transition-colors">Wilayah Siaga</span>
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
            <div className="text-[10px] text-slate-400 group-hover:text-amber-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik pantauan indikator</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-500 group-hover:text-white text-amber-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Avg. Deteksi Dini */}
        <div
          id="card-kpi-deteksi-dini"
          onClick={() => setActiveMetricModal('detection')}
          className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs hover:shadow-xl hover:border-blue-400 hover:ring-2 hover:ring-blue-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">Avg. Deteksi Dini</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 group-hover:text-blue-600 transition-colors mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={4.2} duration={1200} decimalPlaces={1} />
              <span className="text-xs font-sans font-bold text-slate-500">Hari</span>
            </div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">
              Lead time sebelum puncak krisis
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-blue-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik analisis sensor AI</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Notifikasi Terkirim */}
        <div
          id="card-kpi-notifikasi-terkirim"
          onClick={() => setActiveMetricModal('notifikasi')}
          className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs hover:shadow-xl hover:border-indigo-400 hover:ring-2 hover:ring-indigo-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-700 transition-colors">Notifikasi Terkirim</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 group-hover:text-indigo-600 transition-colors mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={1248} duration={1200} />
              <span className="text-xs font-sans font-bold text-slate-400">Pesan</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              99.8% keterbacaan petugas
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-indigo-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik log gateway broadcast</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Send className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Interactive Map + Active Region Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Peta Pantauan Kerentanan Wilayah
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">
                {filteredRegions.length} Titik Fokus Aktif
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setFilterStatus('all')}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all ${
                  filterStatus === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Semua ({regions.length})
              </button>
              <button
                onClick={() => setFilterStatus('darurat')}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all ${
                  filterStatus === 'darurat'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-600 hover:bg-rose-50'
                }`}
              >
                Darurat ({daruratCount})
              </button>
              <button
                onClick={() => setFilterStatus('siaga')}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all ${
                  filterStatus === 'siaga'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-600 hover:bg-amber-50'
                }`}
              >
                Siaga ({siagaCount})
              </button>
              <button
                onClick={() => setFilterStatus('normal')}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all ${
                  filterStatus === 'normal'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Normal
              </button>
            </div>
          </div>

          {/* Real Interactive Geolocation Map */}
          <div className="relative">
            <RealEarlyWarningMap
              regions={filteredRegions}
              selectedRegion={selectedRegion}
              onSelectRegion={onSelectRegion}
              onOpenEmergencyAction={onOpenEmergencyAction}
              onOpenRadar={(region) => {
                onSelectRegion(region);
                setIsRadarModalOpen(true);
              }}
            />
          </div>

          {/* Quick Region Selector Strip */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0 pl-1">
              Fokus Wilayah:
            </span>
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => onSelectRegion(reg)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                  selectedRegion.id === reg.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    reg.status === 'darurat'
                      ? 'bg-rose-500'
                      : reg.status === 'siaga'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                ></span>
                <span>{reg.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Region Detailed Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Detail Wilayah Terpilih
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedRegion.name}</h3>
                <p className="text-xs text-slate-500">
                  {selectedRegion.regency}, {selectedRegion.province}
                </p>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                  selectedRegion.status === 'darurat'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : selectedRegion.status === 'siaga'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {selectedRegion.status}
              </span>
            </div>

            {/* Crisis Type Summary & SLA */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                  Pemicu Utama Anomali
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  {selectedRegion.crisisType}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                <span className="text-slate-500">Target SLA Penyaluran:</span>
                <span className="font-bold font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedRegion.slaTargetDays} Hari Kerja
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Estimasi Terdampak:</span>
                <span className="font-bold text-slate-800">
                  {selectedRegion.affectedPopulation.toLocaleString('id-ID')} Jiwa
                </span>
              </div>
            </div>

            {/* Key Telemetry Metrics */}
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Indeks Kerentanan</span>
                  <span className="font-bold font-mono text-slate-900">
                    {selectedRegion.vulnerabilityIndex} / 10.0
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      selectedRegion.vulnerabilityIndex >= 8
                        ? 'bg-rose-500'
                        : selectedRegion.vulnerabilityIndex >= 6
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${selectedRegion.vulnerabilityIndex * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>Curah Hujan</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    {selectedRegion.rainfall}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>Harga Beras</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    {selectedRegion.ricePrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Radar 7-Indikator Quick View Button */}
            <button
              onClick={() => setIsRadarModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Radar className="w-4 h-4 text-blue-600" />
              <span>Lihat Grafik Radar 7 Indikator</span>
            </button>

            {/* Action Trigger Button */}
            <button
              id="btn-tinjau-tindakan-darurat"
              onClick={() => onOpenEmergencyAction(selectedRegion)}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Tinjau Tindakan Darurat</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Early Warning Metric Modal */}
      <EarlyWarningMetricModal
        metricType={activeMetricModal}
        isOpen={!!activeMetricModal}
        onClose={() => setActiveMetricModal(null)}
        regions={regions}
        onSelectRegion={onSelectRegion}
        onOpenEmergencyAction={onOpenEmergencyAction}
      />

      {/* Region 7-Indicator Radar Chart Modal */}
      <RegionRadarChartModal
        region={selectedRegion}
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
