/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Darker blue (900-level shade) - blue-900

        // Secondary Colors
        'secondary': '#059669', // Growth-oriented green (secondary) - emerald-600
        'secondary-50': '#ECFDF5', // Light green (50-level shade) - emerald-50
        'secondary-100': '#D1FAE5', // Light green (100-level shade) - emerald-100
        'secondary-500': '#10B981', // Medium green (500-level shade) - emerald-500
        'secondary-700': '#047857', // Dark green (700-level shade) - emerald-700

        // Accent Colors
        'accent': '#DC2626', // Strategic red (accent) - red-600
        'accent-50': '#FEF2F2', // Light red (50-level shade) - red-50
        'accent-100': '#FEE2E2', // Light red (100-level shade) - red-100
        'accent-500': '#EF4444', // Medium red (500-level shade) - red-500

        // Background Colors
        'background': '#FAFBFC', // Soft neutral background - slate-50
        'surface': '#FFFFFF', // Pure white surface - white

        // Text Colors
        'text-primary': '#1F2937', // Rich charcoal primary text - gray-800
        'text-secondary': '#6B7280', // Balanced gray secondary text - gray-500

        // Status Colors
        'success': '#10B981', // Vibrant green for achievements - emerald-500
        'success-50': '#ECFDF5', // Light success background - emerald-50
        'success-100': '#D1FAE5', // Light success border - emerald-100

        'warning': '#F59E0B', // Warm amber for caution - amber-500
        'warning-50': '#FFFBEB', // Light warning background - amber-50
        'warning-100': '#FEF3C7', // Light warning border - amber-100

        'error': '#EF4444', // Clear red for validation errors - red-500
        'error-50': '#FEF2F2', // Light error background - red-50
        'error-100': '#FEE2E2', // Light error border - red-100

        // Border Colors
        'border': '#E5E7EB', // Minimal border color - gray-200
        'border-light': '#F3F4F6', // Light border variant - gray-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'DEFAULT': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.375rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '110': '110',
        '120': '120',
        '130': '130',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}