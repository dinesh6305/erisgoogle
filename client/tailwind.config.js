module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          body: '#121212',
          text: '#FFFFFF',
          primary: '#660066',
          secondary: '#660066',
          accent: '#FF8A8A',
          background: '#1A1A1A',
          card: '#252525',
          border: '#333333',
          shadow: 'rgba(0, 0, 0, 0.3)',  // Note: Tailwind CSS doesn't support box-shadow colors directly
          navbarBg: 'rgba(18, 18, 18, 0.9)',
        },
      },
    },
    plugins: [],
  };