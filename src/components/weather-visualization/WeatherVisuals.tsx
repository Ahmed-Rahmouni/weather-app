'use client';

import React from 'react';
import { useUnitsStore } from '@/store/weatherStore';
import WindVisuals from './components/WindVisuals';
import TemperatureVisuals from './components/TemperatureVisuals';
import PressureVisuals from './components/PressureVisuals';
import HumidityVisuals from './components/HumidityVisuals';
import {
  WeatherForecastHourlyTimeline,
  WeatherForecastHourlyValues,
} from '@/types/weather';

type WeatherVisualsProps = {
  hourlyWeather: WeatherForecastHourlyTimeline | null;
};

// Component to display various weather visualizations (wind, temperature, pressure, humidity).
export default function WeatherVisuals({ hourlyWeather }: WeatherVisualsProps) {
  // Access units store for temperature unit preferences.
  const { units } = useUnitsStore();

  // Get weather values from the first interval of the hourly forecast.
  const values = hourlyWeather?.intervals[0]
    .values as WeatherForecastHourlyValues;

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
        <WindVisuals
          windSpeed={values.windSpeed ?? 0}
          windDirection={values.windDirection ?? null}
          units={units}
        />
        <TemperatureVisuals
          temperature={values.temperature ?? 0}
          units={units}
        />
        <PressureVisuals
          pressure={values.pressureSurfaceLevel ?? 1013}
          units={units}
        />
        <HumidityVisuals humidity={values.humidity ?? 0} />
      </div>
    </div>
  );
}
