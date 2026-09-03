import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import createGlobe, { Globe } from 'cobe';
import { RegionRiskData } from '../types';
import {
  Globe2,
  RotateCcw,
  Play,
  Pause,
  MapPin,
  AlertTriangle,
  Radio,
  Eye,
  Info,
  Layers,
  Sparkles,
  Compass,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface Indonesia3DGlobeProps {
  regions: RegionRiskData[];
  selectedRegion: RegionRiskData;
  onSelectRegion: (region: RegionRiskData) => void;
  onOpenEmergencyAction: (region: RegionRiskData) => void;
  onOpenRadar?: (region: RegionRiskData) => void;
  isDaerah?: boolean;
}

// Pusat Komando Nasional SIGAP (Jakarta)
const JAKARTA_COORDINATES: [number, number] = [-6.2088, 106.8456];

// Center of Indonesian Archipelago (approx. 2°S, 117°E) in radians
const INDONESIA_CENTER_PHI = (117 * Math.PI) / 180; // ~2.04 radians
const INDONESIA_CENTER_THETA = (-2.5 * Math.PI) / 180; // ~-0.043 radians

export const Indonesia3DGlobe: React.FC<Indonesia3DGlobeProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  onOpenEmergencyAction,
  onOpenRadar,
  isDaerah = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [showArcs, setShowArcs] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'darurat' | 'siaga'>('all');

  // Dragging & Interaction State
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const basePhiRef = useRef(INDONESIA_CENTER_PHI);
  const baseThetaRef = useRef(INDONESIA_CENTER_THETA);
  const targetPhiRef = useRef(INDONESIA_CENTER_PHI);
  const targetThetaRef = useRef(INDONESIA_CENTER_THETA);
  const isPausedRef = useRef(false);

  // Filtered regions for Indonesia
  const displayRegions = useMemo(() => {
    if (activeTab === 'darurat') return regions.filter((r) => r.status === 'darurat');
    if (activeTab === 'siaga') return regions.filter((r) => r.status === 'siaga');
    return regions;
  }, [regions, activeTab]);

  // Generate Cobe Markers for Indonesian locations
  const cobeMarkers = useMemo(() => {
    return displayRegions.map((reg) => {
      const isSelected = reg.id === selectedRegion.id;
      const isDarurat = reg.status === 'darurat';
      const isSiaga = reg.status === 'siaga';

      // RGB color arrays normalized 0-1
      const color: [number, number, number] = isDarurat
        ? [0.95, 0.15, 0.25] // Bright Red
        : isSiaga
        ? [0.96, 0.62, 0.08] // Amber
        : [0.06, 0.72, 0.51]; // Emerald

      return {
        id: reg.id,
        location: [reg.lat, reg.lng] as [number, number],
        size: isSelected ? 0.045 : isDarurat ? 0.035 : 0.025,
        color,
      };
    });
  }, [displayRegions, selectedRegion.id]);

  // Generate Telemetry Arcs connecting Jakarta National Center to Crisis Hotspots
  const cobeArcs = useMemo(() => {
    if (!showArcs) return [];

    return displayRegions
      .filter((reg) => reg.status === 'darurat' || reg.status === 'siaga')
      .map((reg) => {
        const isDarurat = reg.status === 'darurat';
        return {
          from: JAKARTA_COORDINATES,
          to: [reg.lat, reg.lng] as [number, number],
          color: isDarurat ? ([0.95, 0.2, 0.3] as [number, number, number]) : ([0.2, 0.65, 0.95] as [number, number, number]),
          id: `arc-${reg.id}`,
        };
      });
  }, [displayRegions, showArcs]);

  // Pointer event handlers for drag rotation
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      basePhiRef.current += dragOffset.current.phi;
      baseThetaRef.current += dragOffset.current.theta;
      targetPhiRef.current = basePhiRef.current;
      targetThetaRef.current = baseThetaRef.current;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    isPausedRef.current = !isRotating;
  }, [isRotating]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 400,
        };
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerUp]);

  // Function to smoothly refocus globe directly onto Indonesia
  const handleRefocusIndonesia = useCallback(() => {
    soundEffects.playClick();
    targetPhiRef.current = INDONESIA_CENTER_PHI;
    targetThetaRef.current = INDONESIA_CENTER_THETA;
  }, []);

  // Function to focus onto a specific region's coordinates
  const handleFlyToRegion = useCallback((region: RegionRiskData) => {
    soundEffects.playClick();
    onSelectRegion(region);
    // In cobe: longitude to phi, latitude to theta
    // lng in radians:
    const targetPhi = (region.lng * Math.PI) / 180;
    const targetTheta = (region.lat * Math.PI) / 180;
    targetPhiRef.current = targetPhi;
    targetThetaRef.current = targetTheta;
  }, [onSelectRegion]);

  // Main Cobe WebGL Initializer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId: number;
    let width = canvas.offsetWidth;
    if (width === 0) width = 500;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width,
      height: width,
      phi: basePhiRef.current,
      theta: baseThetaRef.current,
      dark: 1, // Dark Ops Mode
      diffuse: 1.3,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [0.12, 0.18, 0.28], // Deep Indonesian Maritime Navy
      markerColor: [0.95, 0.2, 0.3], // High-contrast crisis red
      glowColor: [0.14, 0.32, 0.65], // Atmospheric cobalt glow
      markerElevation: 0.018,
      markers: cobeMarkers,
      arcs: cobeArcs,
      arcColor: [0.25, 0.65, 0.95],
      arcWidth: 0.7,
      arcHeight: 0.25,
      opacity: 0.9,
    });

    const animate = () => {
      // Smooth interpolation toward target coordinates (smooth transition)
      if (Math.abs(targetPhiRef.current - basePhiRef.current) > 0.001) {
        basePhiRef.current += (targetPhiRef.current - basePhiRef.current) * 0.06;
      } else if (isRotating && !isPausedRef.current) {
        // Slow subtle rotation when idle
        basePhiRef.current += 0.0015;
        targetPhiRef.current = basePhiRef.current;
      }

      if (Math.abs(targetThetaRef.current - baseThetaRef.current) > 0.001) {
        baseThetaRef.current += (targetThetaRef.current - baseThetaRef.current) * 0.06;
      }

      if (globeRef.current) {
        globeRef.current.update({
          phi: basePhiRef.current + dragOffset.current.phi,
          theta: Math.max(-0.4, Math.min(0.4, baseThetaRef.current + dragOffset.current.theta)),
          markers: cobeMarkers,
          arcs: cobeArcs,
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    setTimeout(() => {
      if (canvas) canvas.style.opacity = '1';
    }, 150);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [cobeMarkers, cobeArcs, isRotating]);

  // Handle container resizing
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !globeRef.current) return;
      const width = canvasRef.current.offsetWidth;
      if (width > 0) {
        globeRef.current.update({ width, height: width });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[520px] bg-gradient-to-b from-[#0B0F1A] via-[#0D1527] to-[#080B14] rounded-b-xl overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Grid Accent & Atmospheric Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Floating HUD: Controls & Info */}
      <div className="relative z-10 p-4 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-sky-400 shadow-md">
            <Globe2 className="w-4 h-4 animate-spin" style={{ animationDuration: '24s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Globe 3D Telemetri Nasional
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-900/60 text-sky-300 border border-blue-500/30">
                Fokus Kepulauan Indonesia
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Koordinat: 0.7893° S, 113.9213° E &bull; 12 Titik Hotspot Respon Terpadu
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Filter Status Pills */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua ({regions.length})
            </button>
            <button
              onClick={() => setActiveTab('darurat')}
              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                activeTab === 'darurat' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:bg-rose-950/40'
              }`}
            >
              Darurat
            </button>
            <button
              onClick={() => setActiveTab('siaga')}
              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                activeTab === 'siaga' ? 'bg-amber-500 text-white' : 'text-amber-400 hover:bg-amber-950/40'
              }`}
            >
              Siaga
            </button>
          </div>

          {/* Toggle Telemetry Arcs */}
          <button
            onClick={() => setShowArcs((prev) => !prev)}
            title="Toggle Jalur Komunikasi Pusat ke Daerah"
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
              showArcs
                ? 'bg-blue-950/80 border-blue-500/50 text-sky-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">Jalur Telemetri</span>
          </button>

          {/* Toggle Auto Rotation */}
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            title={isRotating ? 'Jeda Rotasi' : 'Lanjutkan Rotasi'}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Refocus Indonesia */}
          <button
            onClick={handleRefocusIndonesia}
            title="Pusatkan Kembali ke Indonesia"
            className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Fokus Indonesia</span>
          </button>
        </div>
      </div>

      {/* Main 3D Interactive Canvas */}
      <div className="relative flex-1 flex items-center justify-center p-2 min-h-[380px]">
        <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            className="w-full h-full cursor-grab transition-opacity duration-1000 rounded-full"
            style={{ opacity: 0, touchAction: 'none' }}
          />

          {/* Compass Rose Indicator Overlay */}
          <div className="absolute top-2 right-2 pointer-events-none flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950/70 px-2 py-1 rounded-md border border-white/10 backdrop-blur-md">
            <Compass className="w-3 h-3 text-sky-400 animate-spin" style={{ animationDuration: '30s' }} />
            <span>118°E Equatorial</span>
          </div>

          {/* Active Hover / Floating Target Info Card */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto bg-slate-950/90 border border-rose-950/80 rounded-xl p-2.5 shadow-2xl backdrop-blur-md max-w-sm w-full mx-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  selectedRegion.status === 'darurat'
                    ? 'bg-rose-500 animate-ping'
                    : selectedRegion.status === 'siaga'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{selectedRegion.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({selectedRegion.province})</span>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-2">
                  <span className="font-mono text-sky-300">
                    {selectedRegion.lat.toFixed(2)}°, {selectedRegion.lng.toFixed(2)}°
                  </span>
                  <span>&bull;</span>
                  <span className="text-amber-300 font-semibold">{selectedRegion.crisisType.split(',')[0]}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenEmergencyAction(selectedRegion)}
              className="px-2.5 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-rose-600 to-blue-600 hover:from-rose-500 hover:to-blue-500 rounded-lg shadow-sm transition-all shrink-0"
            >
              Tindak
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Region Quick Fly-To Strip */}
      <div className="relative z-10 p-2.5 bg-slate-950/90 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] font-bold uppercase text-sky-400 shrink-0 pl-1">
          Arahkan Globe ke:
        </span>
        {regions.map((reg) => {
          const isSelected = reg.id === selectedRegion.id;
          return (
            <button
              key={reg.id}
              onClick={() => handleFlyToRegion(reg)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold ring-1 ring-white/30 shadow-md'
                  : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  reg.status === 'darurat'
                    ? 'bg-rose-500'
                    : reg.status === 'siaga'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span>{reg.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
