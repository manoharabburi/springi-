/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#212121',
          secondary: '#2f2f2f',
          tertiary: '#3c3c3c',
          chat: '#343541',
          sidebar: '#202123',
          border: '#4d4d4f',
          'border-light': '#565869',
        },
        text: {
          primary: '#ececf1',
          secondary: '#c5c5d2',
          muted: '#8e8ea0',
        },
        accent: {
          primary: '#19c37d',
          secondary: '#10a37f',
          hover: '#1a7f64',
        },
        message: {
          user: '#343541',
          ai: '#444654',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

