// Import necessary modules and types
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { TOMORROW_API_BASE_URL } from '@/lib/constants';
import {
  WeatherOptions,
  WeatherResponse,
  HardErrorResponse,
} from '@/types/weather';
import { weatherFields } from '@/data/weatherFields';

/**
 * POST handler for fetching weather data.
 * This function handles incoming requests to fetch weather information based on a provided location.
 * It checks for the presence of an API key and validates the incoming request body.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A JSON response containing the weather data or error information.
 */
export async function POST(request: NextRequest) {
  const apiKey = process.env.TOMORROW_API_KEY; // Fetch API key from environment variables

  // Check if the API key is not set
  if (!apiKey) {
    const error: HardErrorResponse = {
      code: 500001,
      type: 'Configuration Error',
      message: 'API key is not configured',
    };
    return NextResponse.json(error, { status: 500 });
  }

  try {
    const body = await request.json(); // Parse the incoming JSON request body
    const { location } = body as WeatherOptions; // Extract location from the request body

    // Validate that a location was provided
    if (!location) {
      const error: HardErrorResponse = {
        code: 400001,
        type: 'Validation Error',
        message: 'Missing required fields: location',
      };
      return NextResponse.json(error, { status: 400 });
    }

    // Make a POST request to the weather API to fetch weather data
    const response = await axios({
      method: 'POST',
      url: `${TOMORROW_API_BASE_URL}/timelines`,
      params: {
        apikey: apiKey, // Include the API key in the request
      },
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
      data: {
        location,
        units: 'metric', // Specify the units for the weather data
        fields: weatherFields, // Specify the fields to retrieve
        timesteps: ['1d', '1h'], // Specify the time intervals for the forecast
        startTime: 'now', // Set the start time to now
        endTime: 'nowPlus5d', // Set the end time to 5 days from now
        timezone: 'auto', // Automatically detect the timezone
      },
    });

    // Return the weather data in the response
    return NextResponse.json(response.data as WeatherResponse, {
      status: response.status,
    });
  } catch (error) {
    // Handle errors that may occur during the API request
    if (axios.isAxiosError(error)) {
      const apiErrorResponse: HardErrorResponse = error.response?.data ?? {
        code: error.response?.status ?? 500,
        type: 'API Error',
        message: error.message,
      };
      const apiStatus = error.response?.status ?? 500;
      return NextResponse.json(apiErrorResponse, { status: apiStatus });
    }

    // Handle unexpected errors
    const unexpectedError: HardErrorResponse = {
      code: 500000,
      type: 'Unexpected Error',
      message: 'An unexpected error occurred',
    };
    return NextResponse.json(unexpectedError, { status: 500 });
  }
}
