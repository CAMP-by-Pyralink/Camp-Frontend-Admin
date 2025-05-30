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
        primary400: "#5358FF",
        primary200: "#A9ABFF",
        primary100: "#D4D5FF",
        secondary1000: "#270E4F",
        secondary900: "#35136B",
        secondary800: "#431888",
        secondary700: "#511DA4",
        secondary600: "#5F22C1",
        secondary500: "#864DE0",
        secondary100: "#E7DBF9",
        neutrals200: "#CCCBCB",
        neutrals500: "#898384",
        neutrals600: "#726C6C",
        greyText: "#444444",
        blue50: "#EBECFF",
        textColor: "#333333",
        success300: "#0B7B69",
        warning: "#CC7914",
        branding01: "#00B598",
        blue100: "#DEEFFC",
        blue600: "#1790E7",
        blue700: "#147BC5",
        purple500: "#F9F5FF",
        yellowCell: "#FFD40033",
        redCell: "#FF0000",
        greenCell: "#51AF5033",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
    },
    boxShadow: {
      "custom-shadow": "5px 5px 40px rgba(107, 151, 255, 0.3)",
    },
  },
  plugins: [require("tailwindcss-filters"), require("@tailwindcss/typography")],
};
