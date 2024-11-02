import React from 'react'; // Import React library
import Link from 'next/link'; // Import Link component for navigation
import { Cloud, CloudRain, Sun, Wind, Compass } from 'lucide-react'; // Import weather icons from lucide-react

// NotFoundPage component for displaying 404 error
export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center 
      bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 
      text-foreground overflow-hidden relative" // Background and layout styles
    >
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {' '}
        {/* Background elements */}
        {[
          {
            icon: Cloud,
            size: 64,
            pos: 'top-10 left-10',
            delay: 'delay-200',
            opacity: 'opacity-20',
          },
          {
            icon: Cloud,
            size: 48,
            pos: 'top-20 right-20',
            delay: 'delay-300',
            opacity: 'opacity-10',
          },
          {
            icon: Wind,
            size: 48,
            pos: 'bottom-20 left-1/4',
            delay: 'delay-100',
            opacity: 'opacity-30',
          },
          {
            icon: CloudRain,
            size: 48,
            pos: 'top-1/3 right-1/4',
            delay: 'delay-400',
            opacity: 'opacity-20',
          },
        ].map(
          (
            { icon: Icon, size, pos, delay, opacity },
            index // Map through atmospheric elements
          ) => (
            <div
              key={index}
              className={`absolute ${pos} ${delay} ${opacity} animate-drift`} // Apply styles and animations
            >
              <Icon size={size} className="text-blue-200 dark:text-gray-700" />
            </div>
          )
        )}
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 py-12 bg-white/60 dark:bg-gray-900/60 
        backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/50 dark:border-gray-800/50" // Styling for the content box
      >
        <div className="relative inline-block mb-8">
          <h1
            className="text-8xl font-bold text-blue-600 dark:text-blue-400 
            animate-bounce-slow tracking-wider" // Animated heading for the error code
          >
            404
          </h1>
          <div className="absolute -top-4 -right-4">
            <Sun
              size={48}
              className="text-yellow-500 animate-spin-very-slow 
                drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]" // Spinning sun animation
            />
          </div>
        </div>

        <h2
          className="text-4xl font-semibold mb-4 text-blue-800 dark:text-blue-200 
          animate-fade-in" // Animated subheading for the error message
        >
          Forecast Not Found
        </h2>

        <div className="max-w-md mx-auto mb-8">
          <p
            className="text-lg text-blue-600 dark:text-blue-300 
            animate-slide-in-bottom opacity-80" // Animated description message
          >
            {`The page you're searching for has drifted off course, like a cloud
            carried by an unpredictable wind.`}{' '}
            {/* Description of the 404 error */}
          </p>
        </div>

        <Link
          href="/"
          className="
            inline-flex items-center gap-3 
            px-8 py-4 
            bg-blue-500 text-white 
            rounded-full 
            hover:bg-blue-600 
            transition-all duration-300 
            ease-in-out 
            transform hover:scale-105 
            shadow-lg hover:shadow-xl
            group" // Styles for the return button
        >
          <Compass
            size={24}
            className="group-hover:rotate-45 transition-transform" // Rotate compass icon on hover
          />
          Return to Clear Skies
        </Link>
      </div>
    </div>
  );
}
