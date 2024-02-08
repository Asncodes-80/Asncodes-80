/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

import { resources } from "./src/config/resources";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      /** Prefix to access this theme to every where link css */
      prefix: "profile",
      addCommonColors: false,
      defaultTheme: resources.style.defaultTheme,
      defaultExtendTheme: resources.style.defaultTheme,
      // Common layout
      layout: {
        fontSize: {
          tiny: "12px",
          small: "14px",
          medium: "16px",
          large: "20px",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        // rounded-variation
        radius: {
          small: "8px",
          medium: "12px", // Default
          large: "14px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      themes: {
        dark: {
          colors: resources.style.colorsScheme.darkScheme,
        },
      },
    }),
  ],
};
