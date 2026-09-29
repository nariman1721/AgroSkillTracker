'use client'

import { useState, useEffect } from 'react'
import { 
  Package, Truck, Warehouse, CheckCircle, AlertCircle, 
  Download, FileText, Search, MapPin, Calendar, Clock,
  QrCode, Scan, TrendingUp, Shield, Users, Box,
  ArrowRight, Check, X, Eye, Printer, Share2,
  Filter, Plus, Settings, Bell, BarChart3, LineChart,
  Activity, Globe, Anchor, Ship, Plane, Navigation
} from 'lucide-react'

interface SupplyStep {
  id: string
  type: 'harvest' | 'transport' | 'storage' | 'processing' | 'delivery' | 'export'
  location: string
  timestamp: string
  status: 'completed' | 'in-progress' | 'pending' | 'alert' | 'delayed'
  quantity: number
  unit: string
  documents: string[]
  responsible: string
  contact: string
  notes?: string
  coordinates?: { lat: number; lng: number }
}

interface SupplyChain {
  id: string
  product: string
  origin: string
  destination: string
  startDate: string
  expectedDate: string
  status: 'active' | 'completed' | 'delayed' | 'alert'
  steps: SupplyStep[]
  totalDistance: number
  carbonFootprint: number
  transparencyScore: number
}

export default function SupplyChainPage() {
  const [trackingId, setTrackingId] = useState('')
  const [supplyChain, setSupplyChain] = useState<SupplyChain | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'timeline' | 'map' | 'analytics'>('timeline')
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    dateRange: 'week'
  })

  // Демо данные для быстрого просмотра
  const demoChains: SupplyChain[] = [
    {
      id: 'AGRO-2026-001',
      product: 'Пшеница высшего сорта',
      origin: 'ТОО "АгроКазахстан", СКО',
      destination: 'Элеватор "Зерновой", г. Петропавловск',
      startDate: '2026-04-10',
      expectedDate: '2026-04-18',
      status: 'active',
      steps: [
        {
          id: 'step1',
          type: 'harvest',
          location: 'Поле №3, ТОО "АгроКазахстан"',
          timestamp: '2026-04-10 08:30',
          status: 'completed',
          quantity: 45,
          unit: 'тонн',
          documents: ['Акт сбора урожая.pdf', 'Сертификат качества.pdf'],
          responsible: 'Иванов И.И.',
          contact: '+7 (701) 123-45-67'
        },
        {
          id: 'step2',
          type: 'transport',
          location: 'Трасса А-13, 45 км',
          timestamp: '2026-04-11 14:20',
          status: 'completed',
          quantity: 45,
          unit: 'тонн',
          documents: ['Транспортная накладная.pdf', 'Путевой лист.pdf'],
          responsible: 'Петров А.С.',
          contact: '+7 (702) 234-56-78',
          notes: 'Транспортировка прошла без задержек'
        },
        {
          id: 'step3',
          type: 'storage',
          location: 'Склад №5, Элеватор "Зерновой"',
          timestamp: '2026-04-12 09:15',
          status: 'completed',
          quantity: 45,
          unit: 'тонн',
          documents: ['Акт приема-передачи.pdf', 'Складская квитанция.pdf'],
          responsible: 'Сидоров В.П.',
          contact: '+7 (703) 345-67-89'
        },
        {
          id: 'step4',
          type: 'processing',
          location: 'Мелькомбинат №1',
          timestamp: '2026-04-15 10:00',
          status: 'in-progress',
          quantity: 45,
          unit: 'тонн',
          documents: ['Договор переработки.pdf'],
          responsible: 'Кузнецов Д.М.',
          contact: '+7 (704) 456-78-90',
          notes: 'Переработка в муку высшего сорта'
        },
        {
          id: 'step5',
          type: 'delivery',
          location: 'Торговая сеть "Астык"',
          timestamp: '2026-04-18 16:00',
          status: 'pending',
          quantity: 40,
          unit: 'тонн',
          documents: [],
          responsible: 'Орлов К.Н.',
          contact: '+7 (705) 567-89-01'
        }
      ],
      totalDistance: 320,
      carbonFootprint: 45.2,
      transparencyScore: 98
    },
    {
      id: 'AGRO-2026-002',
      product: 'Ячмень фуражный',
      origin: 'КХ "Зерновое", Акмолинская обл.',
      destination: 'Птицефабрика "Куриный рай"',
      startDate: '2026-04-12',
      expectedDate: '2026-04-19',
      status: 'alert',
      steps: [
        {
          id: 'step1',
          type: 'harvest',
          location: 'Поле №7, КХ "Зерновое"',
          timestamp: '2026-04-12 10:00',
          status: 'completed',
          quantity: 30,
          unit: 'тонн',
          documents: ['Акт сбора.pdf'],
          responsible: 'Мельник С.С.',
          contact: '+7 (706) 678-90-12'
        },
        {
          id: 'step2',
          type: 'transport',
          location: 'Трасса М-36, 78 км',
          timestamp: '2026-04-13 09:30',
          status: 'alert',
          quantity: 30,
          unit: 'тонн',
          documents: ['Транспортная накладная.pdf'],
          responsible: 'Водитель: Нурланов Е.',
          contact: '+7 (707) 789-01-23',
          notes: '⚠️ Задержка из-за поломки транспорта'
        }
      ],
      totalDistance: 180,
      carbonFootprint: 28.5,
      transparencyScore: 85
    }
  ]

  const trackSupply = async () => {
    if (!trackingId) return
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      const found = demoChains.find(chain => chain.id === trackingId)
      setSupplyChain(found || null)
    } catch (error) {
      console.error('Tracking error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStepIcon = (type: string) => {
    switch(type) {
      case 'harvest': return <Package className="w-5 h-5 text-emerald-400" />
      case 'transport': return <Truck className="w-5 h-5 text-blue-400" />
      case 'storage': return <Warehouse className="w-5 h-5 text-amber-400" />
      case 'processing': return <Settings className="w-5 h-5 text-purple-400" />
      case 'delivery': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'export': return <Globe className="w-5 h-5 text-indigo-400" />
      default: return <Package className="w-5 h-5 text-slate-400" />
    }
  }

  const getStepTypeText = (type: string) => {
    const types = {
      harvest: 'Сбор урожая',
      transport: 'Транспортировка',
      storage: 'Хранение',
      processing: 'Переработка',
      delivery: 'Доставка',
      export: 'Экспорт'
    }
    return types[type as keyof typeof types] || type
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'alert': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'delayed': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusText = (status: string) => {
    const texts = {
      completed: 'Завершено',
      'in-progress': 'В процессе',
      pending: 'Ожидание',
      alert: 'Аларм',
      delayed: 'Задержка'
    }
    return texts[status as keyof typeof texts] || status
  }

  const exportReport = () => {
    if (!supplyChain) return
    const reportData = {
      ...supplyChain,
      exportedAt: new Date().toISOString(),
      reportType: 'supply_chain_tracking'
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `supply-chain-${supplyChain.id}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const generateQR = () => {
    // Генерация QR кода для отслеживания
    console.log('Generating QR for:', trackingId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
            Прослеживаемость продукции
          </h1>
          <p className="text-slate-400">Отслеживание цепочек поставок сельхозпродукции (KU Track)</p>
        </div>

        {/* Search Section */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && trackSupply()}
                placeholder="Введите номер партии, QR-код или номер накладной..."
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-lg"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={trackSupply}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Поиск...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    Отследить
                  </>
                )}
              </button>
              <button
                onClick={generateQR}
                className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-600 transition flex items-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                QR-код
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {demoChains.map(chain => (
              <button
                key={chain.id}
                onClick={() => {
                  setTrackingId(chain.id)
                  setSupplyChain(chain)
                }}
                className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition whitespace-nowrap"
              >
                {chain.id}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {supplyChain && (
          <div className="space-y-6">
            {/* Chain Header */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800/50 rounded-xl p-6 border border-emerald-500/30">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-6 h-6 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white">{supplyChain.product}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(supplyChain.status)}`}>
                      {getStatusText(supplyChain.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-slate-400">Номер партии</div>
                      <div className="text-white font-mono">{supplyChain.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Дата отгрузки</div>
                      <div className="text-white">{supplyChain.startDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Отправитель</div>
                      <div className="text-white">{supplyChain.origin}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Получатель</div>
                      <div className="text-white">{supplyChain.destination}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={exportReport}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition"
                  >
                    <Download className="w-4 h-4" />
                    Отчет
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition">
                    <Printer className="w-4 h-4" />
                    Печать
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition">
                    <Share2 className="w-4 h-4" />
                    Поделиться
                  </button>
                </div>
              </div>
            </div>

            {/* View Mode Tabs */}
            <div className="flex gap-2 border-b border-slate-700">
              {[
                { id: 'timeline', label: 'Временная шкала', icon: Clock },
                { id: 'map', label: 'Карта маршрута', icon: MapPin },
                { id: 'analytics', label: 'Аналитика', icon: BarChart3 }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                    viewMode === mode.id
                      ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Timeline View */}
            {viewMode === 'timeline' && (
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700"></div>
                  
                  <div className="space-y-8">
                    {supplyChain.steps.map((step, index) => (
                      <div key={step.id} className="relative">
                        {/* Timeline node */}
                        <div className={`absolute left-6 w-5 h-5 rounded-full flex items-center justify-center z-10 ${
                          step.status === 'completed' ? 'bg-emerald-500' :
                          step.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                          step.status === 'alert' ? 'bg-red-500' : 'bg-slate-600'
                        }`}>
                          {step.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                          {step.status === 'alert' && <AlertCircle className="w-3 h-3 text-white" />}
                        </div>
                        
                        {/* Step content */}
                        <div className="ml-16">
                          <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700 hover:border-slate-600 transition cursor-pointer"
                               onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}>
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                {getStepIcon(step.type)}
                                <div>
                                  <h3 className="font-semibold text-white text-lg">
                                    {getStepTypeText(step.type)}
                                  </h3>
                                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {step.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {step.timestamp}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-sm text-slate-400">Объем</div>
                                  <div className="font-semibold text-white">{step.quantity} {step.unit}</div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                                  {getStatusText(step.status)}
                                </span>
                              </div>
                            </div>
                            
                            {/* Expanded details */}
                            {activeStep === step.id && (
                              <div className="mt-4 pt-4 border-t border-slate-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm text-slate-400 mb-2">Ответственный</div>
                                    <div className="text-white">{step.responsible}</div>
                                    <div className="text-sm text-slate-400 mt-2">{step.contact}</div>
                                  </div>
                                  {step.notes && (
                                    <div>
                                      <div className="text-sm text-slate-400 mb-2">Примечания</div>
                                      <div className="text-slate-300">{step.notes}</div>
                                    </div>
                                  )}
                                  {step.documents.length > 0 && (
                                    <div className="md:col-span-2">
                                      <div className="text-sm text-slate-400 mb-2">Документы</div>
                                      <div className="flex flex-wrap gap-2">
                                        {step.documents.map(doc => (
                                          <button
                                            key={doc}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-600 transition"
                                          >
                                            <FileText className="w-4 h-4" />
                                            {doc}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Connection arrow between steps */}
                          {index < supplyChain.steps.length - 1 && (
                            <div className="ml-8 my-2 flex justify-center">
                              <ArrowRight className="w-5 h-5 text-slate-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Map View */}
            {viewMode === 'map' && (
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <div className="h-[500px] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <p className="text-slate-400">Интерактивная карта маршрута</p>
                    <p className="text-sm text-slate-500 mt-2">Общая дистанция: {supplyChain.totalDistance} км</p>
                    <p className="text-sm text-slate-500">Углеродный след: {supplyChain.carbonFootprint} кг CO₂</p>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics View */}
            {viewMode === 'analytics' && (
              <div className="space-y-6">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-400">Прозрачность цепочки</span>
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">{supplyChain.transparencyScore}%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${supplyChain.transparencyScore}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-400">Эффективность логистики</span>
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">94%</div>
                    <div className="text-sm text-slate-400 mt-2">-6% от плана</div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-400">Среднее время этапа</span>
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">1.8 дн</div>
                    <div className="text-sm text-slate-400 mt-2">Оптимально: 2.0 дн</div>
                  </div>
                </div>

                {/* Additional Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <h3 className="font-semibold text-white mb-4">Статус выполнения</h3>
                    <div className="space-y-3">
                      {['completed', 'in-progress', 'pending', 'alert'].map(status => {
                        const count = supplyChain.steps.filter(s => s.status === status).length
                        const percentage = (count / supplyChain.steps.length) * 100
                        return (
                          <div key={status}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-400">{getStatusText(status)}</span>
                              <span className="text-white">{count} / {supplyChain.steps.length}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  status === 'completed' ? 'bg-green-500' :
                                  status === 'in-progress' ? 'bg-blue-500' :
                                  status === 'alert' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <h3 className="font-semibold text-white mb-4">Экологические показатели</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Углеродный след</span>
                          <span className="text-white">{supplyChain.carbonFootprint} кг CO₂</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Эффективность маршрута</span>
                          <span className="text-white">87%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alerts Section */}
            {supplyChain.status === 'alert' && (
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-400 mb-1">Аларм: Задержка в цепочке поставок</h3>
                    <p className="text-slate-300">
                      Обнаружена задержка на этапе транспортировки. Причина: поломка транспортного средства.
                      Ожидаемое время решения: 4-6 часов.
                    </p>
                    <button className="mt-3 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm">
                      Подробнее о проблеме
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {trackingId && !supplyChain && !loading && (
          <div className="bg-slate-800/50 rounded-xl p-12 text-center border border-slate-700">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Партия не найдена</h3>
            <p className="text-slate-400">
              Партия с номером "{trackingId}" не найдена в системе. 
              Проверьте правильность номера или попробуйте другой.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Информация о системе прослеживаемости</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-emerald-400 font-medium mb-1">Что отслеживается?</div>
              <p className="text-slate-400">Каждый этап пути продукции от поля до прилавка с фиксацией времени, места и ответственных лиц.</p>
            </div>
            <div>
              <div className="text-emerald-400 font-medium mb-1">Как это работает?</div>
              <p className="text-slate-400">QR-коды на каждой партии, сканирование на контрольных точках, автоматическая фиксация в блокчейне.</p>
            </div>
            <div>
              <div className="text-emerald-400 font-medium mb-1">Преимущества</div>
              <p className="text-slate-400">Полная прозрачность, защита от подделок, быстрый отзыв продукции при необходимости.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}