// ================ Client-side utility for handling class names ================
'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs)); // Return merged class names
}

// ================ Date & Time Utilities ================
/**
 * Extracts timezone offset in minutes from a date string
 */
export function extractTimezoneOffset(dateString: string): number {
  const timezoneOffsetSign = dateString.slice(-6, -5); // Get sign of the timezone offset
  const timezoneOffsetHours = parseInt(dateString.slice(-5, -3), 10); // Get hours from the offset
  const timezoneOffsetMinutes = parseInt(dateString.slice(-2), 10); // Get minutes from the offset

  return (
    (timezoneOffsetHours * 60 + timezoneOffsetMinutes) *
    (timezoneOffsetSign === '+' ? 1 : -1) // Calculate total offset in minutes
  );
}

/**
 * Converts ISO date string to timestamp in milliseconds
 */
export function parseISOToTimestamp(isoString: string): number {
  return new Date(isoString).getTime(); // Convert ISO string to timestamp
}

/**
 * Creates a UTC Date object from any date input
 */
export function getUTCDate(date: number | string | Date): Date {
  const inputDate = new Date(date); // Create date object from input
  return new Date(
    Date.UTC(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate(),
      inputDate.getUTCHours(),
      inputDate.getUTCMinutes(),
      inputDate.getUTCSeconds()
    ) // Create UTC date object
  );
}

// ================ Weather Utilities ================
/**
 * Determines if it's currently night time based on sunrise/sunset times
 */
export function isNight(
  timezoneOffset: number,
  sunrise: string,
  sunset: string
): boolean {
  // Return false if any required parameter is missing
  if (!timezoneOffset || !sunrise || !sunset) return false;

  const currentTime = Date.now(); // Get current time
  const offsetDiff = timezoneOffset * 60 * 1000; // Calculate offset in milliseconds

  // Convert all times to local timezone
  const localCurrentTime = getUTCDate(currentTime + offsetDiff);
  const localSunrise = getUTCDate(parseISOToTimestamp(sunrise) + offsetDiff);
  const localSunset = getUTCDate(parseISOToTimestamp(sunset) + offsetDiff);

  // Convert to minutes since midnight
  const getCurrentMinutes = (date: Date) =>
    date.getUTCHours() * 60 + date.getUTCMinutes();

  const currentMinutes = getCurrentMinutes(localCurrentTime); // Get current minutes
  const sunriseMinutes = getCurrentMinutes(localSunrise); // Get sunrise minutes
  const sunsetMinutes = getCurrentMinutes(localSunset); // Get sunset minutes

  // Determine if it is night based on sunrise and sunset hours
  return sunsetMinutes > sunriseMinutes
    ? currentMinutes < sunriseMinutes || currentMinutes >= sunsetMinutes // Normal case (sunrise before sunset)
    : currentMinutes >= sunsetMinutes || currentMinutes < sunriseMinutes; // Wrap around midnight case
}
