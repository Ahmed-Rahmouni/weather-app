import { getUTCDate } from '@/lib/utils';

// Type definitions for sun position and hour progress
export type SunPosition = {
  x: number; // X coordinate of the sun's position
  y: number; // Y coordinate of the sun's position
};

export type HourProgress = {
  hour: number; // Current hour
  progress: number; // Progress through the current hour (0 to 1)
  totalHours: number; // Total hours in the current period (day or night)
};

/**
 * Converts a timestamp in milliseconds to a formatted UTC time string (HH:MM)
 */
export function getUTCTimeFromMillis(timestampMs: number): string {
  const date = new Date(timestampMs); // Create date object from timestamp
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(
    date.getUTCMinutes()
  ).padStart(2, '0')}`; // Format hours and minutes
}

/**
 * Calculates daylight and night hours based on sunrise and sunset timestamps
 */
export const calculateDaylightHours = (
  normalizedSunrise: number,
  normalizedSunset: number
): { daylightHours: number; nightHours: number } => {
  const daylightHours = Math.round(
    (normalizedSunset - normalizedSunrise) / (1000 * 60 * 60) // Calculate daylight hours
  );
  const nightHours = Math.round(24 - daylightHours); // Calculate night hours

  return { daylightHours, nightHours }; // Return results
};

/**
 * Calculates the progress of the current hour based on sunrise and sunset times
 */
export const calculateCurrentHourProgress = (
  normalizedSunrise: number,
  normalizedSunset: number,
  isNightTime: boolean,
  daylightHours: number,
  nightHours: number,
  offset: number
): HourProgress => {
  const now = getUTCDate(Date.now() + offset); // Get the current UTC date with offset
  const sunriseHour = normalizedSunrise
    ? getUTCDate(normalizedSunrise).getUTCHours() // Get sunrise hour
    : 0;
  const sunsetHour = normalizedSunset
    ? getUTCDate(normalizedSunset).getUTCHours() // Get sunset hour
    : 0;
  const currentHour = now.getUTCHours(); // Get current hour
  const currentMinute = now.getUTCMinutes(); // Get current minute

  // If it's nighttime, calculate the hours since sunset
  if (isNightTime) {
    const hoursAfterSunset =
      currentHour >= sunsetHour
        ? currentHour - sunsetHour // Calculate hours after sunset
        : 24 - sunsetHour + currentHour; // Wrap around midnight

    return {
      hour: hoursAfterSunset, // Return hours after sunset
      progress: currentMinute / 60, // Progress through the night
      totalHours: nightHours, // Total night hours
    };
  }

  // If it's daytime, calculate hours since sunrise
  return {
    hour: currentHour - sunriseHour, // Return hours since sunrise
    progress: currentMinute / 60, // Progress through the day
    totalHours: daylightHours, // Total daylight hours
  };
};

/**
 * Calculates the dash array for an SVG path based on day/night status and hours
 */
export const calculateDashArray = (
  isDay: boolean,
  daylightHours: number,
  nightHours: number,
  pathRef: SVGPathElement | null
): string => {
  const hours = isDay ? daylightHours : nightHours; // Determine total hours based on day/night
  const pathLength = isDay ? pathRef?.getTotalLength() : 200; // Get the length of the path
  const dashLength = pathLength ? pathLength / hours : 0; // Calculate dash length per hour
  const gapLength = 4; // Gap between dashes
  return `${dashLength - gapLength} ${gapLength}`; // Return the dash array string
};

/**
 * Gets the current position of the sun based on hour progress and path reference
 */
export const getCurrentPosition = (
  isNightTime: boolean,
  hourProgress: HourProgress,
  pathRef: SVGPathElement | null
): SunPosition => {
  const { hour, progress, totalHours } = hourProgress; // Destructure hour progress

  if (isNightTime) {
    const totalWidth = 200; // Total width of the night area
    const currentProgress = totalHours > 0 ? (hour + progress) / totalHours : 0; // Calculate current progress
    const x = 220 - currentProgress * totalWidth; // Calculate X position
    return { x: Math.max(20, Math.min(220, x)) - 10, y: 140 }; // Return sun position, constrained within bounds
  } else if (pathRef) {
    const pathLength = pathRef.getTotalLength(); // Get length of the path
    const segmentLength = totalHours > 0 ? pathLength / totalHours : 0; // Calculate segment length per hour
    const point = pathRef.getPointAtLength(
      hour * segmentLength + progress * segmentLength // Get the point on the path at the calculated length
    );
    return { x: point.x - 10, y: point.y - 10 }; // Return sun position adjusted for styling
  }

  return { x: 0, y: 0 }; // Default position if no conditions are met
};
