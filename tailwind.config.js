/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#241E33',
        fog: '#EFEAE2',
        teal: '#4F8577',
        amber: '#E8983D',
        slate: '#6B6478'
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(36, 30, 51, 0.12)'
      }
    }
  },
  plugins: []
};
