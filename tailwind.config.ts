import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(251, 191, 36, 0.16)',
      },
      backgroundImage: {
        'radial-warm': 'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.22), transparent 36%)',
      },
    },
  },
  plugins: [],
};

export default config;
