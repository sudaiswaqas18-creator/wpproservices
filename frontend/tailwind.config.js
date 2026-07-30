/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Forest green — brand-* keeps existing class names working */
        brand: {
          50: '#E8EDE9',
          100: '#D5E0DA',
          200: '#B5C9BF',
          300: '#7A9A8C',
          400: '#4A6B5C',
          500: '#2D4A3E',
          600: '#1F3529',
          700: '#172820',
          800: '#1A1A1A',
          900: '#1A1A1A',
        },
        background: {
          DEFAULT: '#F5F1EA',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#EDE7DC',
          dark: '#1A1A1A',
          50: '#F5F1EA',
          100: '#EDE7DC',
          200: '#E0D9CC',
        },
        accent: {
          DEFAULT: '#2D4A3E',
          hover: '#1F3529',
          soft: '#E8EDE9',
          50: '#E8EDE9',
          100: '#D5E0DA',
          200: '#B5C9BF',
          300: '#7A9A8C',
          400: '#4A6B5C',
          500: '#2D4A3E',
          600: '#1F3529',
        },
        secondary: {
          DEFAULT: '#B8956A',
          soft: '#F0E6D6',
          50: '#F0E6D6',
          200: '#E0CFAF',
          400: '#C9A87A',
          500: '#B8956A',
          600: '#9A7A52',
        },
        border: {
          DEFAULT: '#E0D9CC',
          strong: '#C9BFAE',
        },
        'text-primary': '#1A1A1A',
        'text-body': '#3D3D3D',
        'text-muted': '#6B6B6B',
        'text-inverse': '#F5F1EA',
        charcoal: {
          DEFAULT: '#1A1A1A',
          soft: '#2D2D2D',
        },
        navy: {
          DEFAULT: '#1A1A1A',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#2D2D2D',
          muted: '#3D3D3D',
          light: '#6B6B6B',
        },
        primary: {
          DEFAULT: '#2D4A3E',
          hover: '#1F3529',
          dark: '#172820',
        },
        success: '#2D4A3E',
        error: '#B23A3A',
        warning: '#C9922B',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(26, 26, 26, 0.04), 0 4px 16px rgba(26, 26, 26, 0.04)',
        cardHover: '0 8px 28px rgba(45, 74, 62, 0.1)',
        glow: '0 4px 20px rgba(45, 74, 62, 0.22)',
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
