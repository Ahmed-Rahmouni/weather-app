// Import required libraries and components
import { Thermometer } from 'lucide-react';
import React from 'react';
import WeatherCard from './weatherVisualsCard';
import { WeatherUnits } from '@/types/weather';

// Define the props for TemperatureVisuals component
type TemperatureVisualsProps = {
  temperature: number;
  units: WeatherUnits;
};

// Main component to display temperature visual
export default function TemperatureVisuals({
  temperature,
  units,
}: TemperatureVisualsProps) {
  // Helper function to return a temperature descriptor based on temperature value and units
  const getTemperatureDescription = (temperature: number): string => {
    if (units === 'metric') {
      if (temperature <= 0) return 'Freezing';
      if (temperature <= 10) return 'Cold';
      if (temperature <= 20) return 'Cool';
      if (temperature <= 25) return 'Mild';
      if (temperature <= 30) return 'Warm';
      if (temperature <= 35) return 'Hot';
      return 'Very Hot';
    } else {
      if (temperature <= 32) return 'Freezing';
      if (temperature <= 50) return 'Cold';
      if (temperature <= 68) return 'Cool';
      if (temperature <= 77) return 'Mild';
      if (temperature <= 86) return 'Warm';
      if (temperature <= 95) return 'Hot';
      return 'Very Hot';
    }
  };

  // Convert temperature to a normalized value in Celsius or Fahrenheit for display
  const normalizedTemperature = Math.round(
    units === 'metric' ? temperature : (temperature * 9) / 5 + 32
  );

  // Render the WeatherCard component with temperature data
  return (
    <WeatherCard
      icon={Thermometer}
      value={normalizedTemperature}
      unit={units === 'metric' ? '°C' : '°F'}
      label="Temperature"
      normalizedValue={normalizedTemperature}
      complementaryInfo={getTemperatureDescription(normalizedTemperature)}
    />
  );
}
