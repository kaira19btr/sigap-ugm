import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RegionRiskData } from '../types';
import {
  Maximize2,
  Minimize2,
  Compass,
  AlertTriangle,
  Radio,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Radar,
} from 'lucide-react';

interface RealEarlyWarningMapProps {
  regions: RegionRiskData[];
  selectedRegion: RegionRiskData;
  onSelectRegion: (region: RegionRiskData) => void;
  onOpenEmergencyAction: (region: RegionRiskData) => void;
  onOpenRadar?: (region: RegionRiskData) => void;
  isDaerah?: boolean;
  regionTitle?: string;
}

export const RealEarlyWarningMap: React.FC<RealEarlyWarningMapProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  onOpenEmergencyAction,
  onOpenRadar,
  isDaerah = false,
  regionTitle = 'Kab. Cianjur',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const circlesRef = useRef<{ [id: string]: L.Circle }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayLayerRef = useRef<L.TileLayer | null>(null);

  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isLegendExpanded, setIsLegendExpanded] = useState<boolean>(false);

  // Dark Ops Basemap Tile Config (100% Free & Open, Zero API-Key Required)
  const darkOpsConfig = {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  };

  // Helper to create custom HTML DivIcons for rich styled pulsing markers
  const createMarkerIcon = (region: RegionRiskData, isSelected: boolean) => {
    const isDarurat = region.status === 'darurat';
    const isSiaga = region.status === 'siaga';

    const bgGradient = isDarurat
      ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white'
      : isSiaga
      ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-white'
      : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white';

    const ringBorder = isSelected
      ? 'ring-4 ring-white shadow-2xl scale-125 z-50'
      : 'ring-2 ring-white/80 shadow-lg hover:scale-115';

    const pingAnimation = isDarurat
      ? '<span class="absolute -inset-2 rounded-full bg-rose-500 opacity-75 animate-ping"></span>'
      : isSiaga
      ? '<span class="absolute -inset-1.5 rounded-full bg-amber-400 opacity-60 animate-pulse"></span>'
      : '';

    const iconHtml = `
      <div class="relative flex items-center justify-center cursor-pointer transition-all">
        ${pingAnimation}
        <div class="relative w-8 h-8 rounded-full ${bgGradient} ${ringBorder} flex items-center justify-center font-bold text-[11px] shadow-md">
          ${
            isDarurat
              ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
              : isSiaga
              ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
              : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>'
          }
        </div>
        <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-md border border-slate-700 pointer-events-none">
          ${region.name}
        </div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'custom-map-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20],
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center initially on target region if isDaerah, else Center on Indonesia Archipelago
    const initialCenter: [number, number] = isDaerah && regions.length > 0
      ? [regions[0].lat, regions[0].lng]
      : [-2.5, 118.0];
    const initialZoom = isDaerah ? 11 : 5;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Apply Dark Ops Basemap & Reference Overlay
    const baseLayer = L.tileLayer(darkOpsConfig.url, {
      attribution: darkOpsConfig.attribution,
      subdomains: ['a', 'b', 'c'],
      maxZoom: 18,
    }).addTo(map);
    tileLayerRef.current = baseLayer;

    if (darkOpsConfig.overlayUrl) {
      const overlayLayer = L.tileLayer(darkOpsConfig.overlayUrl, {
        subdomains: ['a', 'b', 'c'],
        maxZoom: 18,
        pane: 'overlayPane',
      }).addTo(map);
      overlayLayerRef.current = overlayLayer;
    }

    // Add Zoom Controls bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial resize trigger
    setTimeout(() => {
      map.invalidateSize();
      if (isDaerah && regions.length > 0) {
        const bounds = L.latLngBounds(regions.map((r) => [r.lat, r.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Danger Impact Radius Circles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker));
    markersRef.current = {};

    // Remove existing circles
    Object.values(circlesRef.current).forEach((circle) => map.removeLayer(circle));
    circlesRef.current = {};

    regions.forEach((region) => {
      const isSelected = selectedRegion.id === region.id;
      const isDarurat = region.status === 'darurat';
      const isSiaga = region.status === 'siaga';

      const icon = createMarkerIcon(region, isSelected);

      const marker = L.marker([region.lat, region.lng], { icon }).addTo(map);

      // Bind Rich Popup
      const statusBadge = isDarurat
        ? '<span class="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-300">DARURAT</span>'
        : isSiaga
        ? '<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">SIAGA</span>'
        : '<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">NORMAL</span>';

      const popupContent = `
        <div class="p-1 min-w-[210px] font-sans">
          <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
            <div>
              <h4 class="font-extrabold text-sm text-slate-900">${region.name}</h4>
              <p class="text-[11px] text-slate-500 font-medium">${region.regency}, ${region.province}</p>
            </div>
            ${statusBadge}
          </div>
          
          <div class="space-y-1.5 text-xs text-slate-700 mb-3">
            <div class="flex justify-between py-0.5">
              <span class="text-slate-500">Krisis:</span>
              <span class="font-bold text-slate-900">${region.crisisType}</span>
            </div>
            <div class="flex justify-between py-0.5">
              <span class="text-slate-500">Target SLA Penyaluran:</span>
              <span class="font-bold font-mono text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">${region.slaTargetDays} Hari</span>
            </div>
            <div class="flex justify-between py-0.5">
              <span class="text-slate-500">Indeks Kerentanan:</span>
              <span class="font-bold font-mono ${isDarurat ? 'text-rose-600' : isSiaga ? 'text-amber-600' : 'text-emerald-600'}">${region.vulnerabilityIndex.toFixed(1)} / 10.0</span>
            </div>
            <div class="flex justify-between py-0.5">
              <span class="text-slate-500">Populasi Terdampak:</span>
              <span class="font-semibold text-slate-800">${region.affectedPopulation.toLocaleString('id-ID')} jiwa</span>
            </div>
            <div class="flex justify-between py-0.5">
              <span class="text-slate-500">Curah Hujan / Harga:</span>
              <span class="font-mono text-[11px] text-slate-700">${region.rainfall} • ${region.ricePrice}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-100">
            <button id="popup-select-${region.id}" class="w-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg transition-colors text-center">
              Pilih Wilayah
            </button>
            <button id="popup-action-${region.id}" class="w-full bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg transition-colors text-center">
              Respon Cepat
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300, className: 'sigap-custom-popup' });

      // Click listener for popup buttons
      marker.on('popupopen', () => {
        const btnSelect = document.getElementById(`popup-select-${region.id}`);
        const btnAction = document.getElementById(`popup-action-${region.id}`);

        if (btnSelect) {
          btnSelect.onclick = () => {
            onSelectRegion(region);
          };
        }
        if (btnAction) {
          btnAction.onclick = () => {
            onSelectRegion(region);
            onOpenEmergencyAction(region);
          };
        }
      });

      marker.on('click', () => {
        onSelectRegion(region);
      });

      markersRef.current[region.id] = marker;

      // Draw Radius Circle if enabled
      if (showRadius) {
        const radiusMeters = isDarurat ? 35000 : isSiaga ? 20000 : 10000;
        const color = isDarurat ? '#E11D48' : isSiaga ? '#F59E0B' : '#10B981';

        const circle = L.circle([region.lat, region.lng], {
          color,
          fillColor: color,
          fillOpacity: isDarurat ? 0.18 : 0.1,
          weight: 1.5,
          dashArray: isDarurat ? undefined : '4 4',
          radius: radiusMeters,
        }).addTo(map);

        circlesRef.current[region.id] = circle;
      }
    });
  }, [regions, selectedRegion, showRadius]);

  // Fly to selected region when selectedRegion changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedRegion) return;

    // Check if regions are clustered in one regency
    const isSingleRegency = regions.every((r) => r.regency === regions[0]?.regency);
    const targetZoom = isSingleRegency ? 11 : 8;

    map.flyTo([selectedRegion.lat, selectedRegion.lng], targetZoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });

    // Open popup for selected marker
    const marker = markersRef.current[selectedRegion.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 800);
    }
  }, [selectedRegion, regions]);

  // Fit bounds whenever region set changes (e.g. when switching from Pusat to Daerah)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || regions.length === 0) return;
    
    const isSingleRegency = regions.every((r) => r.regency === regions[0]?.regency);
    if (isSingleRegency) {
      const bounds = L.latLngBounds(regions.map((r) => [r.lat, r.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [regions]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const isSingleRegency = regions.every((r) => r.regency === regions[0]?.regency);
    if (isSingleRegency && regions.length > 0) {
      const bounds = L.latLngBounds(regions.map((r) => [r.lat, r.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    } else {
      map.flyTo([-2.5, 118.0], 5, { duration: 1.2 });
    }
  };

  const handleFitAll = () => {
    const map = mapInstanceRef.current;
    if (!map || regions.length === 0) return;
    const bounds = L.latLngBounds(regions.map((r) => [r.lat, r.lng]));
    const isSingleRegency = regions.every((r) => r.regency === regions[0]?.regency);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: isSingleRegency ? 12 : 8 });
  };

  return (
    <div
      className={`relative w-full ${
        isFullScreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col'
          : 'h-[440px] rounded-xl overflow-hidden'
      } border border-slate-800 shadow-md group`}
    >
      {/* Map Element Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-950" />

      {/* Top Left: Display Controls */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        {/* Dark Ops Mode Indicator */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-lg text-xs font-semibold text-slate-200">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Dark Ops Basemap</span>
        </div>

        {/* Toggle Radius */}
        <button
          onClick={() => setShowRadius(!showRadius)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-lg transition-all flex items-center gap-1.5 cursor-pointer ${
            showRadius
              ? 'bg-blue-600/90 border-blue-500 text-white'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Radius Bahaya</span>
        </button>
      </div>

      {/* Top Right: Quick Navigation Tools */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <button
          onClick={handleFitAll}
          className="p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition-colors"
          title={isDaerah ? `Fokus Wilayah ${regionTitle}` : 'Fokus Seluruh Indonesia'}
        >
          <Compass className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          className="p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition-colors"
          title={isDaerah ? `Reset Sudut Pandang ${regionTitle}` : 'Reset Sudut Pandang Default'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition-colors"
          title={isFullScreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
        >
          {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Left: Collapsible Legend */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-xl overflow-hidden transition-all text-xs text-white">
          <button
            onClick={() => setIsLegendExpanded(!isLegendExpanded)}
            className="w-full px-3 py-1.5 flex items-center justify-between gap-3 text-slate-300 hover:text-white font-bold text-[11px] bg-slate-800/80"
          >
            <span>Legenda Status &amp; SLA Penyaluran</span>
            {isLegendExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {isLegendExpanded && (
            <div className="p-3 space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                <span><strong>Darurat</strong>: Risiko &gt;= 71 Poin (SLA Target 3-4 Hari)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span><strong>Siaga</strong>: Risiko 36-70 Poin (SLA Target 5-6 Hari)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span><strong>Normal</strong>: Risiko 0-35 Poin (SLA Target 14 Hari)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
