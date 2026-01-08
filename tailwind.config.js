/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Press Start 2P"', 'monospace'],
        'body': ['"Quicksand"', 'sans-serif'],
      },
      colors: {
        'poke-red': '#E3350D',
        'poke-blue': '#2563eb',
        'poke-yellow': '#d97706',
        'poke-gold': '#b45309',
        'poke-dark': '#e2e5ec',
        'poke-darker': '#d1d5e0',
        'poke-card': '#ffffff',
        'poke-border': '#c4cad9',
        'poke-text': '#1e293b',
        'poke-text-light': '#64748b',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px rgba(217,119,6,0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(217,119,6,0.8)' },
        },
        'shine': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
