'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useThemeStore } from '@/store/weatherStore';
import { isNight, parseISOToTimestamp } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
  WeatherForecastDailyTimeline,
  WeatherForecastDailyValues,
} from '@/types/weather';
import {
  calculateDaylightHours,
  calculateCurrentHourProgress,
  calculateDashArray,
  getCurrentPosition,
  getUTCTimeFromMillis,
  SunPosition,
} from '@/utils/sunriseSunset';

// Define props for the SunriseSunset component
type SunriseSunsetWeatherProps = {
  dailyWeather: WeatherForecastDailyTimeline | null; // Daily weather data
  timezoneOffset: number; // Timezone offset in minutes
};

// Main functional component to render sunrise and sunset visuals
const SunriseSunset = ({
  dailyWeather,
  timezoneOffset,
}: SunriseSunsetWeatherProps) => {
  // State to track the position of the sun/moon indicator
  const [position, setPosition] = useState<SunPosition>({ x: 0, y: 0 });
  // Retrieve dark mode state and setter function from the theme store
  const { isDarkMode, setDarkMode } = useThemeStore();

  // Get the daily weather values from the dailyWeather prop
  const dailyValues = dailyWeather?.intervals[0]
    .values as WeatherForecastDailyValues;

  // Refs for SVG path elements for day and night indicators
  const pathRef = useRef<SVGPathElement | null>(null);
  const nightPathRef = useRef<SVGPathElement | null>(null);

  // Extract sunrise and sunset times from the daily values
  const sunrise = dailyValues.sunriseTime;
  const sunset = dailyValues.sunsetTime;

  // Normalize sunrise and sunset times based on timezone offset
  const offset = timezoneOffset * 60 * 1000; // Convert offset to milliseconds
  const normalizedSunrise = parseISOToTimestamp(sunrise) + offset;
  const normalizedSunset = parseISOToTimestamp(sunset) + offset;

  // Check if it is currently nighttime
  const isNightTime = isNight(timezoneOffset, sunrise, sunset);
  // Calculate daylight and night hours
  const { daylightHours, nightHours } = calculateDaylightHours(
    normalizedSunrise,
    normalizedSunset
  );

  // Callback to calculate current hour progress based on sunrise and sunset
  const currentHourProgress = useCallback(() => {
    return calculateCurrentHourProgress(
      normalizedSunrise,
      normalizedSunset,
      isNightTime,
      daylightHours,
      nightHours,
      offset
    );
  }, [
    normalizedSunrise,
    normalizedSunset,
    isNightTime,
    daylightHours,
    nightHours,
    offset,
  ]);

  // Callback to calculate the stroke dash array for the SVG paths
  const getDashArray = useCallback(
    (isDay: boolean): string => {
      return calculateDashArray(
        isDay,
        daylightHours,
        nightHours,
        isDay ? pathRef.current : nightPathRef.current
      );
    },
    [daylightHours, nightHours]
  );

  // Effect to update the sun/moon position and manage dark mode
  useEffect(() => {
    const updatePosition = () => {
      const hourProgress = currentHourProgress();
      const newPosition = getCurrentPosition(
        isNightTime,
        hourProgress,
        pathRef.current
      );
      setPosition(newPosition); // Update position state
    };

    updatePosition(); // Initial position update
    const interval = setInterval(updatePosition, 60000); // Update position every minute

    // Set stroke dash array for day and night paths
    if (pathRef.current) {
      pathRef.current.style.strokeDasharray = getDashArray(true);
    }
    if (nightPathRef.current) {
      nightPathRef.current.style.strokeDasharray = getDashArray(false);
    }

    setDarkMode(isNightTime); // Set dark mode based on time

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [getDashArray, currentHourProgress, isNightTime, setDarkMode]);

  return (
    <Card
      className={`w-full h-64 relative overflow-hidden border-none ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-2xl p-6 shadow-lg`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`w-full h-full ${
            isDarkMode
              ? 'bg-gradient-to-br from-blue-500 to-purple-600'
              : 'bg-gradient-to-br from-blue-200 to-purple-300'
          }`}
        />
      </div>
      <svg viewBox="0 30 240 180" className="w-full h-full">
        {/* Gradient definitions for day and text backgrounds */}
        <defs>
          <linearGradient id="dayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: '#FFDD00', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#FF6F00', stopOpacity: 1 }}
            />
          </linearGradient>
          {/* Text background gradients */}
          <linearGradient
            id="textBgGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: isDarkMode ? '#111827' : '#ffffff' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: isDarkMode ? '#1f2937' : '#f9fafb' }}
            />
          </linearGradient>
          <linearGradient
            id="textStrokeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: isDarkMode ? '#374151' : '#e5e7eb' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: isDarkMode ? '#4b5563' : '#d1d5db' }}
            />
          </linearGradient>
          {/* Inner shadow filter for text background */}
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="0" dy="1" />
            <feComposite
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0"
            />
          </filter>
        </defs>

        {/* Day arc path for the sun's path */}
        <path
          id="dayPath"
          ref={pathRef}
          d="M20 150 A90 90 0 0 1 220 150"
          fill="none"
          stroke="url(#dayGradient)"
          strokeWidth="2"
          style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
        />

        {/* Night straight path for the moon's path */}
        <path
          ref={nightPathRef}
          d="M 220 150 L 20 150"
          fill="none"
          stroke={isDarkMode ? '#A1A1AA' : '#94A3B8'}
          strokeWidth="2"
          style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
        />

        {/* Normalized sunrise indicator */}
        <g transform="translate(0, 151)">
          <image
            href={`/weather-conditions-icons/sunset-sunrise/png/${
              isDarkMode ? 'sunrise-dark@2x.png' : 'sunrise-light@2x.png'
            }`}
            width="40"
            height="40"
          />
          <text
            x="4"
            y="52"
            style={{
              fontSize: '0.8rem',
              fill: isDarkMode ? '#ffffff' : '#1f2937',
            }}
          >
            {getUTCTimeFromMillis(normalizedSunrise)}{' '}
            {/* Display sunrise time */}
          </text>
        </g>

        {/* Normalized sunset indicator */}
        <g transform="translate(200, 151)">
          <image
            href={`/weather-conditions-icons/sunset-sunrise/png/${
              isDarkMode ? 'sunset-dark@2x.png' : 'sunset-light@2x.png'
            }`}
            width="40"
            height="40"
          />
          <text
            x="4"
            y="52"
            style={{
              fontSize: '0.8rem',
              fill: isDarkMode ? '#ffffff' : '#1f2937',
            }}
          >
            {getUTCTimeFromMillis(normalizedSunset)} {/* Display sunset time */}
          </text>
        </g>

        {/* Display daylight and night hours */}
        <g transform="translate(120, 205)" textAnchor="middle">
          <rect
            x="-69"
            y="-30"
            width="140"
            height="30"
            fill="url(#textBgGradient)"
            rx="15"
            ry="15"
            stroke="url(#textStrokeGradient)"
            strokeWidth="1"
            filter="url(#innerShadow)"
            style={{
              filter: isDarkMode
                ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          />
          <text
            style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              fill: isDarkMode ? '#F3F4F6' : '#374151',
              letterSpacing: '0.01em',
              filter: isDarkMode
                ? 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))'
                : 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))',
            }}
            dy="-0.72rem"
          >
            {`${daylightHours}h daylight / ${nightHours}h night`}{' '}
            {/* Display hours of daylight and night */}
          </text>
        </g>

        {/* Sun/moon indicator position based on current time */}
        <g transform={`translate(${position.x}, ${position.y})`}>
          <image
            href={`/weather-conditions-icons/png/${
              isNightTime ? '10001_clear_small.png' : '10000_clear_small.png'
            }`}
            width="20"
            height="20"
          />
        </g>
      </svg>
    </Card>
  );
};

export default SunriseSunset; // Export the component for use in other parts of the application
