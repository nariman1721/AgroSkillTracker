import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const farmId = searchParams.get('farm')
  
  // Анализ аномалий на основе NDVI и данных субсидий
  const anomalies = [
    {
      type: 'fertilizer_misuse',
      severity: 'high',
      description: 'Несоответствие NDVI заявленному использованию удобрений',
      expectedNDVI: 0.72,
      actualNDVI: 0.45,
      loss: '30% урожая'
    },
    {
      type: 'subsidy_anomaly',
      severity: 'critical',
      description: 'Расхождение в отчетности по субсидиям',
      declared: '450,000 ₸',
      actual: '320,000 ₸',
      difference: '130,000 ₸'
    }
  ]
  
  return NextResponse.json({
    farmId,
    anomalies,
    riskScore: 78,
    recommendation: 'Провести внеплановую проверку использования удобрений'
  })
}