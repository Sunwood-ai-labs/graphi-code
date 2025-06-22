/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--current-primary)',
        secondary: 'var(--current-secondary)',
        accent: 'var(--current-accent)',
        neon: 'var(--current-neon)',
        'bg-main': 'var(--current-bg-main)',
        'bg-secondary': 'var(--current-bg-secondary)',
        'text-primary': 'var(--current-text-primary)',
        'text-secondary': 'var(--current-text-secondary)',
        'border-color': 'var(--current-border-color)',
      },
      fontFamily: {
        'sans-jp': 'var(--font-sans-jp)',
        'serif-jp': 'var(--font-serif-jp)',
      },
    },
  },
  plugins: [],
}