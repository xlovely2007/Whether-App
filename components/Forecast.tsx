import React from 'react';
import { WeatherData } from '../services/weatherService';
import { WeatherConditionIcon } from './WeatherConditionIcon';

interface ForecastProps {
  data: WeatherData['forecast'];
}

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
      <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">5-Day Forecast</h3>
      <div className="flex justify-between items-center text-center">
        {data.slice(0, 5).map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <p className="font-bold text-sm">{getDayName(day.date)}</p>
            <WeatherConditionIcon code={day.day.condition.code} isDay={true} className="w-10 h-10" />
            <div className="text-sm">
              <span className="font-bold">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-white/70 ml-1">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
