import { weatherCodeMapDaily } from '@/data/weatherConditions';
import { extractTimezoneOffset } from '@/lib/utils';

/**
 * Gets the weather icon path for the daily forecast based on weather code
 */
export function getWeatherIconDaily(code: number): string {
  const weatherCode = code.toString(); // Convert code to string
  const condition = weatherCodeMapDaily.find(cond => cond[weatherCode]); // Find condition in the map
  return `/weather-conditions-icons/png/${
    condition ? condition[weatherCode].img : '10000_clear_small.png' // Return icon path or default icon
  }`;
}

/**
 * Gets the weather description for the daily forecast based on weather code
 */
export function getWeatherDescriptionDaily(code: number): string {
  const weatherCode = code.toString(); // Convert code to string
  const condition = weatherCodeMapDaily.find(cond => cond[weatherCode]); // Find condition in the map
  return condition ? condition[weatherCode].description : 'Unknown'; // Return description or default value
}

/**
 * Formats a date string based on its index (0 = Today, otherwise full date)
 */
export function formatDate(dateString: string, index: number): string {
  const timezoneOffset = extractTimezoneOffset(dateString); // Get timezone offset
  const adjustedCurrentTime = Date.now() + timezoneOffset * 60 * 1000; // Adjust current time
  const targetDate = new Date(adjustedCurrentTime); // Create a new date object

  targetDate.setUTCDate(targetDate.getUTCDate() + index); // Set target date based on index

  // Return formatted date string based on index
  return index === 0
    ? 'Today' // If today, return 'Today'
    : targetDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      }); // Format and return full date
}
