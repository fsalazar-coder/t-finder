import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color': {
          'dark': '#1e293b',               //#1e293b (slate-800), #0f172a (slate-900)
          'clear': '#f8fafc',              // slate-50 (Fondo general)
          'highlighted': '#22c55e',       //#22c55e (green-500), #0ea5e9 (sky-500), #d946ef (fuchsia-500) 
          'secondary': '#0369a1',       //#0ea5e9 (sky-500), #d946ef (fuchsia-500) 
          'secondary-clear': '#7dd3fc', //#0369a1 (sky-700), #7dd3fc (sky-300) 
          'secondary-dark': '#082f49', //#082f49 (sky-950) 
          'navbar': '#ffffff',             //#0f172a (slate-900), #94a3b8 (slate-400)
          'border': '#e2e8f0',             // #e2e8f0 (slate-200)
          'border-navbar': '#cbd5e1',      //#0f172a (slate-900), #94a3b8 (slate-400)
          'hover': '#e0f2fe',              //#e0f2fe (sky-100), #bae6fd (sky-200), #0f172a (slate-900), #94a3b8 (slate-400)
          'notification-alert': '#dc2626', //#dc2626 (red-600), #ef4444 (red-500), #059669 (emerald-600)
          'text': {
            'highlighted': '#0ea5e9',     //#0ea5e9 (sky-500), #d946ef (fuchsia-500)   
            'dark': '#0f172a',             //#0f172a (slate-900), #334155 (slate-700), #475569 (slate-600)
            'medium': '#64748b',           //#64748b (slate-500)
            'almost-clear': '#94a3b8',     //#94a3b8 (slate-400)
            'clear': '#e2e8f0',            //#e2e8f0 (slate-200), #cbd5e1 (slate-300), 
          }
        },
      },
      fontSize: {
        'ss': '0.35rem'
      },
      lineHeight: {
        'ss': '0.5rem'
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        'special-l': '30% 70% 47% 53% / 66% 79% 21% 34% ',
        'special-c': '50% 50% 47% 53% / 66% 79% 21% 34% ',
        'special-r': '70% 30% 47% 53% / 66% 79% 21% 34% '
      },
      boxShadow: {
        'outner': '0 2px 8px 0 rgba(0, 0, 0, 0.10)',
        'input': '0 0 0px 1000px #ffffff inset !important',
      },
      dropShadow: {
        '3xl': '0px 2px 2px rgba(0, 0, 0, 0.15)',
        '4xl': '2px 2px 1px rgba(0, 0, 0, 0.25)',
        'natural': '0px 20px 30px rgba(0, 0, 0, 0.5)',
        'text': '4px 4px 5px rgba(0, 0, 0, 1)',
        'image': '0px -5px 10px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'custom-header': "url('/images/productsBackground/productsBackground.jpg')",
        'gradient-header': 'linear-gradient(90deg, rgb(20, 5, 50) 20%, rgb(47, 16, 97) 45%, rgb(47, 16, 97, 0.85) 65%, rgb(47, 16, 97) 100%)',
        'gradient-footer': 'linear-gradient(90deg, rgb(20, 5, 50) 20%, rgb(47, 16, 97) 45%, rgb(47, 16, 97, 0.85) 65%, rgb(47, 16, 97, 0.05) 100%)',
        'image-header': 'linear-gradient(60deg, rgb(20, 5, 50) 25%, rgb(47, 16, 97, 0.95) 45%, rgb(47, 16, 97, 0.75) 65%, rgb(47, 16, 97, 0.95) 80%, rgb(20, 5, 50) 90%), url("/images/headerBackground/headerBackgroundGrayscale.jpg")',
        'image-products': 'linear-gradient(rgb(209, 213, 219, 0.80) 50%, rgb(209, 213, 219, 0.80) 100%), url("/images/productsBackground/productsBackground.jpg")',
        'image-footer': 'linear-gradient(60deg, rgb(20, 5, 50) 30%, rgb(47, 16, 97, 0.95) 50%, rgb(47, 16, 97, 0.75) 65%, rgb(47, 16, 97, 0.95) 80%, rgb(20, 5, 50) 90%), url("/images/FooterHeaderBackground/backgroundFooterGrayscale.jpg")',

      },
      keyframes: {
        'appear': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'disappear': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        'zoom-in-top': {
          '0%': { transform: 'scaleY(0)', visibility: 'hidden', opacity: '0', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', visibility: 'visible', opacity: '1', transformOrigin: 'top' },
        },
        'zoom-out-top': {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'poing': {
          '0%': { transform: 'scale(0.005)' },
          '70%': { transform: 'scale(1)', transformOrigin: 'center' },
          '85%': { transform: 'scale(0.90)', transformOrigin: 'center' },
          '100%': { transform: 'scale(1)', transformOrigin: 'center' },
        },
        'unfold-in': {
          '0%': { transform: 'scaleX(0.005) scaleY(0.005)' },
          '75%': { transform: 'scaleX(1) scaleY(0.005)', transformOrigin: 'center' },
          '100%': { transform: 'scaleX(1) scaleY(1)', transformOrigin: 'center' },
        },
        'unfold-out': {
          '0%': { transform: 'scaleX(1) scaleY(1)' },
          '30%': { transform: 'scaleX(1) scaleY(1)' },
          '50%': { transform: 'scaleX(1) scaleY(0.005)', transformOrigin: 'center' },
          '99%': { transform: 'scaleX(0.005) scaleY(0.005)', transformOrigin: 'center' },
          '100%': { transform: 'scaleX(0) scaleY(0)', transformOrigin: 'center' },
        },
        'fade-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '1%': { transform: 'scale(1)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '99%': { transform: 'scale(1)', opacity: '0' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        'appear-color': {
          '0%': { backgroundColor: 'transparent' },
          '100%': { backgroundColor: 'rgb(2,6,23)' },
        },
        'disappear-color': {
          '0%': { backgroundColor: 'rgb(30,41,59)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'appear-top': {
          '0%': { opacity: '0', transform: 'translateY(-500%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'appear-right': {
          '0%': { opacity: '0', transform: 'translateX(500%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'appear-bottom': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'appear-left': {
          '0%': { opacity: '0', transform: 'translateX(-500%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'disappear-right': {
          '0%': { display: 'flex', transform: 'translateX(0)' },
          '100%': { display: 'hidden', transform: 'translateX(500%)' },
        },
        'disappear-top': {
          '0%': { display: 'flex', transform: 'translateY(0)' },
          '100%': { display: 'hidden', transform: 'translateY(-500%)' },
        },
        'disappear-bottom': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '1', transform: 'translateY(100%)' },
        },
        'special': {
          '0%, 30%': { opacity: '0', transform: 'translateX(0)' },
          '95%': { opacity: '0.30', transform: 'translateX(600%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'width-change': {
          '0%, 50%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'svg-dash': {
          '0%': { strokeDashoffset: '1300' },
          '100%': { strokeDashoffset: '0' },
        },
        'draw-circle': {
          '0%': {
            strokeDasharray: '0, 330',
            strokeDashoffset: '330',
            opacity: '0',
          },
          '100%': {
            strokeDasharray: '330, 330',
            strokeDashoffset: '0',
            opacity: '1',
          },
        },
        'draw-check': {
          '0%': {
            strokeDasharray: '0, 80',
            strokeDashoffset: '48',
            opacity: '0.10',
          },
          '5%': {
            strokeDasharray: '49, 80',
            strokeDashoffset: '48',
            opacity: '0.25',
          },
          '100%': {
            strokeDasharray: '130, 80',
            strokeDashoffset: '48',
            opacity: '1.0',
          }
        },
        'resaltar': {
          '0%': { transform: 'scale(0.95)' },
          '20%': { transform: 'scale(1.1)' },
          '40%': { transform: 'scale(0.95)' },
          '60%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      screens: {
        'mp': '320px', /**mobile-portrait */
        'ml': '480px'  /**mobile-landscape */
      }
    },
  },
  plugins: [],
}
export default config
