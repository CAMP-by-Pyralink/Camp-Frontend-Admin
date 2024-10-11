/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBlack: "#0A0A0B",
        primary1000: "#000250",
        primary900: "#00037B",
        primary800: "#0004A6",
        primary700: "#0006D1",
        primary600: "#0007FC",
        primary500: "#282EFF",
        primary100: "#D4D5FF",
        secondary1000: "#270E4F",
        secondary900: "#35136B",
        secondary800: "#431888",
        secondary700: "#511DA4",
        secondary600: "#5F22C1",
        secondary500: "#864DE0",
        secondary100: "#E7DBF9",
        neutrals200: "#CCCBCB",
        greyText: "#444444",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};
