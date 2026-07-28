/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b0764',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        ink: {
          DEFAULT: '#1f2937',
          muted: '#6b7280',
          light: '#9ca3af',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(124, 58, 237, 0.06)',
        cardHover: '0 8px 32px rgba(124, 58, 237, 0.12)',
        glow: '0 4px 20px rgba(124, 58, 237, 0.25)',
      },
      keyframes: {
        'dropdown-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'dropdown-in': 'dropdown-in 0.22s ease-out',
      },
    },
  },
  plugins: [],
};
