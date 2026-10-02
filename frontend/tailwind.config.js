/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ThreeUI Warm & Futuristic Palette
        offwhite: '#F7F3EA',
        ivory: '#FFFDF7',
        beige: {
          light: '#F4EFE7',
          DEFAULT: '#E9E0D2',
          dark: '#D9CDBA',
        },
        warmgray: {
          light: '#D3CCC1',
          DEFAULT: '#B8B0A3',
          dark: '#8C8477',
        },
        charcoal: {
          light: '#423F38',
          DEFAULT: '#292722',
          dark: '#1A1815',
        },
        copper: {
          light: '#D48C4D',
          DEFAULT: '#B87333',
          dark: '#9A5B22',
        },
        terracotta: {
          light: '#DC7E5E',
          DEFAULT: '#C96B4B',
          dark: '#A85133',
        },
        orange: {
          light: '#F1A265',
          DEFAULT: '#E28A45',
          dark: '#C86E2A',
        },
        gold: {
          light: '#E5C07F',
          DEFAULT: '#D6A85F',
          dark: '#B78B43',
        },
        sage: {
          light: '#9FB19A',
          DEFAULT: '#7E9278',
          dark: '#5F725A',
        },
        // Backwards compatibility mappings
        cream: {
          DEFAULT: '#F7F3EA',
          soft: '#E9E0D2',
        },
        peach: {
          DEFAULT: '#E28A45',
        },
        coral: {
          DEFAULT: '#C96B4B',
        },
        brown: {
          DEFAULT: '#292722',
        },
        lavender: {
          DEFAULT: '#D6A85F',
        },
        purple: {
          DEFAULT: '#B87333',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Geist', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        '3d-sm': '0 4px 14px 0 rgba(41, 39, 34, 0.08), 0 1px 3px 0 rgba(184, 115, 51, 0.06)',
        '3d': '0 12px 30px -8px rgba(41, 39, 34, 0.12), 0 4px 12px -2px rgba(184, 115, 51, 0.12)',
        '3d-hover': '0 20px 40px -12px rgba(201, 107, 75, 0.25), 0 8px 24px -4px rgba(41, 39, 34, 0.14)',
        '3d-copper': '0 8px 25px -4px rgba(184, 115, 51, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        '3d-terracotta': '0 8px 25px -4px rgba(201, 107, 75, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'glass-warm': '0 10px 35px 0 rgba(41, 39, 34, 0.06)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #F7F3EA 0%, #E9E0D2 100%)',
        'gradient-hero': 'linear-gradient(135deg, #FFFDF7 0%, #F7F3EA 50%, #E9E0D2 100%)',
        'gradient-copper': 'linear-gradient(135deg, #C96B4B 0%, #D6A85F 100%)',
        'gradient-accent': 'linear-gradient(135deg, #B87333 0%, #E28A45 50%, #D6A85F 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 253, 247, 0.9) 0%, rgba(233, 224, 210, 0.65) 100%)',
      }
    },
  },
  plugins: [],
}
