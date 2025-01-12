/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For React
    "./pages/**/*.{js,jsx,ts,tsx}", // For Next.js
    "./components/**/*.{js,jsx,ts,tsx}", // Common folder for components
  ],
  theme: {
    extend: {}, // Customize your theme here
  },
  plugins: [],
};
