import { WeatherUnits } from '@/types/weather';
import { Gauge } from 'lucide-react';
import React from 'react';
import WeatherCard from './weatherVisualsCard';

// Define the type for pressure props
type PressureVisualsProps = {
  pressure: number;
  units: WeatherUnits;
};

// Main component to display pressure visual
export default function PressureVisuals({
  pressure,
  units,
}: PressureVisualsProps) {
  // Helper function to determine pressure status based on level and units
  const getPressureStatus = (pressure: number): string => {
    if (units === 'metric') {
      if (pressure < 980) return 'Very Low';
      if (pressure < 1000) return 'Low';
      if (pressure <= 1020) return 'Normal';
      if (pressure <= 1040) return 'High';
      return 'Very High';
    } else {
      if (pressure < 28.94) return 'Very Low';
      if (pressure < 29.53) return 'Low';
      if (pressure <= 30.12) return 'Normal';
      if (pressure <= 30.71) return 'High';
      return 'Very High';
    }
  };

  // Normalize pressure based on selected units
  const normalizedPressure =
    units === 'metric'
      ? Math.round(pressure)
      : Number((pressure * 0.02953).toFixed(2));

  // Render the WeatherCard component with pressure data
  return (
    <WeatherCard
      icon={Gauge} // Icon for pressure
      value={normalizedPressure} // Displayed pressure value
      unit={units === 'metric' ? 'hPa' : 'inHg'} // Pressure unit based on system
      label="Pressure" // Label for card
      normalizedValue={normalizedPressure} // Normalized value for UI styling
      complementaryInfo={`${getPressureStatus(
        normalizedPressure
      )} pressure system`} // Pressure status description
    />
  );
}
