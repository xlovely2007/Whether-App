import React from 'react';
import { WeatherData } from '../services/weatherService';
import { WeatherConditionIcon } from './WeatherConditionIcon';
import { ThermometerIcon, WindIcon, HumidityIcon } from './IconComponents';

interface CurrentWeatherProps {
  data: WeatherData['current'];
  location: WeatherData['location'];
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, location }) => {
  return (
    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Location and Temp */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{location.city}</h2>
          <p className="text-lg text-white/80">{location.country}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
             <div className="text-6xl md:text-7xl font-extrabold">
                {Math.round(data.temp_c)}°
             </div>
             <p className="text-lg font-medium text-white/90 self-end mb-2">{data.condition.text}</p>
          </div>
        </div>
        
        {/* Icon */}
        <div className="flex-shrink-0">
          <WeatherConditionIcon code={data.condition.code} isDay={data.is_day} className="w-24 h-24 md:w-32 md:h-32" />
        </div>

        {/* Details */}
        <div className="w-full md:w-auto grid grid-cols-3 gap-4 text-center md:text-left text-sm font-medium">
            <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 text-white/80">
                    <ThermometerIcon className="w-5 h-5" />
                    <span>Feels Like</span>
                </div>
                <span className="font-bold text-lg">{Math.round(data.feelslike_c)}°</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
                 <div className="flex items-center gap-2 text-white/80">
                    <WindIcon className="w-5 h-5" />
                    <span>Wind</span>
                </div>
                <span className="font-bold text-lg">{data.wind_kph} km/h</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
                 <div className="flex items-center gap-2 text-white/80">
                    <HumidityIcon className="w-5 h-5" />
                    <span>Humidity</span>
                </div>
                <span className="font-bold text-lg">{data.humidity}%</span>
            </div>
        </div>
      </div>
    </div>
  );
};
