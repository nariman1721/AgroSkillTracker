// 'use client'

// import { useState } from 'react'
// import { 
//   Map, TrendingUp, Truck, AlertTriangle, 
//   BarChart3, Leaf, Droplets, CloudRain
// } from 'lucide-react'
// import Link from 'next/link'
// import YieldPrediction from '../components/YieldPrediction'
// import AnomalyDetection from '../components/AnomalyDetection'
// import SupplyChainTracker from '../components/SupplyChainTracker'
// import NDVIMap from '../components/NDVIMap';

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('overview')
//   const [selectedRegion, setSelectedRegion] = useState('sovetskoe')

//   const stats = {
//     totalFarms: 147,
//     monitoredArea: 85420, // гектары
//     averageNDVI: 0.68,
//     anomalyDetected: 12,
//     subsidyEfficiency: 78,
//     yieldForecast: 4.2 // тонн/га
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
//       {/* Header */}
//       <header className="bg-slate-900/95 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
//                 <Leaf className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
//                   AgroAnalytics AI
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <div className="border-b border-slate-800 bg-slate-900/50">
//         <div className="container mx-auto px-6">
//           <div className="flex gap-1">
//             {[
//               { id: 'overview', label: 'Обзор', icon: BarChart3 },
//               { id: 'map', label: 'NDVI Мониторинг', icon: Map },
//               { id: 'yield', label: 'Прогноз урожайности', icon: TrendingUp },
//               { id: 'anomaly', label: 'Аномалии субсидий', icon: AlertTriangle },
//             ].map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
//                   activeTab === tab.id
//                     ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800/50'
//                     : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4" />
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-8">
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-slate-400">Мониторинг хозяйств</span>
//                   <Map className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <div className="text-3xl font-bold text-white">{stats.totalFarms}</div>
//                 <div className="text-sm text-slate-400">{stats.monitoredArea.toLocaleString()} га</div>
//               </div>

//               <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-slate-400">Средний NDVI</span>
//                   <Leaf className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <div className="text-3xl font-bold text-white">{stats.averageNDVI}</div>
//                 <div className="text-sm text-emerald-400">+12% за сезон</div>
//               </div>

//               <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-slate-400">Выявлено аномалий</span>
//                   <AlertTriangle className="w-5 h-5 text-yellow-500" />
//                 </div>
//                 <div className="text-3xl font-bold text-white">{stats.anomalyDetected}</div>
//                 <div className="text-sm text-yellow-500">Требует проверки</div>
//               </div>

//               <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-slate-400">Прогноз урожая</span>
//                   <TrendingUp className="w-5 h-5 text-teal-400" />
//                 </div>
//                 <div className="text-3xl font-bold text-white">{stats.yieldForecast}</div>
//                 <div className="text-sm text-slate-400">тонн/га (пшеница)</div>
//               </div>
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
//                 <h3 className="text-lg font-semibold text-white mb-4">Динамика NDVI по районам</h3>
//                 <div className="h-64 flex items-center justify-center text-slate-400">
//                   График NDVI за сезон
//                 </div>
//               </div>

//               <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
//                 <h3 className="text-lg font-semibold text-white mb-4">Эффективность субсидий</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-300">Эффективность использования</span>
//                     <span className="text-emerald-400 font-semibold">{stats.subsidyEfficiency}%</span>
//                   </div>
//                   <div className="w-full bg-slate-700 rounded-full h-2">
//                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${stats.subsidyEfficiency}%` }}></div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     <div className="p-3 bg-slate-700/30 rounded-lg">
//                       <div className="text-xs text-slate-400">Удобрения (целевое)</div>
//                       <div className="text-lg font-semibold text-white">86%</div>
//                     </div>
//                     <div className="p-3 bg-slate-700/30 rounded-lg">
//                       <div className="text-xs text-slate-400">Перераспределение</div>
//                       <div className="text-lg font-semibold text-yellow-500">14%</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Anomalies */}
//             <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 overflow-hidden">
//               <div className="px-6 py-4 border-b border-slate-700">
//                 <h3 className="text-lg font-semibold text-white">Последние аномалии</h3>
//               </div>
//               <div className="divide-y divide-slate-700">
//                 {[
//                   { farm: 'ТОО "АгроКазахстан"', issue: 'Расхождение NDVI с отчетностью', severity: 'high', date: '2026-04-15' },
//                   { farm: 'КХ "Зерновое"', issue: 'Нецелевое использование удобрений', severity: 'critical', date: '2026-04-14' },
//                   { farm: 'ТОО "Степное"', issue: 'Снижение вегетации на 30%', severity: 'medium', date: '2026-04-13' }
//                 ].map((anomaly, i) => (
//                   <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition">
//                     <div>
//                       <div className="font-medium text-white">{anomaly.farm}</div>
//                       <div className="text-sm text-slate-400">{anomaly.issue}</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         anomaly.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
//                         anomaly.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
//                         'bg-yellow-500/20 text-yellow-400'
//                       }`}>
//                         {anomaly.severity === 'critical' ? 'Критично' : anomaly.severity === 'high' ? 'Высокий' : 'Средний'}
//                       </span>
//                       <span className="text-sm text-slate-500">{anomaly.date}</span>
//                       <button className="text-emerald-400 hover:text-emerald-300 text-sm">Детали →</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'map' && (
//           <div className="h-[calc(100vh-200px)]">
//             <NDVIMap />
//           </div>
//         )}

//         {activeTab === 'yield' && <YieldPrediction />}
//         {activeTab === 'supply' && <SupplyChainTracker />}
//         {activeTab === 'anomaly' && <AnomalyDetection />}
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useState } from 'react'
// import {
//   Map,
//   TrendingUp,
//   AlertTriangle,
//   BarChart3,
//   Leaf,
// } from 'lucide-react'

// import YieldPrediction from '../components/YieldPrediction'
// import AnomalyDetection from '../components/AnomalyDetection'
// import NDVIMap from '../components/NDVIMap'

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('overview')

//   const stats = {
//     totalFarms: 147,
//     monitoredArea: 85420,
//     averageNDVI: 0.68,
//     anomalyDetected: 12,
//     subsidyEfficiency: 78,
//     yieldForecast: 4.2,
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      
//       {/* HEADER */}
//       <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
//         <div className="max-w-[1700px] mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
//               <Leaf className="w-6 h-6 text-white" />
//             </div>

//             <div>
//               <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
//                 AgroAnalytics AI
//               </h1>
//             </div>
//           </div>

          
//         </div>
//       </header>

//       {/* NAVIGATION */}
//       <div className="sticky top-[76px] z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800">
//         <div className="max-w-[1700px] mx-auto px-6 overflow-x-auto">
//           <div className="flex gap-1 min-w-max">
//             {[
//               { id: 'map', label: 'NDVI Карта', icon: Map },
//               { id: 'yield', label: 'Урожайность', icon: TrendingUp },
//               { id: 'anomaly', label: 'Аномалии', icon: AlertTriangle },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800/60'
//                     : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4" />
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* PAGE */}
//       <main className="max-w-[1700px] mx-auto px-6 py-6">

//         {/* OVERVIEW */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* MAP PREVIEW */}
//             <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
//               <NDVIMap />
//             </div>
//           </div>
//         )}

//         {/* FULL MAP */}
//         {activeTab === 'map' && (
//           <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[85vh]">
//             <NDVIMap />
//           </div>
//         )}

//         {/* YIELD */}
//         {activeTab === 'yield' && (
//           <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
//             <YieldPrediction />
//           </div>
//         )}

//         {/* ANOMALIES */}
//         {activeTab === 'anomaly' && (
//           <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
//             <AnomalyDetection />
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import {
  Map,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Leaf,
} from 'lucide-react'

import YieldPrediction from '../components/YieldPrediction'
import AnomalyDetection from '../components/AnomalyDetection'
import NDVIMap from '../components/NDVIMap'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('map')
  const [isMobile, setIsMobile] = useState(false)

  // Определяем мобильное устройство для корректного отображения
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const stats = {
    totalFarms: 147,
    monitoredArea: 85420,
    averageNDVI: 0.68,
    anomalyDetected: 12,
    subsidyEfficiency: 78,
    yieldForecast: 4.2,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-x-hidden">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
        <div className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                AgroAnalytics AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <div className="sticky top-[57px] md:top-[76px] z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <div className="w-full px-4 md:px-6 overflow-x-auto">
          <div className="flex gap-0.5 md:gap-1 min-w-max">
            {[
              { id: 'map', label: 'NDVI Карта', icon: Map },
              { id: 'yield', label: 'Урожайность', icon: TrendingUp },
              { id: 'anomaly', label: 'Аномалии', icon: AlertTriangle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800/60'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full">
        {/* FULL MAP MODE - когда выбран пункт NDVI Карта */}
        {activeTab === 'map' && (
          <div className="w-full h-[calc(100vh-110px)] md:h-[calc(100vh-130px)]">
            <NDVIMap />
          </div>
        )}

        {/* YIELD PREDICTION MODE */}
        {activeTab === 'yield' && (
          <div className="w-full px-4 md:px-6 py-4 md:py-6">
            <div className="rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-900/70 p-4 md:p-6">
              <YieldPrediction />
            </div>
          </div>
        )}

        {/* ANOMALY DETECTION MODE */}
        {activeTab === 'anomaly' && (
          <div className="w-full px-4 md:px-6 py-4 md:py-6">
            <div className="rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-900/70 p-4 md:p-6">
              <AnomalyDetection />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}