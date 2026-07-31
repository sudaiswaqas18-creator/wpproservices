/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Black / white brand — cream backgrounds stay warm */
        brand: {
          50: '#F3F3F3',
          100: '#E8E8E8',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#1A1A1A',
          600: '#111111',
          700: '#0A0A0A',
          800: '#000000',
          900: '#000000',
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
          DEFAULT: '#1A1A1A',
          hover: '#000000',
          soft: '#F3F3F3',
          50: '#F3F3F3',
          100: '#E8E8E8',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#1A1A1A',
          600: '#111111',
        },
        secondary: {
          DEFAULT: '#6B6B6B',
          soft: '#F0EBE3',
          50: '#F0EBE3',
          200: '#E0D9CC',
          400: '#A3A3A3',
          500: '#6B6B6B',
          600: '#3D3D3D',
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
          DEFAULT: '#1A1A1A',
          hover: '#000000',
          dark: '#0A0A0A',
        },
        success: '#1A1A1A',
        error: '#B23A3A',
        warning: '#C9922B',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(26, 26, 26, 0.04), 0 4px 16px rgba(26, 26, 26, 0.04)',
        cardHover: '0 8px 28px rgba(26, 26, 26, 0.1)',
        glow: '0 4px 20px rgba(26, 26, 26, 0.18)',
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
