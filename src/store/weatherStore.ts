// Import necessary modules and types
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  WeatherForecastDailyTimeline,
  WeatherForecastHourlyTimeline,
  WeatherLocation,
  WeatherUnits,
} from '@/types/weather';
import { GeonameCity } from '@/types/searchCity';

// Default values for the application state
const DEFAULT_LOCATION: WeatherLocation = [40.71427, -74.00597]; // Default coordinates for New York City
const DEFAULT_CITY: GeonameCity = {
  adminCode1: 'NY',
  lng: '-74.00597',
  geonameId: 5128581,
  toponymName: 'New York City',
  countryId: '6252001',
  fcl: 'P',
  population: 8804190,
  countryCode: 'US',
  name: 'New York',
  fclName: 'city, village,...',
  adminCodes1: { ISO3166_2: 'NY' },
  countryName: 'United States',
  fcodeName: 'populated place',
  adminName1: 'New York',
  lat: '40.71427',
  fcode: 'PPL',
};

// Helper function to create a no-op storage mechanism for non-browser environments
const createNoopStorage = () => ({
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
});

// Storage mechanism configuration
const storage =
  typeof window !== 'undefined'
    ? createJSONStorage(() => localStorage) // Use localStorage in the browser
    : createNoopStorage(); // Fallback for non-browser environments

/**
 * Units Store
 * Manages the user's preference for weather measurement units (metric/imperial).
 */
type UnitsState = {
  units: WeatherUnits; // Current unit preference
  toggleUnits: () => void; // Function to toggle between metric and imperial units
};

export const useUnitsStore = create<UnitsState>()(
  persist(
    set => ({
      units: 'metric', // Default units set to metric
      toggleUnits: () =>
        set(state => ({
          units: state.units === 'metric' ? 'imperial' : 'metric', // Toggle unit preference
        })),
    }),
    {
      name: 'units-preference', // Key for storage
      storage, // Storage mechanism
    }
  )
);

/**
 * Location and City Store
 * Manages the user's location, search history, and current city selection.
 */
type LocationCityState = {
  location: WeatherLocation; // Current geographical coordinates
  locationsHistory: GeonameCity[]; // History of searched cities
  inputValue: string; // Current input value for city search
  isCitySearchOpen: boolean; // Modal state for city search
  selectedCity: GeonameCity | null; // Currently selected city from the search
  setLocationHistory: (value: GeonameCity[]) => void; // Update the history of searched locations
  setCityInput: (value: string) => void; // Update the city search input
  toggleCitySearch: (isOpen: boolean) => void; // Open or close the city search modal
  selectCity: (city: GeonameCity | null) => void; // Select a city from search results
  resetCityInput: () => void; // Clear the city input value
};

export const useLocationCityStore = create<LocationCityState>()(
  persist(
    set => ({
      location: DEFAULT_LOCATION, // Initialize with the default location
      locationsHistory: [DEFAULT_CITY], // Initialize with a default city in history
      inputValue: '', // Start with an empty search input
      isCitySearchOpen: false, // City search modal is closed by default
      selectedCity: null, // No city selected initially

      // Update location history with new city data
      setLocationHistory: (value: GeonameCity[]) =>
        set({ locationsHistory: value }),

      // Update the input value for city search
      setCityInput: (value: string) => set({ inputValue: value }),

      // Toggle the visibility of the city search modal
      toggleCitySearch: (isOpen: boolean) => set({ isCitySearchOpen: isOpen }),

      // Select a city and update related state values
      selectCity: (city: GeonameCity | null) =>
        set({
          selectedCity: city,
          inputValue: city ? `${city.name}, ${city.countryName}` : '',
          isCitySearchOpen: false, // Close modal upon selection
          location: city
            ? [parseFloat(city.lat), parseFloat(city.lng)] // Update to selected city coordinates
            : DEFAULT_LOCATION, // Default to initial location if no city is selected
        }),

      // Reset the search input value to an empty string
      resetCityInput: () => set({ inputValue: '' }),
    }),
    {
      name: 'location-and-city-preference', // Key for storage
      storage, // Storage mechanism
    }
  )
);

/**
 * Theme Store
 * Manages the user's theme preference (dark mode).
 */
type ThemeState = {
  isDarkMode: boolean; // Current theme mode
  setDarkMode: (isDark: boolean) => void; // Function to set the theme mode
};

export const useThemeStore = create<ThemeState>(set => ({
  isDarkMode: false, // Default theme mode is light
  setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }), // Update the theme mode
}));

/**
 * Weather Data Store
 * Manages the weather data for daily and hourly forecasts.
 */
type WeatherDataState = {
  dailyWeather: WeatherForecastDailyTimeline | null; // Daily weather forecast data
  hourlyWeather: WeatherForecastHourlyTimeline | null; // Hourly weather forecast data
  timezoneOffset: number; // Timezone offset for the location
  setDailyWeather: (
    data: WeatherForecastDailyTimeline,
    timezoneOffset: number
  ) => void; // Set daily weather data
  setHourlyWeather: (data: WeatherForecastHourlyTimeline) => void; // Set hourly weather data
};

export const useWeatherDataStore = create<WeatherDataState>(set => ({
  dailyWeather: null, // Initial state for daily weather data
  hourlyWeather: null, // Initial state for hourly weather data
  timezoneOffset: 0, // Default timezone offset
  setDailyWeather: (data, timezoneOffset) =>
    set({ dailyWeather: data, timezoneOffset }), // Update daily weather data and timezone offset
  setHourlyWeather: data => set({ hourlyWeather: data }), // Update hourly weather data
}));
