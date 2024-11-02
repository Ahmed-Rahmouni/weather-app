'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  formatTo12HourTime,
  getWeatherDescriptionHourly,
  getWeatherIconHourly,
  isNight,
} from '@/utils/weatherHourlyForecast';
import { useThemeStore, useUnitsStore } from '@/store/weatherStore';
import {
  WeatherForecastDailyTimeline,
  WeatherForecastHourlyIntervals,
  WeatherForecastHourlyTimeline,
  WeatherForecastHourlyValues,
} from '@/types/weather';

type HourlyWeatherProps = {
  loading: boolean;
  hourlyWeather: WeatherForecastHourlyTimeline | null;
  dailyWeather: WeatherForecastDailyTimeline | null;
};

// Component to display hourly weather forecast.
export default function HourlyForecast({
  loading,
  hourlyWeather,
  dailyWeather,
}: HourlyWeatherProps) {
  // Access theme store to get dark mode status.
  const { isDarkMode } = useThemeStore();
  // Access units store for temperature unit preferences.
  const { units } = useUnitsStore();

  const intervals =
    hourlyWeather?.intervals as WeatherForecastHourlyIntervals[];

  // Function to render loading state while weather data is being fetched.
  const renderLoadingState = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Hourly Forecast</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`animate-pulse w-24 h-36 ${
              isDarkMode ? 'bg-gray-200' : 'bg-gray-950'
            } rounded-xl flex-shrink-0`}
          />
        ))}
      </div>
    </div>
  );

  // Get background class based on whether it is night or day.
  const getBackgroundClass = (isNightTime: boolean) => {
    return isDarkMode
      ? isNightTime
        ? 'bg-gradient-to-br from-gray-800 to-gray-600 text-white'
        : 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-900'
      : isNightTime
      ? 'bg-gradient-to-br from-gray-900 to-gray-700 text-white'
      : 'bg-gradient-to-br from-white to-gray-200 text-gray-800';
  };

  // Render loading state if data is still being fetched.
  if (loading) return renderLoadingState();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Hourly Forecast</h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {intervals.slice(0, 25).map((interval, index) => {
            const values = interval.values as WeatherForecastHourlyValues;
            const weatherCode = values.weatherCode;

            // Determine if the current interval is at night.
            const isNightTime = isNight(
              interval.startTime,
              dailyWeather?.intervals[0].values.sunriseTime ?? '',
              dailyWeather?.intervals[0].values.sunsetTime ?? ''
            );

            // Convert temperature based on selected units.
            const temperature = Math.round(
              units === 'metric'
                ? values.temperature
                : (values.temperature * 9) / 5 + 32
            );

            return (
              <motion.div
                key={interval.startTime}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0"
              >
                <Card
                  className={`w-24 h-36 flex flex-col items-center justify-between p-4 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300 ${getBackgroundClass(
                    isNightTime
                  )}`}
                >
                  <span className="text-sm font-medium">
                    {index === 0
                      ? 'Now'
                      : formatTo12HourTime(interval.startTime)}
                  </span>

                  <Image
                    src={getWeatherIconHourly(
                      weatherCode,
                      isNightTime,
                      'small'
                    )}
                    width={40}
                    height={40}
                    alt={getWeatherDescriptionHourly(weatherCode)}
                    className="my-2"
                  />

                  <span className="text-2xl font-bold">{temperature}°</span>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
