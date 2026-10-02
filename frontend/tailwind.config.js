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
        // Spec Color Palette
        cream: {
          DEFAULT: '#FFF8ED',
          soft: '#F6EBDD',
          dark: '#EFE0CD',
        },
        peach: {
          light: '#FDECE4',
          DEFAULT: '#F5B895',
          dark: '#EE9677',
        },
        coral: {
          light: '#F8A893',
          DEFAULT: '#E9785B',
          dark: '#D66346',
        },
        terracotta: {
          light: '#DA745E',
          DEFAULT: '#C85C45',
          dark: '#A84532',
        },
        lavender: {
          light: '#EBE5FA',
          DEFAULT: '#B9A7E8',
          dark: '#A28CDA',
        },
        purple: {
          soft: '#8F78C8',
          deep: '#6C54A7',
        },
        sage: {
          light: '#E2EBE1',
          DEFAULT: '#9DB79B',
          dark: '#7D9A7B',
        },
        brown: {
          light: '#654B41',
          DEFAULT: '#3D2B24',
          dark: '#281B16',
        },
        warm: {
          white: '#FFFFFF',
          ivory: '#FFF8ED',
          cream: '#F6EBDD',
        },
        // Brand mapping to warm coral/terracotta theme
        brand: {
          50: '#FFF8ED',
          100: '#FDF1E2',
          200: '#F9DEC9',
          300: '#F5B895',
          400: '#EE9677',
          500: '#E9785B',
          600: '#C85C45',
          700: '#A84532',
          800: '#6C3125',
          900: '#3D2B24',
          950: '#281B16',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        '3d-sm': '0 4px 14px 0 rgba(61, 43, 36, 0.08), 0 1px 3px 0 rgba(200, 92, 69, 0.05)',
        '3d': '0 12px 30px -10px rgba(61, 43, 36, 0.12), 0 4px 12px -2px rgba(233, 120, 91, 0.12)',
        '3d-hover': '0 20px 40px -12px rgba(200, 92, 69, 0.22), 0 8px 20px -4px rgba(61, 43, 36, 0.14)',
        '3d-button': '0 6px 20px -4px rgba(233, 120, 91, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
        '3d-button-active': '0 2px 8px -2px rgba(200, 92, 69, 0.5), inset 0 2px 4px rgba(61, 43, 36, 0.2)',
        'glass-warm': '0 8px 32px 0 rgba(61, 43, 36, 0.06)',
        'glow-coral': '0 0 30px rgba(233, 120, 91, 0.28)',
        'glow-lavender': '0 0 30px rgba(185, 167, 232, 0.35)',
      },
      backgroundImage: {
        'gradient-warm-hero': 'linear-gradient(135deg, #FFF8ED 0%, #F6EBDD 50%, #F5B895 100%)',
        'gradient-coral': 'linear-gradient(135deg, #E9785B 0%, #C85C45 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F5B895 0%, #E9785B 50%, #8F78C8 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #B9A7E8 0%, #8F78C8 100%)',
        'gradient-sage': 'linear-gradient(135deg, #9DB79B 0%, #7D9A7B 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 235, 221, 0.6) 100%)',
      }
    },
  },
  plugins: [],
}
