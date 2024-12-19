/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "coffee-50": "#F8F0EC",
        "coffee-100": "#FBF5E9",
        "coffee-500": "#422618",
        "text-dark": "#0D0D0C",
        grey: "#F3F3F2",
        "dark-grey": "#3D3D3D",
        "soft-black": "#1E1E1C",
        "light-grey": "#9C9C96",
      },
    },
  },
  plugins: [],
};
