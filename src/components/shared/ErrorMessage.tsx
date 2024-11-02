import React from 'react'; // Import React library
import { AlertTriangle } from 'lucide-react'; // Import an alert icon from lucide-react
import { useThemeStore } from '@/store/weatherStore'; // Import custom theme store for theme management
import { HardErrorResponse, WeatherResponse } from '@/types/weather'; // Import types for error handling and weather response
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'; // Import types for query observer result
import LoadingSpinner from '@/app/loading'; // Import loading spinner component

// Function to generate messages based on error codes
const getErrorMessage = (error: HardErrorResponse): string => {
  // Match error codes to user-friendly messages
  switch (error.code) {
    case 400001:
      return 'Oops! It seems some information was incorrect. Please check your input.';
    case 400002:
      return "It looks like there's an issue with the query parameters. Please try again.";
    case 400003:
      return "We're missing some required information. Can you fill in all the fields?";
    case 401001:
      return 'Access denied! Please check your API key and try again.';
    case 403001:
      return "Access Denied! Your authentication token doesn't have the necessary permissions.";
    case 404001:
      return "Hmm... we couldn't find what you're looking for. Please check the resource ID.";
    case 500001:
    case 503001:
      return 'Oops! Our servers are having a moment. Please try again later.';
    case 429001:
      return 'It looks like we’ve reached our request limit. Please hold on and try again shortly. ⏳';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Function to get styles based on error code
const getErrorStyles = (error: HardErrorResponse, isDarkMode: boolean) => {
  // Match error codes to CSS styles for displaying errors
  switch (error.code) {
    case 400001:
    case 400002:
    case 400003:
      return isDarkMode
        ? 'bg-gradient-to-br from-yellow-900 to-yellow-800 text-yellow-300 border-yellow-500'
        : 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-900 border-yellow-300';
    case 401001:
    case 403001:
      return isDarkMode
        ? 'bg-gradient-to-br from-red-900 to-red-800 text-red-300 border-red-500'
        : 'bg-gradient-to-br from-red-50 to-red-100 text-red-900 border-red-300';
    case 404001:
      return isDarkMode
        ? 'bg-gradient-to-br from-blue-900 to-blue-800 text-blue-300 border-blue-500'
        : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 border-blue-300';
    case 500001:
    case 503001:
    case 429001:
      return isDarkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-500'
        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-gray-300';
    default:
      return isDarkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-500'
        : 'bg-gradient-to-br from-red-50 to-red-100 text-red-900 border-red-300';
  }
};

type ErrorMessageProps = {
  error: HardErrorResponse; // Expected error prop
  refresh: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<WeatherResponse, HardErrorResponse>>; // Function to refresh data
  loading: boolean; // Loading state indicator
};

// ErrorMessage component that displays error messages based on the error prop
const ErrorMessage = ({ error, refresh, loading }: ErrorMessageProps) => {
  const { isDarkMode } = useThemeStore(); // Access dark mode state from theme store

  // Get the message and styles based on error code
  const message = getErrorMessage(error); // Get error message
  const errorStyles = getErrorStyles(error, isDarkMode); // Get styles based on error and theme

  if (loading) {
    return <LoadingSpinner />; // Return loading spinner if loading
  }

  // AlerTriangle styles
  const getIconStyle = (code: number) => {
    if (code === 401001 || code === 403001)
      return 'text-red-400 animate-bounce';
    if (code === 404001) return 'text-blue-400 animate-pulse';
    return 'text-yellow-400 animate-pulse';
  };

  return (
    <div
      className={`
        flex flex-col sm:flex-row p-12 justify-center items-center
        min-h-screen min-w-[320px] w-full
        transition-all duration-500 ease-in-out shadow-2xl
        ${errorStyles} // Apply error styles
      `}
    >
      <div className="relative z-10 flex flex-col sm:flex-row gap-2 items-center">
        <AlertTriangle size={48} className={getIconStyle(error.code)} />
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-wide">
            Oops! Something Went Wrong
          </h3>
          <p className="text-md opacity-80">{message}</p>
          {/* Display error message */}
          <button
            onClick={() => refresh()} // Call refresh function on button click
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; // Export the ErrorMessage component
