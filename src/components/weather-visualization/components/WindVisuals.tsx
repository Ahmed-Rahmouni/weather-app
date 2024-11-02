// Import necessary libraries and components
import React from 'react';
import { Wind } from 'lucide-react';
import WeatherCard from './weatherVisualsCard';
import { WeatherUnits } from '@/types/weather';

// Define props for WindVisuals component
type WindVisualsProps = {
  windSpeed: number;
  windDirection: number | null;
  units: WeatherUnits;
};

// Main component to display wind visual
export default function WindVisuals({
  windSpeed,
  windDirection,
  units,
}: WindVisualsProps) {
  // Helper function to describe wind strength based on speed and units
  const getWindDescription = (speed: number): string => {
    const threshold =
      units === 'metric'
        ? { calm: 15, light: 30, moderate: 50, strong: 70 } // km/h
        : { calm: 10, light: 20, moderate: 30, strong: 45 }; // mph

    if (speed < threshold.calm) return 'Calm';
    if (speed < threshold.light) return 'Light breeze';
    if (speed < threshold.moderate) return 'Moderate wind';
    if (speed < threshold.strong) return 'Strong wind';
    return 'Very strong wind';
  };

  // Helper function to describe wind direction based on angle
  const getWindDirectionText = (direction: number | null): string => {
    if (direction === null) return 'No specific direction';
    const compass = [
      'North',
      'North-Northeast',
      'Northeast',
      'East-Northeast',
      'East',
      'East-Southeast',
      'Southeast',
      'South-Southeast',
      'South',
      'South-Southwest',
      'Southwest',
      'West-Southwest',
      'West',
      'West-Northwest',
      'Northwest',
      'North-Northwest',
    ];
    return compass[Math.round((direction % 360) / 22.5)];
  };

  // Normalize wind speed for display in the chosen units
  const normalizedWindSpeed =
    units === 'metric' ? windSpeed * 3.6 : windSpeed * 2.23694;

  // Render WeatherCard component with wind data
  return (
    <WeatherCard
      icon={Wind}
      value={normalizedWindSpeed.toFixed(1)}
      unit={units === 'metric' ? 'km/h' : 'mph'}
      label="Wind"
      normalizedValue={normalizedWindSpeed}
      windDirection={windDirection}
      complementaryInfo={`${getWindDescription(
        normalizedWindSpeed
      )} | from ${getWindDirectionText(windDirection ?? null)}`}
    />
  );
}
