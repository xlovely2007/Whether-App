import React from 'react';
import { SunIcon, MoonIcon, CloudIcon, RainIcon, SnowIcon } from './IconComponents';

interface WeatherConditionIconProps {
  code: number;
  isDay: boolean;
  className?: string;
}

export const WeatherConditionIcon: React.FC<WeatherConditionIconProps> = ({ code, isDay, className }) => {
  const props = { className: className || 'w-16 h-16' };

  // Mapping based on common weather API condition codes
  switch (code) {
    // Sunny / Clear
    case 1000:
      return isDay ? <SunIcon {...props} /> : <MoonIcon {...props} />;
    
    // Cloudy
    case 1003: // Partly cloudy
    case 1006: // Cloudy
    case 1009: // Overcast
      return <CloudIcon {...props} />;

    // Rain
    case 1063: // Patchy rain possible
    case 1180: // Patchy light rain
    case 1183: // Light rain
    case 1186: // Moderate rain at times
    case 1189: // Moderate rain
    case 1192: // Heavy rain at times
    case 1195: // Heavy rain
      return <RainIcon {...props} />;
      
    // Snow
    case 1066: // Patchy snow possible
    case 1210: // Patchy light snow
    case 1213: // Light snow
    case 1216: // Patchy moderate snow
    case 1219: // Moderate snow
    case 1222: // Patchy heavy snow
    case 1225: // Heavy snow
      return <SnowIcon {...props} />;

    // Default
    default:
      return <CloudIcon {...props} />;
  }
};
