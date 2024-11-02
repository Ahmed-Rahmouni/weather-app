import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { HistoryIcon, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import useWeatherCity from '@/hooks/useWeatherCity';
import { useLocationCityStore, useThemeStore } from '@/store/weatherStore';
import { GeonameCity } from '@/types/searchCity';
import { FaLocationDot } from 'react-icons/fa6';
import debounce from 'lodash/debounce';

// Props interface for the CityAutoComplete component
type WeatherCityProps = {
  onCitySelect?: (city: GeonameCity) => void;
};

/**
 * CityAutoComplete Component
 * Provides a searchable dropdown for city selection with keyboard navigation,
 * recent history, and autocomplete suggestions.
 */
export default function CityAutoComplete({ onCitySelect }: WeatherCityProps) {
  const { isDarkMode } = useThemeStore();
  const [isClient, setIsClient] = useState(false);
  const wrapperRefDiv = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const {
    selectCity,
    setCityInput,
    isCitySearchOpen,
    toggleCitySearch,
    inputValue,
    locationsHistory,
    resetCityInput,
  } = useLocationCityStore();

  // Filter history suggestions based on user input
  const historySuggestions = useMemo(() => {
    if (!inputValue.trim()) return locationsHistory;
    const searchLower = inputValue.toLowerCase();
    return locationsHistory.filter(
      city =>
        city.toponymName.toLowerCase().includes(searchLower) ||
        city.countryName.toLowerCase().includes(searchLower)
    );
  }, [inputValue, locationsHistory]);

  // Use ref to create a debounced function
  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 300)
  ).current;

  // Handle input changes and update search state
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCityInput(value);
      toggleCitySearch(true);
      debouncedSetSearch(value); // Using the debounced function
      setHighlightedIndex(0);
    },
    [setCityInput, toggleCitySearch, debouncedSetSearch] // Include debouncedSetSearch as a dependency
  );

  // Fetch city suggestions from API
  const { data, error, isLoading } = useWeatherCity({
    name_startsWith: debouncedSearchTerm,
    cities: debouncedSearchTerm.trim().length >= 2 ? 'cities15000' : '',
  });

  // Combine API results with history suggestions
  const suggestions = useMemo(() => {
    if (!inputValue.trim() || inputValue.length < 2) {
      return historySuggestions;
    }
    return data?.geonames && data.geonames.length > 0
      ? data.geonames
      : historySuggestions;
  }, [inputValue, historySuggestions, data?.geonames]);

  // Cleanup debounce function on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  // Handle city selection
  const handleSelect = useCallback(
    (city: GeonameCity) => {
      selectCity(city);
      onCitySelect?.(city);
      setHighlightedIndex(0);
      setDebouncedSearchTerm('');
    },
    [selectCity, onCitySelect]
  );

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRefDiv.current &&
        !wrapperRefDiv.current.contains(event.target as Node)
      ) {
        toggleCitySearch(false);
        if (!inputValue.trim()) {
          resetCityInput();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleCitySearch, inputValue, resetCityInput]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    toggleCitySearch(true);
  }, [toggleCitySearch]);

  // Setup client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isCitySearchOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          toggleCitySearch(true);
          return;
        }
      }

      switch (e.key) {
        case 'Escape':
          toggleCitySearch(false);
          resetCityInput();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev =>
            Math.min(prev + 1, suggestions.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            handleSelect(suggestions[highlightedIndex]);
          }
          break;
      }
    },
    [
      highlightedIndex,
      suggestions,
      toggleCitySearch,
      handleSelect,
      isCitySearchOpen,
      resetCityInput,
    ]
  );

  // Don't render anything during SSR
  if (!isClient) return null;

  return (
    <div
      className="relative w-full max-w-md z-50"
      ref={wrapperRefDiv}
      role="combobox"
      aria-expanded={isCitySearchOpen}
      aria-controls="city-suggestions"
      aria-haspopup="listbox"
    >
      {/* Search input with animation */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Search
          className={`absolute z-[99] left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Search for a location..."
          className={`w-full h-14 rounded-2xl border-2 ${
            isDarkMode
              ? 'border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
              : 'border-gray-200 bg-white/50 text-gray-900 placeholder:text-gray-500'
          } backdrop-blur-lg py-4 pl-12 pr-4 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl`}
          aria-controls="city-suggestions"
          aria-autocomplete="list"
        />
      </motion.div>

      {/* Suggestions dropdown with animations */}
      <AnimatePresence>
        {isCitySearchOpen && (suggestions.length > 0 || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              id="city-suggestions"
              className={`absolute mt-2 w-full rounded-xl border ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800/90'
                  : 'border-gray-200 bg-white/90'
              } backdrop-blur-lg shadow-xl`}
            >
              <ul className="max-h-72 overflow-auto pb-2" role="listbox">
                {/* Recent locations header */}
                {inputValue.length < 2 && (
                  <li
                    className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                      isDarkMode
                        ? 'bg-gray-100/50 text-black'
                        : 'bg-gray-700/50 text-white'
                    }`}
                  >
                    <HistoryIcon
                      className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-700'
                      } transition-colors duration-300`}
                    />
                    <span className="font-semibold">Recent Locations</span>
                  </li>
                )}

                {/* Loading state */}
                {isLoading ? (
                  <li className="px-4 py-3 text-center text-gray-500">
                    Loading...
                  </li>
                ) : (
                  // City suggestions list with animations
                  suggestions.map((city: GeonameCity, index: number) => (
                    <motion.li
                      key={`${city.geonameId}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      role="option"
                      aria-selected={highlightedIndex === index}
                      onClick={() => handleSelect(city)}
                      className={`cursor-pointer px-4 py-3 rounded-md ${
                        isDarkMode
                          ? 'hover:bg-gray-700/50'
                          : 'hover:bg-gray-100/50'
                      } transition-all duration-300 ${
                        highlightedIndex === index
                          ? isDarkMode
                            ? 'bg-gray-700/80'
                            : 'bg-gray-100/80'
                          : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {city.toponymName}
                          </span>
                          <span
                            className={`ml-2 text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {city.countryName}
                          </span>
                        </div>
                        <FaLocationDot
                          className={`${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          } transition-colors duration-300`}
                        />
                      </div>
                    </motion.li>
                  ))
                )}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-2 text-sm ${
            isDarkMode
              ? 'text-red-400 bg-red-900/20'
              : 'text-red-500 bg-red-100'
          } p-3 rounded-xl`}
        >
          Failed to fetch cities. Please try again.
        </motion.div>
      )}
    </div>
  );
}
