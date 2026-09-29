import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { cropType, area, region } = await request.json()
    
    // Здесь интеграция с Python моделью AquaCrop
    // Для демо используем имитацию
    
    const baseYield = {
      wheat: 3.8,
      barley: 3.2,
      corn: 8.5,
      sunflower: 2.4
    }
    
    const weatherFactor = 1.05 // благоприятная погода
    const soilFactor = 0.95
    
    const predictedYield = baseYield[cropType as keyof typeof baseYield] * weatherFactor * soilFactor
    const totalYield = predictedYield * Number(area)
    
    return NextResponse.json({
      yield: predictedYield.toFixed(2),
      totalYield: totalYield.toFixed(2),
      confidence: 85,
      recommendations: 'Рекомендуется дополнительное орошение в фазу цветения',
      model: 'AquaCrop v6.1'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Prediction failed' }, { status: 500 })
  }
}