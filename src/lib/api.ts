// Import necessary modules and types
import axios from 'axios';
import {
  WeatherOptions,
  WeatherResponse,
  HardErrorResponse,
} from '@/types/weather';
import { CityOptions, GeonamesResponse } from '@/types/searchCity';

// Create an Axios instance for making API calls
const apiClient = axios.create({
  baseURL: '/api', // Set the base URL for the API
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch weather data from the API.
 * This function makes a POST request to retrieve weather information based on the provided options.
 *
 * @param {WeatherAPIOptions} options - The options object containing weather request parameters.
 * @returns {Promise<WeatherResponse>} - The weather data retrieved from the API.
 */
type WeatherAPIOptions = Omit<
  WeatherOptions,
  'units' | 'fields' | 'timesteps' | 'startTime' | 'endTime' | 'timezone'
>;

export const fetchWeatherData = async (
  options: WeatherAPIOptions
): Promise<WeatherResponse> => {
  try {
    const { data } = await apiClient.post<WeatherResponse>('/weather', options); // Send POST request to the weather endpoint
    return data; // Return the retrieved weather data
  } catch (error) {
    // Handle errors that may occur during the API request
    if (axios.isAxiosError(error)) {
      throw error.response?.data as HardErrorResponse; // Throw specific error response
    }
    // Throw unexpected error
    throw {
      code: 500000,
      type: 'Unexpected Error',
      message: 'An unexpected error occurred',
    } as HardErrorResponse;
  }
};

/**
 * Fetch city names from the API.
 * This function makes a GET request to retrieve city information based on the provided options.
 *
 * @param {CityOptions} options - The options object containing city search parameters.
 * @returns {Promise<GeonamesResponse>} - The city names retrieved from the API.
 */
export const fetchCityNames = async (
  options: CityOptions
): Promise<GeonamesResponse> => {
  try {
    const { data } = await apiClient.get<GeonamesResponse>('/weather-city', {
      params: options, // Pass city search parameters as query params
    });
    return data; // Return the retrieved city data
  } catch (error) {
    // Handle errors that may occur during the API request
    if (axios.isAxiosError(error)) {
      throw error.response?.data; // Throw specific error response
    }
    // Throw unexpected error
    throw new Error('Unexpected error occurred');
  }
};
