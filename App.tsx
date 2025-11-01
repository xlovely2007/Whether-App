import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { SkeletonLoader } from './components/SkeletonLoader';
import { fetchWeatherData, WeatherData } from './services/weatherService';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getWeather = useCallback(async (location: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Could not fetch weather for "${location}". Please try another city.`);
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLocating(false);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(`${latitude},${longitude}`);
      },
      (err) => {
        console.warn('Geolocation denied. Please use the search bar.', err);
        // Fallback to a default city or let the user search
        getWeather('Delhi');
        setIsLocating(false);
      }
    );
  }, [getWeather]);

  const handleSearch = (searchCity: string) => {
    if (searchCity) {
      getWeather(searchCity);
    }
  };
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-300 selection:text-blue-900 bg-cover bg-center" style={{backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,sky)'}}>
      <div className="min-h-screen w-full bg-black/30 backdrop-blur-sm">
        <Header />
        <main className="container mx-auto p-4 md:p-6 max-w-4xl">
          <SearchBar onSearch={handleSearch} isDisabled={isLoading} />

          {isLocating && <p className="text-center text-lg mt-8 animate-pulse">Finding your location...</p>}

          {isLoading && !isLocating && <SkeletonLoader />}

          {error && (
              <div className="mt-8 bg-red-500/50 p-4 rounded-lg text-center backdrop-blur-sm border border-red-300/50">
                  <p className="font-bold">Oops! Something went wrong.</p>
                  <p>{error}</p>
              </div>
          )}

          {!isLoading && !error && !weatherData && !isLocating && (
            <div className="text-center mt-12 bg-black/20 p-8 rounded-xl backdrop-blur-md">
              <h2 className="text-3xl font-bold">{getGreeting()}</h2>
              <p className="text-lg mt-2 opacity-80">Search for a city to get started and see the weather.</p>
            </div>
          )}
          
          {weatherData && (
            <div className="space-y-6 md:space-y-8 mt-6 animate-fade-in">
              <CurrentWeather data={weatherData.current} location={weatherData.location} />
              <Forecast data={weatherData.forecast} />
            </div>
          )}
        </main>
        <footer className="text-center text-white/70 py-6">
            <p>Powered by the Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
