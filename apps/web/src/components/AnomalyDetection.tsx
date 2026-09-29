'use client'

import { useState, useEffect } from 'react'
import { 
  AlertTriangle, Search, MapPin, Calendar, FileText, 
  Download, Eye, TrendingDown, TrendingUp, CheckCircle,
  XCircle, Clock, BarChart3, Activity, Shield, Bell
} from 'lucide-react'

interface Anomaly {
  id: string
  farmName: string
  farmId: string
  type: 'fertilizer' | 'subsidy' | 'vegetation' | 'livestock'
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  date: string
  status: 'new' | 'investigating' | 'resolved' | 'false_alert'
  ndviDeclared: number
  ndviActual: number
  subsidyDeclared: number
  subsidyActual: number
  recommendation: string
  location: {
    lat: number
    lng: number
    area: number
  }
}

export default function AnomalyDetection() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null)
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAnomalies: 0,
    criticalCount: 0,
    potentialLoss: 0,
    efficiency: 0
  })

  useEffect(() => {
    fetchAnomalies()
  }, [])

  const fetchAnomalies = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/anomaly-detection/list')
      const data = await response.json()
      setAnomalies(data.anomalies)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching anomalies:', error)
      // Демо данные
      setAnomalies(demoAnomalies)
      setStats({
        totalAnomalies: 24,
        criticalCount: 8,
        potentialLoss: 12500000,
        efficiency: 67
      })
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      default: return 'bg-blue-500 text-white'
    }
  }

  const getSeverityText = (severity: string) => {
    switch(severity) {
      case 'critical': return 'Критично'
      case 'high': return 'Высокий'
      case 'medium': return 'Средний'
      default: return 'Низкий'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'fertilizer': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'subsidy': return <Shield className="w-5 h-5 text-red-500" />
      case 'vegetation': return <TrendingDown className="w-5 h-5 text-yellow-500" />
      default: return <Activity className="w-5 h-5 text-blue-500" />
    }
  }

  const getTypeText = (type: string) => {
    switch(type) {
      case 'fertilizer': return 'Нецелевое использование удобрений'
      case 'subsidy': return 'Аномалия субсидирования'
      case 'vegetation': return 'Деградация растительности'
      default: return 'Аномалия животноводства'
    }
  }

  const filteredAnomalies = anomalies.filter(anomaly => {
    if (filter !== 'all' && anomaly.severity !== filter) return false
    if (searchTerm && !anomaly.farmName.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      totalAnomalies: stats.totalAnomalies,
      criticalCount: stats.criticalCount,
      potentialLoss: stats.potentialLoss,
      anomalies: filteredAnomalies
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `anomaly-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-900/30 to-slate-800/50 backdrop-blur rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Всего аномалий</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalAnomalies}</div>
          <div className="text-sm text-red-400">+{Math.round(stats.totalAnomalies * 0.23)} за месяц</div>
        </div>

        <div className="bg-gradient-to-br from-orange-900/30 to-slate-800/50 backdrop-blur rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Критические</span>
            <XCircle className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.criticalCount}</div>
          <div className="text-sm text-orange-400">Требуют немедленного вмешательства</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/30 to-slate-800/50 backdrop-blur rounded-xl p-6 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Потенциальный ущерб</span>
            <TrendingDown className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.potentialLoss.toLocaleString()} ₸</div>
          <div className="text-sm text-yellow-400">Оценка потерь от аномалий</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 backdrop-blur rounded-xl p-6 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">Эффективность субсидий</span>
            <BarChart3 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.efficiency}%</div>
          <div className="text-sm text-emerald-400">Целевое использование средств</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map((severity) => (
              <button
                key={severity}
                onClick={() => setFilter(severity)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === severity
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {severity === 'all' ? 'Все' : getSeverityText(severity)}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по хозяйству..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition"
            >
              <Download className="w-4 h-4" />
              Экспорт
            </button>
          </div>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Загрузка данных...</div>
        ) : (
          filteredAnomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition cursor-pointer"
              onClick={() => setSelectedAnomaly(anomaly)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(anomaly.type)}
                    <div>
                      <h3 className="font-semibold text-white">{anomaly.farmName}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-3 h-3" />
                        <span>ID: {anomaly.farmId}</span>
                        <Calendar className="w-3 h-3 ml-2" />
                        <span>{anomaly.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                      {getSeverityText(anomaly.severity)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      anomaly.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                      anomaly.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-400' :
                      anomaly.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {anomaly.status === 'new' ? 'Новая' :
                       anomaly.status === 'investigating' ? 'Расследуется' :
                       anomaly.status === 'resolved' ? 'Решена' : 'Ложная тревога'}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">{anomaly.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">NDVI (Заявленный)</div>
                    <div className="text-lg font-semibold text-white">{anomaly.ndviDeclared}</div>
                    <div className="text-xs text-red-400">vs факт: {anomaly.ndviActual}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Субсидии (Заявленные)</div>
                    <div className="text-lg font-semibold text-white">{anomaly.subsidyDeclared.toLocaleString()} ₸</div>
                    <div className="text-xs text-red-400">vs факт: {anomaly.subsidyActual.toLocaleString()} ₸</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Площадь</div>
                    <div className="text-lg font-semibold text-white">{anomaly.location.area} га</div>
                    <button className="text-xs text-emerald-400 hover:text-emerald-300 mt-1">
                      Посмотреть на карте →
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-emerald-400">
                    💡 {anomaly.recommendation}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Действие для кнопки
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition"
                  >
                    <Eye className="w-4 h-4" />
                    Детали
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for anomaly details */}
      {selectedAnomaly && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4" onClick={() => setSelectedAnomaly(null)}>
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Детали аномалии</h2>
              <button onClick={() => setSelectedAnomaly(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-6">
              {/* Детальное содержимое */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Хозяйство</div>
                    <div className="text-lg font-semibold text-white">{selectedAnomaly.farmName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Дата обнаружения</div>
                    <div className="text-lg font-semibold text-white">{selectedAnomaly.date}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-3">Анализ NDVI</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Ожидаемый NDVI:</span>
                      <span className="text-white">{selectedAnomaly.ndviDeclared}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Фактический NDVI:</span>
                      <span className="text-red-400">{selectedAnomaly.ndviActual}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(selectedAnomaly.ndviActual / selectedAnomaly.ndviDeclared) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-3">Рекомендованные действия</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      Провести выездную проверку хозяйства
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      Запросить документы об использовании удобрений
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      Сравнить с данными соседних хозяйств
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                    Отправить на проверку
                  </button>
                  <button className="flex-1 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition">
                    Отметить как ложную
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Демо данные
const demoAnomalies: Anomaly[] = [
  {
    id: '1',
    farmName: 'ТОО "АгроКазахстан"',
    farmId: 'AGRO-001',
    type: 'fertilizer',
    severity: 'critical',
    description: 'Выявлено значительное расхождение между заявленным использованием удобрений и фактическими показателями NDVI',
    date: '2026-04-15',
    status: 'new',
    ndviDeclared: 0.72,
    ndviActual: 0.45,
    subsidyDeclared: 450000,
    subsidyActual: 320000,
    recommendation: 'Необходима срочная проверка целевого использования субсидий на удобрения',
    location: { lat: 54.458, lng: 70.35, area: 320 }
  },
  {
    id: '2',
    farmName: 'КХ "Зерновое"',
    farmId: 'ZERN-002',
    type: 'subsidy',
    severity: 'high',
    description: 'Расхождение в отчетности по субсидиям на 130,000 тенге',
    date: '2026-04-14',
    status: 'investigating',
    ndviDeclared: 0.65,
    ndviActual: 0.58,
    subsidyDeclared: 580000,
    subsidyActual: 450000,
    recommendation: 'Запросить уточняющие документы и провести сверку',
    location: { lat: 54.5, lng: 70.4, area: 250 }
  },
  {
    id: '3',
    farmName: 'ТОО "Степное"',
    farmId: 'STEP-003',
    type: 'vegetation',
    severity: 'medium',
    description: 'Снижение вегетационного индекса на 30% по сравнению с прошлым сезоном',
    date: '2026-04-13',
    status: 'new',
    ndviDeclared: 0.70,
    ndviActual: 0.49,
    subsidyDeclared: 380000,
    subsidyActual: 380000,
    recommendation: 'Провести анализ почвы и проверить систему орошения',
    location: { lat: 54.4, lng: 70.3, area: 180 }
  }
]