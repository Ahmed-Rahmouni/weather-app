'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  getWeatherDescriptionHourly,
  getWeatherIconHourly,
} from '@/utils/weatherHourlyForecast';
import { useThemeStore, useUnitsStore } from '@/store/weatherStore';
import {
  WeatherForecastDailyTimeline,
  WeatherForecastDailyValues,
  WeatherForecastHourlyTimeline,
  WeatherForecastHourlyValues,
} from '@/types/weather';
import { isNight } from '@/lib/utils';

// Define the props for the CurrentWeather component
type CurrentWeatherProps = {
  loading: boolean;
  hourlyWeather: WeatherForecastHourlyTimeline | null;
  dailyWeather: WeatherForecastDailyTimeline | null;
  timezoneOffset: number;
};

export default function CurrentWeather({
  loading,
  hourlyWeather,
  dailyWeather,
  timezoneOffset,
}: CurrentWeatherProps) {
  const { isDarkMode } = useThemeStore(); // Get the dark mode state
  const { units } = useUnitsStore(); // Get the units of measurement

  // Extract hourly and daily values from the weather data
  const hourlyValues = hourlyWeather?.intervals[0]
    .values as WeatherForecastHourlyValues;
  const dailyValues = dailyWeather?.intervals[0]
    .values as WeatherForecastDailyValues;

  // Show loading state if data is still being fetched
  if (loading) {
    return (
      <div
        className={`animate-pulse h-28 sm:h-32 lg:h-28 ${
          isDarkMode ? 'bg-gray-200' : 'bg-gray-950'
        } rounded-lg`}
      />
    );
  }

  // Extract weather code and check if it's nighttime
  const weatherCode = hourlyValues.weatherCode;
  const isNightTime = isNight(
    timezoneOffset,
    dailyValues.sunriseTime ?? '',
    dailyValues.sunsetTime ?? ''
  );

  // Calculate temperatures based on selected units
  const temperature = Math.round(
    units === 'metric'
      ? hourlyValues.temperature
      : (hourlyValues.temperature * 9) / 5 + 32
  );

  const temperatureApparent = Math.round(
    units === 'metric'
      ? hourlyValues.temperatureApparent
      : (hourlyValues.temperatureApparent * 9) / 5 + 32
  );

  const weatherIcon = getWeatherIconHourly(weatherCode, isNightTime, 'big');
  const weatherDescription = getWeatherDescriptionHourly(weatherCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div
        className={`rounded-xl p-6 ${
          isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
        } backdrop-blur-sm transition-all duration-300`}
      >
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Temperature and Icon */}
          <div className="flex items-center gap-3">
            <div className="text-6xl font-bold tracking-tighter">
              {temperature}°
            </div>
            <Image
              src={weatherIcon}
              width={80}
              height={80}
              alt={weatherDescription}
              className="filter drop-shadow-lg"
            />
          </div>

          {/* Weather Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xl font-medium mb-2">{weatherDescription}</p>
            <div className="flex flex-wrap lg:flex-col gap-x-6 gap-y-2 text-sm opacity-75">
              <p>Feels like {temperatureApparent}°</p>
              <p>
                High:{' '}
                {Math.round(
                  units === 'metric'
                    ? dailyValues.temperatureMax
                    : (dailyValues.temperatureMax * 9) / 5 + 32
                )}
                °
              </p>
              <p>
                Low:{' '}
                {Math.round(
                  units === 'metric'
                    ? dailyValues.temperatureMin
                    : (dailyValues.temperatureMin * 9) / 5 + 32
                )}
                °
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
