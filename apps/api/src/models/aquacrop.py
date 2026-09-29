from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class AquaCropModel:
    """Упрощенная реализация AquaCrop для демо"""
    
    def __init__(self):
        self.crop_params = {
            'wheat': {
                'kc': 1.05,
                'wp': 18.5,
                'harvest_index': 0.45,
                'gdd_seedling': 180,
                'gdd_flowering': 850
            },
            'barley': {
                'kc': 1.0,
                'wp': 17.8,
                'harvest_index': 0.43,
                'gdd_seedling': 160,
                'gdd_flowering': 800
            },
            'corn': {
                'kc': 1.2,
                'wp': 25.0,
                'harvest_index': 0.52,
                'gdd_seedling': 200,
                'gdd_flowering': 1200
            }
        }
    
    def predict_yield(self, crop_type, weather_data, soil_data):
        params = self.crop_params.get(crop_type, self.crop_params['wheat'])
        
        # Базовый расчет урожайности
        eto = weather_data.get('eto', 5.0)  # Эталонная эвапотранспирация
        rain = weather_data.get('rain', 300)
        soil_water = soil_data.get('available_water', 150)
        
        # Водный стресс
        water_stress = max(0, min(1, (rain + soil_water) / (eto * 500)))
        
        # Температурный стресс
        temp = weather_data.get('temp', 18)
        temp_stress = 1 - max(0, abs(temp - 20) / 30)
        
        # Урожайность (т/га)
        potential_yield = params['harvest_index'] * 10000 * params['kc']
        actual_yield = potential_yield * water_stress * temp_stress
        
        return round(actual_yield, 2)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    model = AquaCropModel()
    
    yield_pred = model.predict_yield(
        data['crop_type'],
        data.get('weather', {}),
        data.get('soil', {})
    )
    
    return jsonify({
        'yield': yield_pred,
        'confidence': 85,
        'recommendations': generate_recommendations(yield_pred, data)
    })

def generate_recommendations(yield_pred, data):
    if yield_pred < 3.0:
        return "Рекомендуется увеличить орошение и внести азотные удобрения"
    elif yield_pred < 4.5:
        return "Оптимальный уровень. Рекомендуется поддерживать влажность почвы"
    else:
        return "Высокая урожайность. Продолжать текущую стратегию"

if __name__ == '__main__':
    app.run(port=5000)