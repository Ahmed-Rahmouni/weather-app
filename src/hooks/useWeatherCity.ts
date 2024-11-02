// Import necessary hooks and types
import { useQuery } from '@tanstack/react-query';
import { fetchCityNames } from '@/lib/api';
import type { CityOptions, GeonamesResponse } from '@/types/searchCity';

/**
 * Custom hook for fetching city names based on user input.
 * This hook leverages React Query to handle API calls and state management for city data.
 *
 * @param {CityOptions} options - The options object containing city search parameters.
 * @returns {QueryObserverResult<GeonamesResponse>} - The result of the city search query.
 */
const useWeatherCity = ({ name_startsWith, cities }: CityOptions) => {
  // Query for search-based cities
  const searchQuery = useQuery({
    queryKey: ['weatherCity', name_startsWith, cities], // Unique query key based on search parameters
    queryFn: async () => {
      // Prepare options for the API call
      const options: CityOptions = {
        name_startsWith: name_startsWith || '', // Default to empty string if not provided
        cities,
      };

      // Fetch city names and handle errors
      try {
        const weatherCity: GeonamesResponse = await fetchCityNames(options); // Fetch city names from the API
        return weatherCity; // Return the city names
      } catch (error) {
        throw error; // Rethrow the error for handling upstream
      }
    },
    enabled: !!cities && !!name_startsWith, // Only run the query if cities and name_startsWith are provided
    retry: 2, // Retry twice on failure
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  // Return the search query object
  return searchQuery; // Return the query result for consumption
};

export default useWeatherCity; // Export the custom hook
