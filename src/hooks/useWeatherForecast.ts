// Import necessary hooks and types
import { useQuery } from '@tanstack/react-query';
import {
  WeatherOptions,
  WeatherResponse,
  HardErrorResponse,
  WeatherForecastDailyTimeline,
  WeatherForecastHourlyTimeline,
} from '@/types/weather';
import { fetchWeatherData } from '@/lib/api';
import { useWeatherDataStore } from '@/store/weatherStore';
import { extractTimezoneOffset } from '@/lib/utils';

/**
 * Custom hook for fetching weather forecasts based on location.
 * This hook utilizes React Query to manage API calls and state for weather data.
 *
 * @param {WeatherHookOptions} options - The options object containing location information.
 * @returns {QueryObserverResult<WeatherResponse, HardErrorResponse>} - The result of the weather query.
 */
type WeatherHookOptions = Omit<
  WeatherOptions,
  'units' | 'fields' | 'timesteps' | 'startTime' | 'endTime' | 'timezone'
>;

const useWeatherForecast = ({ location }: WeatherHookOptions) => {
  const setDailyWeather = useWeatherDataStore(state => state.setDailyWeather); // Hook into the store to set daily weather
  const setHourlyWeather = useWeatherDataStore(state => state.setHourlyWeather); // Hook into the store to set hourly weather

  // Use React Query to fetch weather data
  return useQuery<WeatherResponse, HardErrorResponse>({
    queryKey: ['weatherForecast', location], // Unique query key based on location
    queryFn: async () => {
      const options: WeatherHookOptions = {
        location,
      };

      const response = await fetchWeatherData(options); // Fetch weather data using the API

      // Set the weather data into Zustand store if the response is valid
      if (response) {
        const timezoneOffset = extractTimezoneOffset(
          response.data?.timelines[0].startTime ?? '' // Extract timezone offset from the response
        );
        setDailyWeather(
          response.data?.timelines[0] as WeatherForecastDailyTimeline,
          timezoneOffset // Set daily weather data along with timezone offset
        );
        setHourlyWeather(
          response.data?.timelines[1] as WeatherForecastHourlyTimeline // Set hourly weather data
        );
      }

      return response; // Return the API response
    },
    enabled: Boolean(location), // Enable the query only if a location is provided
    retry: false, // Disable automatic retries on failure
    refetchOnWindowFocus: false, // Disable refetching on window focus
    refetchInterval: 1000 * 60 * 60 * 60, // Refetch after every hour
  });
};

export default useWeatherForecast; // Export the custom hook
