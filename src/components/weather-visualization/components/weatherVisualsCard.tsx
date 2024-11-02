// Import necessary components and icons
import { Droplets, Gauge, LucideIcon, Thermometer, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore, useUnitsStore } from '@/store/weatherStore';

// Define props for WeatherCard component
type WeatherCardProps = {
  icon: LucideIcon;
  value: number | string;
  label: string;
  unit?: string;
  windDirection?: number | null;
  complementaryInfo?: string;
  normalizedValue?: string | number;
};

// Main component to display weather metric card with a rotating wind direction icon
export default function WeatherCard({
  icon: Icon,
  value,
  normalizedValue,
  label,
  unit,
  windDirection,
  complementaryInfo,
}: WeatherCardProps) {
  // Retrieve dark mode state and units from store
  const { isDarkMode } = useThemeStore();
  const { units } = useUnitsStore();

  // Function to calculate the icon's rotation angle based on wind direction
  const getVisualWindDirection = (direction: number | null): number => {
    return (direction ?? 0) + 90; // Default to east (90°), adjust by wind direction
  };

  // Function to normalize metric value for rendering a progress bar
  const getNormalizedPercentage = () => {
    if (!normalizedValue) return 0;

    switch (Icon) {
      case Droplets:
        return Math.min(Math.max(Number(normalizedValue), 0), 100); // Cap at 100% for humidity
      case Thermometer:
        // Normalize temperature based on units
        return units === 'metric'
          ? Math.min(
              Math.max(((Number(normalizedValue) + 20) / 60) * 100, 0),
              100
            )
          : Math.min(
              Math.max(((Number(normalizedValue) + 4) / 108) * 100, 0),
              100
            );
      case Gauge:
        // Normalize pressure based on units
        return units === 'metric'
          ? Math.min(
              Math.max(((Number(normalizedValue) - 950) / 100) * 100, 0),
              100
            )
          : Math.min(
              Math.max(((Number(normalizedValue) - 28) / 3) * 100, 0),
              100
            );
      default:
        return 0;
    }
  };

  return (
    <div
      className={`relative overflow-hidden min-w-[130px] ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-2xl p-6 shadow-lg`}
    >
      {/* Background gradient based on theme */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`w-full h-full ${
            isDarkMode
              ? 'bg-gradient-to-br from-blue-500 to-purple-600'
              : 'bg-gradient-to-br from-blue-200 to-purple-300'
          }`}
        />
      </div>

      <div className="relative">
        {/* Header containing icon, label, and main value */}
        <div className="flex lg:flex-col items-start justify-between gap-2 mb-4 px4">
          <div>
            <h3
              className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {label}
            </h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span
                className={`text-3xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {value}
              </span>
              {unit && (
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {unit}
                </span>
              )}
            </div>
          </div>
          {/* Icon with rotation animation for wind direction */}
          <div
            className={`p-2 rounded-xl ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}
          >
            {Icon === Wind ? (
              <motion.div
                animate={{ rotate: getVisualWindDirection(windDirection || 0) }}
                transition={{ type: 'spring', stiffness: 60 }}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-500'
                  }`}
                />
              </motion.div>
            ) : (
              <Icon
                className={`w-6 h-6 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-500'
                }`}
              />
            )}
          </div>
        </div>

        {/* Additional information text */}
        {complementaryInfo && (
          <div
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {complementaryInfo}
          </div>
        )}

        {/* Progress bar for applicable metrics like humidity, temperature, and pressure */}
        {(Icon === Droplets || Icon === Thermometer || Icon === Gauge) && (
          <div className="mt-4">
            <div
              className={`h-1.5 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getNormalizedPercentage()}%` }}
                transition={{ duration: 1 }}
                className={`h-full rounded-full ${
                  Icon === Droplets
                    ? 'bg-blue-500'
                    : Icon === Thermometer
                    ? Number(normalizedValue) < (units === 'metric' ? 0 : 32)
                      ? 'bg-blue-500'
                      : 'bg-red-500'
                    : 'bg-purple-500'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
