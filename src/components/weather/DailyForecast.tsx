'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  formatDate,
  getWeatherDescriptionDaily,
  getWeatherIconDaily,
} from '@/utils/weatherDailyForecast';
import { useThemeStore, useUnitsStore } from '@/store/weatherStore';
import {
  WeatherForecastDailyIntervals,
  WeatherForecastDailyTimeline,
  WeatherForecastDailyValues,
} from '@/types/weather';

// Define the props for the DailyForecast component
type DailyWeatherProps = {
  loading: boolean;
  dailyWeather: WeatherForecastDailyTimeline | null;
};

export default function DailyForecast({
  loading,
  dailyWeather,
}: DailyWeatherProps) {
  const { isDarkMode } = useThemeStore(); // Get the dark mode state
  const { units } = useUnitsStore(); // Get the units of measurement

  // Extract daily intervals from the weather data
  const intervals = dailyWeather?.intervals as WeatherForecastDailyIntervals[];

  // Show loading state if data is still being fetched
  if (loading) {
    return (
      <div className="h-full space-y-4">
        <h2 className="text-2xl font-bold">5-Day Forecast</h2>
        <div className="flex flex-col gap-4 h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`animate-pulse h-20 ${
                isDarkMode ? 'bg-gray-200' : 'bg-gray-950'
              } rounded-xl flex-shrink-0`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">5-Day Forecast</h2>
      <div className="flex flex-col gap-4">
        {intervals.slice(0, 5).map((interval, index) => {
          const values = interval.values as WeatherForecastDailyValues;

          // Calculate max and min temperatures based on selected units
          const maxTemp = Math.round(
            units === 'metric'
              ? values.temperatureMax
              : (values.temperatureMax * 9) / 5 + 32
          );

          const minTemp = Math.round(
            units === 'metric'
              ? values.temperatureMin
              : (values.temperatureMin * 9) / 5 + 32
          );

          const precipProb = Math.round(values.precipitationProbabilityMax);
          const weatherCode = values.weatherCodeDay;

          return (
            <motion.div
              key={interval.startTime}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`flex items-center justify-around gap-2 sm:gap-4 md:gap-6 lg:gap-8 overflow-hidden p-4 relative ${
                  isDarkMode
                    ? 'bg-gray-700/50 hover:bg-gray-600/50'
                    : 'bg-white/50 hover:bg-white/70'
                } backdrop-blur-sm transition-all duration-300 cursor-pointer`}
              >
                <span className="text-lg font-medium grow">
                  {formatDate(interval.startTime, index)}
                </span>

                <div className="flex flex-col-reverse sm:flex-row items-center gap-1 shrink-0">
                  {precipProb > 20 && (
                    <span className="text-sm text-blue-500">{precipProb}%</span>
                  )}
                  <Image
                    src={getWeatherIconDaily(weatherCode)}
                    width={40}
                    height={40}
                    alt={getWeatherDescriptionDaily(weatherCode)}
                  />
                </div>

                <div className="flex justify-center items-baseline gap-0.5 w-24">
                  <span className="text-2xl font-bold">{maxTemp}°</span>
                  <span className="text-2xl font-bold">/</span>
                  <span className="text-lg text-gray-500">{minTemp}°</span>
                </div>

                {/* Weather Description Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                  <span className="text-white text-md font-semibold p-2 text-center">
                    {getWeatherDescriptionDaily(weatherCode)}
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
