import { weatherCodeMapHourly } from '@/data/weatherConditions';
import { extractTimezoneOffset, parseISOToTimestamp } from '@/lib/utils';

/**
 * Determines if it is currently night based on sunrise and sunset times
 */
export const isNight = (
  dateString: string,
  sunrise: string,
  sunset: string
): boolean => {
  // Return false if any required parameter is missing
  if (!dateString || !sunrise || !sunset) return false;

  const offset = extractTimezoneOffset(dateString) * 60 * 1000; // Get timezone offset
  const currentTime = parseISOToTimestamp(dateString) + offset; // Get current time adjusted for offset
  const sunriseTime = parseISOToTimestamp(sunrise) + offset; // Adjust sunrise time for offset
  const sunsetTime = parseISOToTimestamp(sunset) + offset; // Adjust sunset time for offset

  const currentHour = new Date(currentTime).getUTCHours(); // Get current hour
  const sunriseHour = new Date(sunriseTime).getUTCHours(); // Get sunrise hour
  const sunsetHour = new Date(sunsetTime).getUTCHours(); // Get sunset hour

  // Determine if it is night based on sunrise and sunset hours
  return sunsetHour > sunriseHour
    ? currentHour < sunriseHour || currentHour >= sunsetHour // Normal case (sunrise before sunset)
    : currentHour >= sunsetHour || currentHour < sunriseHour; // Wrap around midnight case
};

/**
 * Formats a time string to a 12-hour format with AM/PM
 */
export function formatTo12HourTime(dateString: string): string {
  const timezoneOffset = extractTimezoneOffset(dateString); // Get timezone offset
  const utcDate = new Date(dateString).getTime(); // Convert date string to UTC
  let hours = new Date(utcDate + timezoneOffset * 60 * 1000).getUTCHours(); // Adjust for timezone offset

  // Normalize hours to 0-23 range
  hours = ((hours % 24) + 24) % 24;

  const suffix = hours >= 12 ? 'pm' : 'am'; // Determine AM/PM suffix
  hours = hours % 12 || 12; // Convert hours to 12-hour format

  return `${hours}${suffix}`; // Return formatted time string
}

/**
 * Gets the weather icon path for the hourly forecast based on weather code
 */
export function getWeatherIconHourly(
  code: number,
  isNightTime: boolean,
  size: 'big' | 'small'
): string {
  const weatherCode = code.toString(); // Convert code to string
  const condition = weatherCodeMapHourly.find(cond => cond[weatherCode]); // Find condition in the map

  // If it's nighttime, return the night icon; otherwise, return the day icon
  if (isNightTime && condition?.[weatherCode].nightImg) {
    return `/weather-conditions-icons/png/${
      condition[weatherCode].nightImg[size] || '10001_clear_small.png' // Return night icon or default
    }`;
  }

  return `/weather-conditions-icons/png/${
    condition ? condition[weatherCode].img[size] : '10000_clear_small.png' // Return day icon or default
  }`;
}

/**
 * Gets the weather description for the hourly forecast based on weather code
 */
export function getWeatherDescriptionHourly(code: number): string {
  const weatherCode = code.toString(); // Convert code to string
  const condition = weatherCodeMapHourly.find(cond => cond[weatherCode]); // Find condition in the map
  return condition ? condition[weatherCode].description : 'Unknown'; // Return description or default value
}
