// Import necessary modules and types
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { GEONAMES_API_BASE_URL } from '@/lib/constants';
import { CityOptions } from '@/types/searchCity';

/**
 * GET handler for searching cities.
 * This function handles incoming requests to fetch city names based on user input.
 * It validates the presence of a required username for the Geonames API.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response containing city names or error information.
 */
export async function GET(request: NextRequest) {
  const userName = process.env.GEONAMES_USER_NAME; // Fetch Geonames username from environment variables

  // Check if the username is not set
  if (!userName) {
    return NextResponse.json(
      { message: 'Username is not defined' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(request.url); // Create a URL object to parse query parameters
    const params = Object.fromEntries(url.searchParams); // Convert query parameters to an object

    const options: CityOptions = {
      name_startsWith: params.name_startsWith as string, // Get the starting name for city search
      cities: params.cities as string, // Get the cities parameter
    };

    // Make a GET request to the Geonames API to fetch city data
    const response = await axios.get(GEONAMES_API_BASE_URL, {
      params: {
        ...options,
        username: userName, // Include the username in the request
      },
    });

    // Return the city data in the response
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle errors that may occur during the API request
    if (axios.isAxiosError(error)) {
      const apiErrorResponse = error.response?.data;
      return NextResponse.json(
        apiErrorResponse || { message: 'API request failed' },
        { status: error.response?.status || 500 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
