'use client'; // Indicates this component is a client-side component in a Next.js application

import { useThemeStore } from '@/store/weatherStore'; // Import custom theme store for theme management
import Image from 'next/image'; // Import Image component from Next.js
import React from 'react'; // Import React library

// Footer component displaying a logo based on the current theme
export default function Footer() {
  const { isDarkMode } = useThemeStore(); // Access dark mode state from theme store

  // Select logo source based on dark mode state
  const logoSrc = `/weather-conditions-icons/powered-by-tomorrow/${
    isDarkMode
      ? 'Powered_by_Tomorrow-White.svg' // White logo for dark mode
      : 'Powered_by_Tomorrow-Black.svg' // Black logo for light mode
  }`;

  return (
    <footer className="flex justify-center items-center px-7 min-w-[320px]">
      {' '}
      {/* Flex container for footer */}
      <Image
        src={logoSrc}
        alt="Powered by Tomorrow"
        width={300}
        height={30}
        style={{ width: 'auto', height: 'auto' }}
      />
    </footer>
  );
}
