'use client';
import { useState, useEffect } from 'react';
import { GeonameCity } from '@/types/searchCity';
import CityAutoComplete from '@/components/weather/CityAutoComplete';
import {
  useLocationCityStore,
  useThemeStore,
  useUnitsStore,
} from '@/store/weatherStore';
import { FaLocationDot } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

// Main component for searching and selecting a city.
export default function SearchCity() {
  // State to determine if the component is rendered on the client side.
  const [isClient, setIsClient] = useState(false);

  // Access theme store to get dark mode status.
  const { isDarkMode } = useThemeStore();

  // Access location city store to manage selected city and its history.
  const {
    selectedCity,
    selectCity,
    resetCityInput,
    locationsHistory,
    setLocationHistory,
  } = useLocationCityStore();

  // Access units store to manage temperature unit preferences.
  const { toggleUnits, units } = useUnitsStore();

  // Effect to set client-side rendering state.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle city selection
  const handleCitySelect = (city: GeonameCity) => {
    selectCity(city);

    // Update the history without duplicates
    const modifiedLocationHistory = [
      city,
      ...locationsHistory.filter(
        location =>
          !(
            location.toponymName === city.toponymName &&
            location.countryName === city.countryName
          )
      ),
    ].slice(0, 100); // Limit the history to the latest 100 entries

    // Set the new location history
    setLocationHistory(modifiedLocationHistory);

    // Reset the city input field.
    resetCityInput();
  };

  // Prevent rendering on the server side.
  if (!isClient) {
    return null;
  }

  // Dynamic classes based on dark mode for styling.
  const headingClasses = `text-2xl font-bold mb-6 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }`;
  const containerClasses = `flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3 mt-6 mb-2 p-4 rounded-lg ${
    isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
  } backdrop-blur-sm transition-colors duration-300`;

  const iconClasses = `text-xl ${
    isDarkMode ? 'text-blue-400' : 'text-blue-600'
  }`;

  return (
    <div>
      <h1 className={headingClasses}>Current Conditions</h1>

      <CityAutoComplete onCitySelect={handleCitySelect} />

      <div className={containerClasses}>
        <div className="flex gap-2 grow">
          <FaLocationDot className={iconClasses} />
          <h2 className="text-base font-medium grow">
            {selectedCity
              ? `${locationsHistory[0].toponymName}, ${locationsHistory[0].countryName}`
              : 'New York, United States'}
          </h2>
        </div>
        <Button onClick={toggleUnits}>
          {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </Button>
      </div>
    </div>
  );
}
