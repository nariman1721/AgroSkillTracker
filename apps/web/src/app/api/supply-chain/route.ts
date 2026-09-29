import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackingId = searchParams.get('trackingId')
  
  // Имитация данных цепочки поставок
  const supplySteps = [
    {
      id: '1',
      type: 'harvest',
      location: 'ТОО "АгроКазахстан", поле №3',
      timestamp: '2026-04-10 08:30',
      status: 'completed',
      quantity: 45,
      documents: ['Акт сбора урожая.pdf', 'Сертификат качества.pdf']
    },
    {
      id: '2',
      type: 'transport',
      location: 'Элеватор "Зерновой"',
      timestamp: '2026-04-11 14:20',
      status: 'completed',
      quantity: 45,
      documents: ['Транспортная накладная.pdf']
    },
    {
      id: '3',
      type: 'storage',
      location: 'Склад №5, Элеватор',
      timestamp: '2026-04-12 09:15',
      status: 'in-progress',
      quantity: 45,
      documents: ['Акт приема-передачи.pdf']
    }
  ]
  
  return NextResponse.json({
    trackingId,
    steps: supplySteps,
    totalDistance: 320,
    carbonFootprint: '45 кг CO2'
  })
}