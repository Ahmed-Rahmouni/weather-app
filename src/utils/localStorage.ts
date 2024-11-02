// Utility functions for interacting with local storage
export const getFromStorage = <T>(key: string, fallback: T): T => {
  // Check if the code is running in a browser environment
  if (typeof window === 'undefined') {
    return fallback; // Return fallback value if not in a browser
  }

  try {
    const item = window.localStorage.getItem(key); // Get item from local storage
    return item ? JSON.parse(item) : fallback; // Parse item or return fallback if not found
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage:`, error); // Log error
    return fallback; // Return fallback value on error
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  // Check if the code is running in a browser environment
  if (typeof window === 'undefined') {
    return; // Exit if not in a browser
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value)); // Store item in local storage
  } catch (error) {
    console.warn(`Error writing ${key} to localStorage:`, error); // Log error
  }
};

export const removeFromStorage = (key: string): void => {
  // Check if the code is running in a browser environment
  if (typeof window === 'undefined') {
    return; // Exit if not in a browser
  }

  try {
    window.localStorage.removeItem(key); // Remove item from local storage
  } catch (error) {
    console.warn(`Error removing ${key} from localStorage:`, error); // Log error
  }
};
