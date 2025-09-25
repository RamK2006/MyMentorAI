/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This enables the dark theme
  theme: {
    extend: {
      colors: {
        'electric-blue': {
          '50': '#f0f7ff', '100': '#e0effe', '200': '#c7e4fe',
          '300': '#a4d6fd', '400': '#7ac5fc', '500': '#57b0fa',
          '600': '#3b94f5', '700': '#2d79e5', '800': '#2b62ba',
          '900': '#285196', '950': '#1b3464',
        },
        'warning-orange': '#f59e0b',
        'danger-red': '#ef4444',
        'success-green': '#10b981',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}