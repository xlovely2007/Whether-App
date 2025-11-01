import React from 'react';
import { WeatherIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <WeatherIcon className="h-8 w-8 text-white" />
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Modern Weather
        </h1>
      </div>
    </header>
  );
};
