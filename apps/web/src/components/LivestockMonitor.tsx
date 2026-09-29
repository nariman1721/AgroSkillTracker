'use client'

import { useState, useEffect } from 'react'
import { 
  PawPrint, Activity, AlertCircle, TrendingUp, 
  MapPin, Calendar, Bell, Download, Search,
  Plus, Minus, Users, Thermometer, Droplets
} from 'lucide-react'

interface LivestockData {
  id: string
  type: 'cattle' | 'sheep' | 'horse'
  count: number
  declaredCount: number
  healthIndex: number
  location: string
  lastUpdated: string
  anomalies: string[]
}

export default function LivestockMonitor() {
  const [livestockData, setLivestockData] = useState<LivestockData[]>([])
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCattle: 0,
    totalSheep: 0,
    totalHorse: 0,
    anomalyCount: 0,
    healthAverage: 0
  })

  useEffect(() => {
    fetchLivestockData()
  }, [])

  const fetchLivestockData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/livestock/monitor')
      const data = await response.json()
      setLivestockData(data.livestock)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching livestock data:', error)
      // Демо данные
      setLivestockData(demoLivestockData)
      setStats({
        totalCattle: 2847,
        totalSheep: 5120,
        totalHorse: 342,
        anomalyCount: 8,
        healthAverage: 87
      })
    } finally {
      setLoading(false)
    }
  }

  const getAnimalIcon = (type: string) => {
    switch(type) {
      case 'cattle': return <PawPrint className="w-5 h-5 text-emerald-400" />
      case 'sheep': return <PawPrint className="w-5 h-5 text-blue-400" />
      default: return <PawPrint className="w-5 h-5 text-amber-400" />
    }
  }

  const getHealthColor = (index: number) => {
    if (index >= 80) return 'text-emerald-400'
    if (index >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-xl p-6 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">КРС</span>
            <PawPrint className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalCattle.toLocaleString()}</div>
          <div className="text-sm text-emerald-400">голов</div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-slate-800/50 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">МРС</span>
            <PawPrint className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalSheep.toLocaleString()}</div>
          <div className="text-sm text-blue-400">голов</div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-slate-800/50 rounded-xl p-6 border border-amber-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Лошади</span>
            <PawPrint className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalHorse.toLocaleString()}</div>
          <div className="text-sm text-amber-400">голов</div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/50 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Здоровье стада</span>
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.healthAverage}%</div>
          <div className="text-sm text-purple-400">средний показатель</div>
        </div>
      </div>

      {/* Livestock Table */}
      <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Мониторинг поголовья по хозяйствам</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск..."
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
              />
            </div>
            <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
              <Download className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-slate-400 text-sm">
                <th className="px-6 py-3">Хозяйство</th>
                <th className="px-6 py-3">Тип</th>
                <th className="px-6 py-3">Заявлено</th>
                <th className="px-6 py-3">Факт</th>
                <th className="px-6 py-3">Расхождение</th>
                <th className="px-6 py-3">Здоровье</th>
                <th className="px-6 py-3">Обновлено</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {demoLivestockData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getAnimalIcon(item.type)}
                      <span className="font-medium text-white">
                        {item.type === 'cattle' ? 'КРС' : item.type === 'sheep' ? 'МРС' : 'Лошади'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{item.location}</td>
                  <td className="px-6 py-4 text-white">{item.declaredCount}</td>
                  <td className="px-6 py-4 text-white">{item.count}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${item.count !== item.declaredCount ? 'text-red-400' : 'text-green-400'}`}>
                      {Math.abs(item.count - item.declaredCount)} голов
                      {item.count !== item.declaredCount && (
                        <span className="text-xs ml-1">
                          ({Math.round(Math.abs(item.count - item.declaredCount) / item.declaredCount * 100)}%)
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getHealthColor(item.healthIndex)}`}
                          style={{ width: `${item.healthIndex}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getHealthColor(item.healthIndex)}`}>
                        {item.healthIndex}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{item.lastUpdated}</td>
                  <td className="px-6 py-4">
                    {item.anomalies.length > 0 && (
                      <div className="relative group">
                        <AlertCircle className="w-5 h-5 text-yellow-500 cursor-help" />
                        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 rounded-lg p-2 text-xs text-slate-300 hidden group-hover:block z-10">
                          {item.anomalies.map((anomaly, i) => (
                            <div key={i}>⚠️ {anomaly}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anomaly Alerts */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-6 h-6 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Активные алармы</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-red-500/20 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white">Расхождение в учете поголовья</div>
                <div className="text-sm text-slate-300 mt-1">
                  ТОО "АгроКазахстан": заявлено 450 голов, фактически 380 голов
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-red-500 rounded-full text-white">Critical</span>
            </div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white">Снижение здоровья стада</div>
                <div className="text-sm text-slate-300 mt-1">
                  КХ "Зерновое": индекс здоровья упал на 15% за месяц
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-yellow-500 rounded-full text-white">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const demoLivestockData: LivestockData[] = [
  {
    id: '1',
    type: 'cattle',
    count: 380,
    declaredCount: 450,
    healthIndex: 72,
    location: 'ТОО "АгроКазахстан"',
    lastUpdated: '2026-04-15',
    anomalies: ['Расхождение в учете: -70 голов', 'Снижение веса стада']
  },
  {
    id: '2',
    type: 'sheep',
    count: 1200,
    declaredCount: 1200,
    healthIndex: 88,
    location: 'КХ "Зерновое"',
    lastUpdated: '2026-04-14',
    anomalies: []
  },
  {
    id: '3',
    type: 'horse',
    count: 45,
    declaredCount: 48,
    healthIndex: 92,
    location: 'ТОО "Степное"',
    lastUpdated: '2026-04-13',
    anomalies: ['Отсутствие 3 голов']
  }
]