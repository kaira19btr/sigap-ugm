import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RegionRiskData } from '../types';
import {
  Layers,
  Maximize2,
  Minimize2,
  Compass,
  AlertTriangle,
  Radio,
  CheckCircle2,
  ExternalLink,
  Flame,
  Droplets,
  Wind,
  ShieldAlert,
  RotateCcw,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface RealEarlyWarningMapProps {
  regions: RegionRiskData[];
  selectedRegion: RegionRiskData;
  onSelectRegion: (region: RegionRiskData) => void;
  onOpenEmergencyAction: (region: RegionRiskData) => void;
}

type MapLayerType = 'dark' | 'street' | 'satellite' | 'terrain';

export const RealEarlyWarningMap: React.FC<RealEarlyWarningMapProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  onOpenEmergencyAction,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const circlesRef = useRef<{ [id: string]: L.Circle }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('dark');
  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isLegendExpanded, setIsLegendExpanded] = useState<boolean>(false);

  // Basemap URLs
  const tileUrls: Record<MapLayerType, { url: string; attribution: string; subdomains?: string[] }> = {
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://openstreetmap.org">OSM</a>',
      subdomains: ['a', 'b', 'c', 'd'],
    },
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://openstreetmap.org">OSM</a>, SRTM | Map style: &copy; OpenTopoMap',
      subdomains: ['a', 'b', 'c'],
    },
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

    // Center on Indonesia Archipelago
    const map = L.map(mapContainerRef.current, {
      center: [-2.5, 118.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add Tile Layer
    const layerCfg = tileUrls[activeLayer];
    const tileLayer = L.tileLayer(layerCfg.url, {
      attribution: layerCfg.attribution,
      subdomains: layerCfg.subdomains || ['a', 'b', 'c'],
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Add Zoom Controls bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial resize trigger
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when layer changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const layerCfg = tileUrls[activeLayer];
    const newTileLayer = L.tileLayer(layerCfg.url, {
      attribution: layerCfg.attribution,
      subdomains: layerCfg.subdomains || ['a', 'b', 'c'],
    }).addTo(map);
    tileLayerRef.current = newTileLayer;
  }, [activeLayer]);

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
        <div class="p-1 min-w-[200px] font-sans">
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

    map.flyTo([selectedRegion.lat, selectedRegion.lng], 8, {
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
  }, [selectedRegion]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([-2.5, 118.0], 5, { duration: 1.2 });
  };

  const handleFitAll = () => {
    const map = mapInstanceRef.current;
    if (!map || regions.length === 0) return;
    const bounds = L.latLngBounds(regions.map((r) => [r.lat, r.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
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

      {/* Top Left: Layer Selector & Display Controls */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        {/* Basemap Switcher */}
        <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg text-xs">
          <button
            onClick={() => setActiveLayer('dark')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === 'dark'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dark Ops
          </button>
          <button
            onClick={() => setActiveLayer('street')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === 'street'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Peta Jalan
          </button>
          <button
            onClick={() => setActiveLayer('satellite')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === 'satellite'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Satelit
          </button>
          <button
            onClick={() => setActiveLayer('terrain')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === 'terrain'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Topografi
          </button>
        </div>

        {/* Radius Toggle */}
        <button
          onClick={() => setShowRadius(!showRadius)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md shadow-lg transition-all ${
            showRadius
              ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Zona Dampak</span>
        </button>
      </div>

      {/* Top Right: Quick Navigation Tools */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <button
          onClick={handleFitAll}
          title="Fokuskan Semua Titik Wilayah"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Fit Wilayah</span>
        </button>

        <button
          onClick={handleResetView}
          title="Reset Sudut Pandang Nusantara"
          className="p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setIsFullScreen(!isFullScreen);
            setTimeout(() => {
              mapInstanceRef.current?.invalidateSize();
            }, 300);
          }}
          title={isFullScreen ? 'Perkecil Peta' : 'Layar Penuh'}
          className="p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Left: Compact Streamlined Telemetry Micro-Widget */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-auto">
        {!isLegendExpanded ? (
          /* Sleek Micro Pill Bar */
          <div
            onClick={() => setIsLegendExpanded(true)}
            className="flex items-center gap-2 bg-slate-950/85 hover:bg-slate-950/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-800/80 hover:border-slate-700 text-white shadow-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] select-none"
            title="Klik untuk melihat detail ambang batas telemetri"
          >
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-300">
                Telemetri Live
              </span>
            </div>

            <div className="h-3 w-px bg-slate-800"></div>

            {/* Quick Status Chips */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-rose-400 font-semibold" title="Darurat (Indeks > 8.0)">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-xs shadow-rose-500"></span>
                <span>{regions.filter((r) => r.status === 'darurat').length}</span>
                <span className="text-[9px] font-sans text-slate-400 hidden sm:inline">Darurat</span>
              </span>

              <span className="flex items-center gap-1 text-amber-400 font-semibold" title="Siaga (Indeks 6.0 - 7.9)">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs shadow-amber-400"></span>
                <span>{regions.filter((r) => r.status === 'siaga').length}</span>
                <span className="text-[9px] font-sans text-slate-400 hidden sm:inline">Siaga</span>
              </span>

              <span className="flex items-center gap-1 text-emerald-400 font-semibold" title="Normal (Indeks < 6.0)">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{regions.filter((r) => r.status === 'normal').length}</span>
                <span className="text-[9px] font-sans text-slate-400 hidden sm:inline">Normal</span>
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLegendExpanded(true);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800/80 transition-colors ml-0.5"
              title="Perluas rincian"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>
        ) : (
          /* Expanded Modal Popover */
          <div className="bg-slate-950/95 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 text-white shadow-2xl w-64 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200">
                  Telemetri Live SIGAP
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1 rounded">
                  Live
                </span>
                <button
                  type="button"
                  onClick={() => setIsLegendExpanded(false)}
                  className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors"
                  title="Perkecil ke mode mini"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shadow-xs shadow-rose-500"></span>
                  <span className="font-medium text-slate-300">Darurat (&gt; 8.0)</span>
                </div>
                <span className="font-bold font-mono text-rose-400">
                  {regions.filter((r) => r.status === 'darurat').length} Titik
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-xs shadow-amber-400"></span>
                  <span className="font-medium text-slate-300">Siaga (6.0 - 7.9)</span>
                </div>
                <span className="font-bold font-mono text-amber-400">
                  {regions.filter((r) => r.status === 'siaga').length} Titik
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-medium text-slate-300">Normal (&lt; 6.0)</span>
                </div>
                <span className="font-bold font-mono text-emerald-400">
                  {regions.filter((r) => r.status === 'normal').length} Titik
                </span>
              </div>
            </div>

            <p className="text-[9px] text-slate-400 mt-2 pt-1.5 border-t border-slate-800/80 leading-tight">
              Tip: Klik pin marker pada peta untuk detail telemetri atau tindakan tanggap darurat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
