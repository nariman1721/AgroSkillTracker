'use client'

import { useState } from 'react'
import { Calendar, Droplets, Thermometer, Wind, MapPin } from 'lucide-react'

// 1. Описываем структуру ответа от сервера
interface PredictionData {
  yield: number;
  totalYield: number;
  confidence: number;
  recommendations: string;
}

export default function YieldPrediction() {
  const [cropType, setCropType] = useState('wheat')
  const [area, setArea] = useState('')
  
  // 2. Указываем TypeScript, что здесь может быть либо наш объект, либо null
  const [prediction, setPrediction] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(false)

  const crops = [
    { id: 'wheat', name: 'Пшеница', icon: '🌾' },
    { id: 'barley', name: 'Ячмень', icon: '🌾' },
    { id: 'corn', name: 'Кукуруза', icon: '🌽' },
    { id: 'sunflower', name: 'Подсолнечник', icon: '🌻' }
  ]

  const predictYield = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/yield-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropType, area, region: 'sovetskoe' })
      })
      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error('Prediction error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-6">Прогноз урожайности (AquaCrop)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Культура</label>
              <div className="grid grid-cols-2 gap-2">
                {crops.map(crop => (
                  <button
                    key={crop.id}
                    onClick={() => setCropType(crop.id)}
                    className={`p-3 rounded-lg border text-left transition ${
                      cropType === crop.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-xl mr-2">{crop.icon}</span>
                    {crop.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Площадь (гектары)
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="Например: 100"
              />
            </div>

            <button
              onClick={predictYield}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-500 hover:to-teal-500 transition disabled:opacity-50"
            >
              {loading ? 'Расчет...' : 'Прогнозировать урожайность'}
            </button>
          </div>

          {/* Правая панель с параметрами */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold text-white mb-3">Параметры модели AquaCrop</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Температура</span>
                <span className="text-white">18.5°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Осадки</span>
                <span className="text-white">45 мм</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Влажность почвы</span>
                <span className="text-white">62%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Тип почвы</span>
                <span className="text-white">Чернозем</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Здесь TS теперь понимает, что если prediction не null, то у него есть все поля */}
        {prediction && (
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-slate-400">Прогнозируемая урожайность</div>
                <div className="text-3xl font-bold text-emerald-400">{prediction.yield} т/га</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Общий урожай</div>
                <div className="text-2xl font-bold text-white">{prediction.totalYield} тонн</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Доверие модели</div>
                <div className="text-white">±{prediction.confidence}%</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-slate-900/50 rounded border border-emerald-500/20 text-sm text-slate-300">
              <span className="font-semibold text-emerald-400">Рекомендация:</span> {prediction.recommendations}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}