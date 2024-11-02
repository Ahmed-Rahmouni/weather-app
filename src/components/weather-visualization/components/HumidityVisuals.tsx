import React from 'react';
import WeatherCard from './weatherVisualsCard';
import { Droplets } from 'lucide-react';

// Define the type for humidity props
type HumidityVisualsProps = {
  humidity: number;
};

// Main component to display humidity visual
export default function HumidityVisuals({ humidity }: HumidityVisualsProps) {
  // Helper function to determine humidity status based on level
  const getHumidityStatus = (humidity: number): string => {
    if (humidity < 30) return 'Low';
    if (humidity <= 60) return 'Optimal';
    if (humidity <= 70) return 'Moderate';
    return 'High';
  };

  // Render the WeatherCard component with humidity data
  return (
    <WeatherCard
      icon={Droplets} // Icon for humidity
      value={Math.round(humidity)} // Rounded humidity value
      unit="%" // Unit as percentage
      label="Humidity" // Label for card
      normalizedValue={Math.round(humidity)} // Normalized value for UI styling
      complementaryInfo={`${getHumidityStatus(humidity)} humidity levels`} // Status description
    />
  );
}
