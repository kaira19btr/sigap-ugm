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
  EyeOff,
  Info,
  Layers,
  Sparkles,
  Compass,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Tag,
  Crosshair,
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

// Center of Indonesian Archipelago (approx. 2.5°S, 118°E) in Cobe coordinates
// In Cobe, a longitude lng is facing the camera center when phi = (270 - lng) * PI / 180
const INDONESIA_CENTER_PHI = ((270 - 118) * Math.PI) / 180; // ~2.653 radians
const INDONESIA_CENTER_THETA = (-2.5 * Math.PI) / 180; // ~-0.0436 radians

// Cobe surface radius with marker elevation
const COBE_RADIUS = 0.8 + 0.018;

// Convert [lat, lng] to 3D Cartesian coordinates according to Cobe internal convention
function latLngToCobeVector([lat, lng]: [number, number]): [number, number, number] {
  const r = (lat * Math.PI) / 180;
  const a = (lng * Math.PI) / 180 - Math.PI;
  const o = Math.cos(r);
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)];
}

// Project 3D coordinate on globe to 2D screen percentage (0-100%) and front-facing visibility
function projectMarkerToScreen(
  location: [number, number],
  phi: number,
  theta: number,
  scale: number
): { xPercent: number; yPercent: number; isVisible: boolean; zDepth: number } {
  const v = latLngToCobeVector(location);
  const t: [number, number, number] = [
    v[0] * COBE_RADIUS,
    v[1] * COBE_RADIUS,
    v[2] * COBE_RADIUS,
  ];

  const r = Math.cos(theta);
  const a = Math.cos(phi);
  const o = Math.sin(theta);
  const i = Math.sin(phi);

  const c = a * t[0] + i * t[2];
  const s = i * o * t[0] + r * t[1] - a * o * t[2];
  const zDepth = -i * r * t[0] + o * t[1] + a * r * t[2];

  // Visible when facing front of camera
  const isVisible = zDepth > 0.05;

  const xPercent = ((c * scale + 1) / 2) * 100;
  const yPercent = ((-s * scale + 1) / 2) * 100;

  return { xPercent, yPercent, isVisible, zDepth };
}

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
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'darurat' | 'siaga'>('all');
  const [zoom, setZoom] = useState<number>(1.15);

  // Dragging & Interaction State
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const basePhiRef = useRef(INDONESIA_CENTER_PHI);
  const baseThetaRef = useRef(INDONESIA_CENTER_THETA);
  const targetPhiRef = useRef(INDONESIA_CENTER_PHI);
  const targetThetaRef = useRef(INDONESIA_CENTER_THETA);
  const isPausedRef = useRef(false);

  // Label DOM Refs & State Refs for 60fps Animation Loop
  const labelElementRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const showLabelsRef = useRef<boolean>(true);
  const displayRegionsRef = useRef<RegionRiskData[]>([]);

  // Smooth Zoom State
  const zoomRef = useRef<number>(1.15);
  const targetZoomRef = useRef<number>(1.15);
  const touchDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1.15);

  // Filtered regions for Indonesia
  const displayRegions = useMemo(() => {
    if (activeTab === 'darurat') return regions.filter((r) => r.status === 'darurat');
    if (activeTab === 'siaga') return regions.filter((r) => r.status === 'siaga');
    return regions;
  }, [regions, activeTab]);

  useEffect(() => {
    showLabelsRef.current = showLabels;
  }, [showLabels]);

  useEffect(() => {
    displayRegionsRef.current = displayRegions;
  }, [displayRegions]);

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
    targetZoomRef.current = 1.15;
    setZoom(1.15);
  }, []);

  // Zoom Action Handlers
  const handleZoomIn = useCallback(() => {
    soundEffects.playClick();
    targetZoomRef.current = Math.min(3.2, Number((targetZoomRef.current + 0.35).toFixed(2)));
    setZoom(targetZoomRef.current);
  }, []);

  const handleZoomOut = useCallback(() => {
    soundEffects.playClick();
    targetZoomRef.current = Math.max(0.75, Number((targetZoomRef.current - 0.35).toFixed(2)));
    setZoom(targetZoomRef.current);
  }, []);

  const handleZoomReset = useCallback(() => {
    soundEffects.playClick();
    targetZoomRef.current = 1.15;
    setZoom(1.15);
  }, []);

  const handleSetZoomPreset = useCallback((preset: number) => {
    soundEffects.playClick();
    targetZoomRef.current = preset;
    setZoom(preset);
  }, []);

  // Touch Pinch-to-zoom handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistRef.current = Math.hypot(dx, dy);
      touchStartZoomRef.current = targetZoomRef.current;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const ratio = currentDist / touchDistRef.current;
      const newZoom = Math.min(3.2, Math.max(0.75, Number((touchStartZoomRef.current * ratio).toFixed(2))));
      targetZoomRef.current = newZoom;
      setZoom(newZoom);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchDistRef.current = null;
  }, []);

  // Mouse Wheel Zoom Listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * 0.2;
      targetZoomRef.current = Math.min(3.2, Math.max(0.75, Number((targetZoomRef.current + delta).toFixed(2))));
      setZoom(targetZoomRef.current);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Function to focus onto a specific region's coordinates
  const handleFlyToRegion = useCallback((region: RegionRiskData) => {
    soundEffects.playClick();
    onSelectRegion(region);
    // In Cobe, to center longitude `lng` precisely on screen:
    // phi = ((270 - region.lng) * Math.PI) / 180
    // theta = (region.lat * Math.PI) / 180
    const targetPhi = ((270 - region.lng) * Math.PI) / 180;
    const targetTheta = (region.lat * Math.PI) / 180;
    targetPhiRef.current = targetPhi;
    targetThetaRef.current = targetTheta;
    // Smoothly zoom in to the regional hotspot for closer 3D inspection
    targetZoomRef.current = 2.2;
    setZoom(2.2);
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
      scale: zoomRef.current,
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
      // Smooth interpolation toward target coordinates (taking shortest rotation path)
      let phiDiff = (targetPhiRef.current - basePhiRef.current) % (2 * Math.PI);
      if (phiDiff > Math.PI) phiDiff -= 2 * Math.PI;
      if (phiDiff < -Math.PI) phiDiff += 2 * Math.PI;

      if (Math.abs(phiDiff) > 0.001) {
        basePhiRef.current += phiDiff * 0.08;
      } else if (isRotating && !isPausedRef.current) {
        // Slow subtle rotation when idle
        basePhiRef.current += 0.0015;
        targetPhiRef.current = basePhiRef.current;
      }

      if (Math.abs(targetThetaRef.current - baseThetaRef.current) > 0.001) {
        baseThetaRef.current += (targetThetaRef.current - baseThetaRef.current) * 0.08;
      }

      // Smooth zoom interpolation
      if (Math.abs(targetZoomRef.current - zoomRef.current) > 0.002) {
        zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.12;
      }

      const curPhi = basePhiRef.current + dragOffset.current.phi;
      const curTheta = Math.max(-0.45, Math.min(0.45, baseThetaRef.current + dragOffset.current.theta));
      const curScale = zoomRef.current;

      if (globeRef.current) {
        globeRef.current.update({
          phi: curPhi,
          theta: curTheta,
          scale: curScale,
          markers: cobeMarkers,
          arcs: cobeArcs,
        });
      }

      // Real-time 3D to 2D Label Projection (60fps without React re-renders)
      if (showLabelsRef.current) {
        const activeRegions = displayRegionsRef.current;
        for (let i = 0; i < activeRegions.length; i++) {
          const reg = activeRegions[i];
          const el = labelElementRefs.current[reg.id];
          if (!el) continue;

          const proj = projectMarkerToScreen([reg.lat, reg.lng], curPhi, curTheta, curScale);

          // Render only when on front hemisphere facing camera
          if (
            proj.isVisible &&
            proj.xPercent >= -15 &&
            proj.xPercent <= 115 &&
            proj.yPercent >= -15 &&
            proj.yPercent <= 115
          ) {
            el.style.left = `${proj.xPercent}%`;
            el.style.top = `${proj.yPercent}%`;
            // Fade slightly near limb of globe
            const alpha = Math.min(1, Math.max(0.15, (proj.zDepth - 0.04) / 0.25));
            el.style.opacity = String(alpha);
            el.style.pointerEvents = 'auto';
          } else {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
          }
        }
      } else {
        // Clear all labels if toggled off
        for (const id in labelElementRefs.current) {
          const el = labelElementRefs.current[id];
          if (el) {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
          }
        }
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

          {/* Toggle Region Labels */}
          <button
            onClick={() => setShowLabels((prev) => !prev)}
            title={showLabels ? 'Sembunyikan Label Nama Daerah di Globe' : 'Tampilkan Label Nama Daerah di Globe'}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              showLabels
                ? 'bg-sky-950/80 border-sky-500/50 text-sky-300 shadow-sm shadow-sky-500/20'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {showLabels ? <Tag className="w-3.5 h-3.5 text-sky-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px]">Nama Daerah: {showLabels ? 'ON' : 'OFF'}</span>
          </button>

          {/* Toggle Telemetry Arcs */}
          <button
            onClick={() => setShowArcs((prev) => !prev)}
            title="Toggle Jalur Komunikasi Pusat ke Daerah"
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
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
        <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full cursor-grab transition-opacity duration-1000 rounded-full"
            style={{ opacity: 0, touchAction: 'none' }}
          />

          {/* 3D Anchored Region Name Labels Overlay */}
          {displayRegions.map((reg) => {
            const isSelected = reg.id === selectedRegion.id;
            const isDarurat = reg.status === 'darurat';
            const isSiaga = reg.status === 'siaga';

            return (
              <div
                key={reg.id}
                id={`globe-label-${reg.id}`}
                ref={(el) => {
                  labelElementRefs.current[reg.id] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlyToRegion(reg);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                  pointerEvents: 'none',
                  transform: 'translate(-50%, -100%) translateY(-6px)',
                  zIndex: isSelected ? 35 : isDarurat ? 28 : 22,
                  willChange: 'left, top, opacity',
                }}
                className="group cursor-pointer select-none transition-transform duration-150"
              >
                {/* Zoom-Reactive Adaptive Label Design */}
                {zoom < 1.35 ? (
                  // Macro Level (Zoom < 1.35x): Compact High-Contrast Region Badge
                  <div
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border backdrop-blur-md shadow-lg transition-all duration-150 ${
                      isSelected
                        ? 'bg-blue-600/95 text-white border-sky-300 ring-2 ring-sky-400/50 scale-105'
                        : isDarurat
                        ? 'bg-slate-950/90 text-rose-200 border-rose-500/70 hover:border-rose-400 hover:scale-105 shadow-rose-950/40'
                        : isSiaga
                        ? 'bg-slate-950/90 text-amber-200 border-amber-500/70 hover:border-amber-400 hover:scale-105 shadow-amber-950/40'
                        : 'bg-slate-950/90 text-emerald-200 border-emerald-500/60 hover:border-emerald-400 hover:scale-105'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isDarurat ? 'bg-rose-500 animate-ping' : isSiaga ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                    <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">{reg.name}</span>
                  </div>
                ) : (
                  // Zoom In Level (Zoom >= 1.35x): Rich Tactical Hotspot Details Card
                  <div
                    className={`p-2 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-150 relative ${
                      isSelected
                        ? 'bg-slate-950/95 border-sky-400 ring-2 ring-sky-400/50 shadow-sky-950/80 scale-105'
                        : isDarurat
                        ? 'bg-slate-950/95 border-rose-500/80 hover:border-rose-400 hover:scale-105 shadow-rose-950/50'
                        : isSiaga
                        ? 'bg-slate-950/95 border-amber-500/80 hover:border-amber-400 hover:scale-105 shadow-amber-950/50'
                        : 'bg-slate-950/95 border-emerald-500/70 hover:border-emerald-400 hover:scale-105 shadow-emerald-950/50'
                    }`}
                  >
                    {/* Header with status tag and region name */}
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isDarurat
                              ? 'bg-rose-500 animate-pulse ring-2 ring-rose-500/40'
                              : isSiaga
                              ? 'bg-amber-400 ring-2 ring-amber-400/40'
                              : 'bg-emerald-400 ring-2 ring-emerald-400/40'
                          }`}
                        />
                        <span className="text-[11px] font-black text-white whitespace-nowrap tracking-wide">
                          {reg.name}
                        </span>
                      </div>
                      <span
                        className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          isDarurat
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                            : isSiaga
                            ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                        }`}
                      >
                        {reg.status}
                      </span>
                    </div>

                    {/* Subtitle with Province & Geographic Coordinates */}
                    <div className="text-[9px] text-slate-300 flex items-center justify-between gap-3 whitespace-nowrap">
                      <span className="text-slate-400">{reg.province}</span>
                      <span className="font-mono text-sky-400 font-semibold">
                        {reg.lat.toFixed(2)}°, {reg.lng.toFixed(2)}°
                      </span>
                    </div>

                    {/* Crisis Hazard & Vulnerability Metric (when zoomed in closer) */}
                    {zoom >= 1.6 && (
                      <div className="mt-1 pt-1 border-t border-white/10 text-[9px] flex items-center justify-between gap-2 whitespace-nowrap">
                        <span className="text-amber-300 font-medium truncate max-w-[130px]">
                          {reg.crisisType.split(',')[0]}
                        </span>
                        <span className="text-[8px] bg-blue-950 text-sky-300 px-1 py-0.2 rounded font-mono font-bold border border-blue-800/40">
                          Skor: {Math.round(reg.vulnerabilityIndex * 10)}%
                        </span>
                      </div>
                    )}

                    {/* Downward Pin Triangle Stem */}
                    <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                )}

                {/* Target Pin Point Dot on globe surface */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full border border-white/60 bg-sky-400/90 pointer-events-none shadow-sm shadow-sky-400" />
              </div>
            );
          })}

          {/* Interactive Zoom & Region Label Status Badge */}
          <div className="absolute top-2 left-2 pointer-events-none flex items-center gap-1.5 text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="hidden sm:inline">
              Zoom: {zoom.toFixed(1)}x &bull; {showLabels ? 'Nama Daerah Aktif' : 'Label Nonaktif'} (Scroll Mouse / +/-)
            </span>
            <span className="sm:hidden">Zoom: {zoom.toFixed(1)}x</span>
          </div>

          {/* Floating 3D Zoom HUD */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
            <button
              id="btn-globe-zoom-in"
              onClick={handleZoomIn}
              title="Perbesar (Zoom In 3D) [atau Scroll Mouse Atas]"
              className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700/80 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-globe-zoom-reset"
              onClick={handleZoomReset}
              title="Reset Zoom ke Standar (100%)"
              className="px-1.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono font-bold text-sky-300 border border-slate-700/70 transition-colors cursor-pointer w-full text-center"
            >
              {Math.round((zoom / 1.15) * 100)}%
            </button>

            <button
              id="btn-globe-zoom-out"
              onClick={handleZoomOut}
              title="Perkecil (Zoom Out 3D) [atau Scroll Mouse Bawah]"
              className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700/80 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <div className="w-full h-px bg-slate-800 my-0.5" />

            {/* Quick Zoom Presets */}
            <div className="flex flex-col gap-1 w-full">
              <button
                id="btn-zoom-preset-1"
                onClick={() => handleSetZoomPreset(1.0)}
                title="Level 1.0x: Nusantara Makro"
                className={`text-[9px] font-bold py-0.5 px-1 rounded text-center transition-colors cursor-pointer ${
                  Math.abs(zoom - 1.0) < 0.2 ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1.0x
              </button>
              <button
                id="btn-zoom-preset-2"
                onClick={() => handleSetZoomPreset(1.8)}
                title="Level 1.8x: Kepulauan Regional"
                className={`text-[9px] font-bold py-0.5 px-1 rounded text-center transition-colors cursor-pointer ${
                  Math.abs(zoom - 1.8) < 0.2 ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1.8x
              </button>
              <button
                id="btn-zoom-preset-3"
                onClick={() => handleSetZoomPreset(2.5)}
                title="Level 2.5x: Hotspot Detail"
                className={`text-[9px] font-bold py-0.5 px-1 rounded text-center transition-colors cursor-pointer ${
                  Math.abs(zoom - 2.5) < 0.2 ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2.5x
              </button>
            </div>

            <div className="w-full h-px bg-slate-800 my-0.5" />

            {/* Toggle Region Names inside Zoom HUD */}
            <button
              id="btn-globe-toggle-labels"
              onClick={() => setShowLabels((prev) => !prev)}
              title={showLabels ? 'Sembunyikan Label Nama Daerah' : 'Tampilkan Label Nama Daerah di Globe'}
              className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-center w-full ${
                showLabels
                  ? 'bg-sky-950/80 border-sky-500/70 text-sky-300'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
            </button>
          </div>

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
