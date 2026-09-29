'use client'

import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import {
  ChevronDown, ZoomIn, ZoomOut, Compass,
  Locate, Cloud, Droplets, Sun,
  Thermometer, Satellite, Eye, TrendingUp,
  Map as MapIcon, Info, Clock, X,
  Calendar, Activity, Box, Droplet as DropletIcon,
  Thermometer as ThermIcon
} from 'lucide-react'

import { useEffect, useState, useRef } from 'react'

/* =====================================================
   TYPES & CONSTANTS
===================================================== */

type LayerType = 'natural' | 'ndvi' | 'nir' | 'swir' | 'ndwi' | 'thermal'

interface SatelliteImage {
  id: string
  date: string
  dateRaw: string
  satellite: string
  cloudCover: number
  tile: string
  sceneId: string
}

interface FieldAnalytics {
  ndvi: number
  area: number
  moisture: number
  temp: number
  yield: number
  status: string
  ai: string[]
}

// ⚠️ ЗАМЕНИ ЭТОТ КЛЮЧ НА НОВЫЙ ИЗ СВОЕГО АККАУНТА (WMS Integration)
const EOS_API_KEY = process.env.EXPO_PUBLIC_EOS_API_KEY ?? "";

// Коды слоев обновлены согласно твоему GetCapabilities XML
const LAYERS_CONFIG: Record<LayerType, { name: string; code: string; icon: React.ReactNode; color: string }> = {
  natural: { name: 'Естественный цвет', code: 'B04,B03,B02', icon: <Eye className="w-4 h-4" />, color: '#10b981' },
  ndvi: { name: 'NDVI (Вегетация)', code: 'CALIBRATED_NDVI', icon: <TrendingUp className="w-4 h-4" />, color: '#22c55e' },
  nir: { name: 'Инфракрасный (NIR)', code: 'B08,B04,B03', icon: <Sun className="w-4 h-4" />, color: '#ef4444' },
  swir: { name: 'SWIR (Влажность)', code: 'B11,B8A,B04', icon: <Thermometer className="w-4 h-4" />, color: '#f97316' },
  ndwi: { name: 'NDWI (Вода)', code: 'NDWI', icon: <Droplets className="w-4 h-4" />, color: '#3b82f6' },
  thermal: { name: 'Тепловой', code: 'LST', icon: <Thermometer className="w-4 h-4" />, color: '#ec4899' }
}

const satelliteImages: SatelliteImage[] = [
  { id: '1', date: '23 апр. 2026', dateRaw: '2026-04-23', satellite: 'Sentinel-2', cloudCover: 0.1, tile: '42UWF', sceneId: 'S2-42-U-WF-2026-4-23-0' },
  { id: '2', date: '20 июл. 2025', dateRaw: '2025-07-20', satellite: 'Sentinel-2', cloudCover: 8.2, tile: '42UWF', sceneId: 'S2-42-U-WF-2025-7-20-1' },
  { id: '3', date: '16 апр. 2026', dateRaw: '2026-04-16', satellite: 'Sentinel-2', cloudCover: 5.9, tile: '42UWF', sceneId: 'S2-42-U-WF-2026-4-16-1' },
  { id: '4', date: '10 июл. 2024', dateRaw: '2024-07-10', satellite: 'Sentinel-2', cloudCover: 2.1, tile: '42UWF', sceneId: 'S2-42-U-WF-2024-7-10-0' },
  { id: '6', date: '14 авг. 2024', dateRaw: '2024-08-14', satellite: 'Sentinel-2', cloudCover: 0.5, tile: '42UWF', sceneId: 'S2-42-U-WF-2024-8-14-0' },
  { id: '7', date: '25 июн. 2024', dateRaw: '2024-06-25', satellite: 'Sentinel-2', cloudCover: 1.2, tile: '42UWF', sceneId: 'S2-42-U-WF-2024-6-25-0' },
  { id: '8', date: '03 сен. 2024', dateRaw: '2024-09-03', satellite: 'Sentinel-2', cloudCover: 4.8, tile: '42UWF', sceneId: 'S2-42-U-WF-2024-9-3-0' }
]

const FIELD_ANALYTICS_BY_DATE: Record<string, FieldAnalytics> = {
  '3': { ndvi: 0.18, area: 615, moisture: 75, temp: 8, yield: 0, status: 'Подготовка почвы', ai: ['Почва насыщена влагой', 'Растительность отсутствует'] },
  '1': { ndvi: 0.24, area: 615, moisture: 68, temp: 14, yield: 0, status: 'Начало сезона', ai: ['Низкий уровень биомассы', 'Температура растет'] },
  '7': { ndvi: 0.58, area: 615, moisture: 55, temp: 24, yield: 22.4, status: 'Активный рост', ai: ['Идет накопление биомассы', 'Нужен мониторинг сорняков'] },
  '4': { ndvi: 0.76, area: 615, moisture: 50, temp: 27, yield: 28.5, status: 'Пик вегетации', ai: ['Высокая активность', 'Прогноз хороший'] },
  '2': { ndvi: 0.84, area: 615, moisture: 45, temp: 29, yield: 32.1, status: 'Налив зерна', ai: ['Максимальный NDVI', 'Болезней не обнаружено'] },
  '6': { ndvi: 0.52, area: 615, moisture: 35, temp: 22, yield: 34.2, status: 'Созревание', ai: ['Пшеница желтеет', 'Налив завершен'] },
  '8': { ndvi: 0.28, area: 615, moisture: 25, temp: 16, yield: 33.8, status: 'Уборка', ai: ['Поле готово к жатве', 'Влажность зерна в норме'] }
}

export default function IntegratedAgroMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  const [activeLayer, setActiveLayer] = useState<LayerType>('ndvi')
  const [selectedImage, setSelectedImage] = useState<SatelliteImage>(satelliteImages[0])
  const [selectedField, setSelectedField] = useState(true)
  const [showSatelliteList, setShowSatelliteList] = useState(true)
  const [showLayers, setShowLayers] = useState(true)
  const [zoom, setZoom] = useState(12)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLoadingWMS, setIsLoadingWMS] = useState(false)

  const analytics = FIELD_ANALYTICS_BY_DATE[selectedImage.id]

  // ФИКС: Используем шаблонную строку, чтобы сохранить "+" и избежать кодирования в %2B
  const getWmsUrl = (sceneId: string, layerCode: string) => {
    return `https://eos.com/landviewer/wms/${EOS_API_KEY}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${sceneId}+${layerCode}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}`
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256
          }
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
      },
      center: [70.35, 54.458],
      zoom: 13,
    })
    mapRef.current = map

    map.on('load', () => {
      fetch('/data/sovetskoe.geojson')
        .then(res => res.json())
        .then(data => {
          map.addSource('farm-boundary', { type: 'geojson', data })
          map.addLayer({
            id: 'farm-fill',
            type: 'fill',
            source: 'farm-boundary',
            paint: { 'fill-color': '#22c55e', 'fill-opacity': 0.1 }
          })
          map.addLayer({
            id: 'farm-line',
            type: 'line',
            source: 'farm-boundary',
            paint: { 'line-color': '#22c55e', 'line-width': 2 }
          })
        })

      // Инициализация WMS слоя
      const initialUrl = getWmsUrl(selectedImage.sceneId, LAYERS_CONFIG[activeLayer].code)
      map.addSource('satellite-src', {
        type: 'raster',
        tiles: [initialUrl],
        tileSize: 256
      })
      map.addLayer({
        id: 'satellite-layer',
        type: 'raster',
        source: 'satellite-src',
        paint: { 'raster-opacity': 0.85 }
      })

      setMapLoaded(true)
    })

    return () => { map.remove(); mapRef.current = null; }
  }, [])

  // Эффект обновления слоя
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded || !map.getSource('satellite-src')) return

    setIsLoadingWMS(true)
    const newUrl = getWmsUrl(selectedImage.sceneId, LAYERS_CONFIG[activeLayer].code)
    const source = map.getSource('satellite-src') as maplibregl.RasterTileSource
    
    if (source.setTiles) {
      source.setTiles([newUrl])
      setTimeout(() => setIsLoadingWMS(false), 800)
    }
  }, [activeLayer, selectedImage, mapLoaded])

  const getNDVIColor = (ndvi: number) => {
    if (ndvi >= 0.7) return 'text-emerald-400'
    if (ndvi >= 0.5) return 'text-green-500'
    return 'text-red-500'
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      <aside className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-emerald-500 rounded-lg"><Satellite className="w-6 h-6 text-white" /></div>
             <h1 className="text-xl font-bold">Agro Analytics</h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-slate-800 p-3 rounded-xl">
               <div className="text-xs text-slate-400">NDVI</div>
               <div className={`text-2xl font-bold ${getNDVIColor(analytics.ndvi)}`}>{analytics.ndvi}</div>
             </div>
             <div className="bg-slate-800 p-3 rounded-xl">
               <div className="text-xs text-slate-400">Площадь</div>
               <div className="text-2xl font-bold">615 га</div>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scroll space-y-6">
           <div>
             <h3 className="text-sm font-bold text-slate-400 mb-3 px-2 flex items-center gap-2"><Calendar size={16}/> Доступные даты</h3>
             {satelliteImages.map(img => (
               <div key={img.id} onClick={() => setSelectedImage(img)} className={`p-3 mb-2 rounded-xl border cursor-pointer transition ${selectedImage.id === img.id ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800'}`}>
                 <div className="flex justify-between font-bold text-sm"><span>{img.date}</span><span className="text-[10px] opacity-50">{img.satellite}</span></div>
                 <div className="text-[10px] text-slate-400 mt-1">Облака: {img.cloudCover}%</div>
               </div>
             ))}
           </div>

           <div>
             <h3 className="text-sm font-bold text-slate-400 mb-3 px-2 flex items-center gap-2"><TrendingUp size={16}/> Слои анализа</h3>
             {Object.entries(LAYERS_CONFIG).map(([key, cfg]) => (
               <button key={key} onClick={() => setActiveLayer(key as LayerType)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm ${activeLayer === key ? 'bg-emerald-600' : 'hover:bg-slate-800 text-slate-400'}`}>
                 {cfg.icon} {cfg.name}
               </button>
             ))}
           </div>
        </div>
      </aside>

      <main className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full" />
        
        {isLoadingWMS && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 px-4 py-2 rounded-full z-30 border border-emerald-500/50 flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Загрузка спутника...</span>
          </div>
        )}

        {selectedField && (
           <div className="absolute top-8 right-8 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl z-30">
             <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">Советское</h2><X className="cursor-pointer" onClick={() => setSelectedField(false)}/></div>
             <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                   <div className="text-xs text-slate-400 uppercase">Статус поля</div>
                   <div className="text-lg font-bold text-emerald-400">{analytics.status}</div>
                </div>
                <div className="space-y-2">
                   {analytics.ai.map((t, i) => <div key={i} className="text-xs text-slate-300 flex gap-2"><span>•</span>{t}</div>)}
                </div>
             </div>
           </div>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700 px-6 py-3 rounded-2xl flex items-center gap-4 font-bold text-sm">
           <span className="text-emerald-400">LIVE</span>
           <div className="w-[1px] h-4 bg-slate-700" />
           <span>{selectedImage.date}</span>
           <div className="w-[1px] h-4 bg-slate-700" />
           <span className="opacity-70">{LAYERS_CONFIG[activeLayer].name}</span>
        </div>
      </main>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .maplibregl-ctrl-attrib { display: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}