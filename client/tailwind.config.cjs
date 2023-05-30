/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#E1F664",
        "main-red": "#FD7171",
        "mini-profile-menu-bg": "#21212B",
        "scroller-bg": "#1E1E1E",
        background: "#131313",
        "bg-light": "#262626",
        "text-gray": "#4D4D66",
        "text-light": "#A2A2B7",
        "profile-bg": "#393939",
        "nft-bg": "#1E1E1E", // временно scroller bg
        "main-blue":"#1EC0FC"
      },
      linearGradientColors: {
        "main-orange": "linear-gradient(101.36deg, #1472FF 3.9%, #23ECF9 100%)",
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
