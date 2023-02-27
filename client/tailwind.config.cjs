/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mini-profile-menu-bg": "#21212B",
        "scroller-bg": "#1E1E28",
        background: "#17171F",
        "bg-light": "#242430",
        "text-gray": "#4D4D66",
        "text-light": "#A2A2B7",
        "profile-bg": "#393939",
        "nft-bg": "#25252F"
      },
      linearGradientColors: {
        "main-orange": "linear-gradient(101.36deg, #E65C00 3.9%, #F9D423 100%)",
      },
      fontFamily: {
        garet: ["Garet", "ui-sans-serif"],
        "sf-ui": ["sf-ui-display", "ui-sans-serif"],
      },
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          }

        }
      }
    },
  },
  plugins: [],
}