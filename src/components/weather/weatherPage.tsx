'use client';
import { useEffect, useState } from 'react';
import SearchCity from '@/components/weather/SearchCity';
import CurrentWeather from '@/components/weather/CurrentWeather';
import HourlyForecast from '@/components/weather/HourlyForecast';
import DailyForecast from '@/components/weather/DailyForecast';
import WeatherVisuals from '@/components/weather-visualization/WeatherVisuals';
import {
  useLocationCityStore,
  useThemeStore,
  useWeatherDataStore,
} from '@/store/weatherStore';
import SunSchedule from '@/components/weather-visualization/components/SunriseSunsetVisuals';
import Footer from '@/components/shared/Footer';
import ErrorMessage from '@/components/shared/ErrorMessage';
import useWeatherForecast from '@/hooks/useWeatherForecast';
import LoadingSpinner from '@/app/loading';

// Main WeatherPage component that displays weather data.
export default function WeatherPage() {
  // State to determine if the component is rendered on the client side.
  const [isClient, setIsClient] = useState(false);

  // Access theme store to get dark mode status.
  const { isDarkMode } = useThemeStore();

  // Access location city store to get the current location.
  const { location } = useLocationCityStore();

  // Fetch weather data using a custom hook and manage loading/error states.
  const { isLoading, isError, error, refetch, isRefetching } =
    useWeatherForecast({
      location,
    });

  // Access weather data store for hourly and daily forecasts.
  const { hourlyWeather, dailyWeather, timezoneOffset } = useWeatherDataStore();

  // Effect to set client-side rendering state.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading spinner while waiting for client-side rendering.
  if (!isClient) {
    return <LoadingSpinner />;
  }

  // Show error message if an error occurred while fetching weather data.
  if (isError && error) {
    return (
      <ErrorMessage error={error} refresh={refetch} loading={isRefetching} />
    );
  }

  return (
    <div
      className={`font-poppins min-h-screen min-w-[320px] w-full transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-100 to-blue-200 text-gray-900'
      }`}
    >
      {/* Container with responsive padding and height */}
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl min-h-screen lg:h-screen lg:overflow-hidden">
        {/* Main grid with responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 lg:h-full lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <div
              className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800/90' : 'bg-white/80'
              } backdrop-blur-sm shadow-lg`}
            >
              <SearchCity />
              <CurrentWeather
                loading={isLoading}
                hourlyWeather={hourlyWeather}
                dailyWeather={dailyWeather}
                timezoneOffset={timezoneOffset}
              />
              {!isLoading && <WeatherVisuals hourlyWeather={hourlyWeather} />}
              {!isLoading && (
                <SunSchedule
                  dailyWeather={dailyWeather}
                  timezoneOffset={timezoneOffset}
                />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6 lg:h-full lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <div
              className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800/90' : 'bg-white/80'
              } backdrop-blur-sm shadow-lg`}
            >
              <HourlyForecast
                loading={isLoading}
                hourlyWeather={hourlyWeather}
                dailyWeather={dailyWeather}
              />
            </div>
            <div
              className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800/90' : 'bg-white/80'
              } backdrop-blur-sm shadow-lg`}
            >
              <DailyForecast loading={isLoading} dailyWeather={dailyWeather} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
