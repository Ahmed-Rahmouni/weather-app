import React from 'react'; // Import React library
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react'; // Import weather-related icons from lucide-react

// LoadingSpinner component displaying a loading animation with weather elements
export default function LoadingSpinner() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center 
      bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 
      transition-all duration-500 ease-in-out" // Background styles with gradient
    >
      <div className="relative">
        {/* Ambient weather elements */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-30">
          <div className="flex space-x-4 animate-drift">
            {' '}
            {/* Drifting animation for clouds */}
            <Cloud size={72} className="text-blue-300 dark:text-gray-700" />
            <CloudRain size={64} className="text-blue-200 dark:text-gray-600" />
            <Wind size={56} className="text-blue-200 dark:text-gray-600" />
          </div>
        </div>

        {/* Main loading animation */}
        <div className="relative z-10">
          {/* Animated sun */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-solar-pulse">
            {' '}
            {/* Pulse animation for sun */}
            <Sun
              size={64}
              className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" // Shadow effect for sun
            />
          </div>

          {/* Clouds */}
          <div className="flex gap-6 mt-16 animate-cloud-drift">
            {' '}
            {/* Drifting animation for clouds */}
            <Cloud
              size={48}
              className="text-blue-300 dark:text-gray-700 opacity-80"
            />
            <Cloud size={64} className="text-blue-400 dark:text-gray-600" />
            <Cloud
              size={48}
              className="text-blue-300 dark:text-gray-700 opacity-80"
            />
          </div>

          {/* Rain drops */}
          <div className="flex justify-center gap-3 mt-8">
            {' '}
            {/* Container for raindrops */}
            {[1, 2, 3].map(
              (
                drop // Map through drops to create animated raindrops
              ) => (
                <div
                  key={drop}
                  className="w-1.5 h-10 bg-blue-400/40 dark:bg-gray-600/40 
                  rounded-full animate-rain-drop" // Raindrop styles
                  style={{ animationDelay: `${drop * 100}ms` }} // Staggered animation
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        {' '}
        {/* Centered text container */}
        <h2
          className="text-3xl font-bold text-blue-800 dark:text-blue-200 
          animate-fade-in mb-4 tracking-wide" // Animated title
        >
          Brewing Your Forecast
        </h2>
        <p
          className="text-md text-blue-600 dark:text-blue-300 
          animate-pulse-slow opacity-80" // Animated loading message
        >
          Collecting atmospheric insights...
        </p>
      </div>
    </div>
  );
}
