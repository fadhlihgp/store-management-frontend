/** @type {import('tailwindcss').Config} */
import DaisyUIPlugin from "daisyui";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
],
  theme: {
    extend: {},
  },
  plugins: [Typography, DaisyUIPlugin],
  daisyui: {
    themes: [ "light", "dark"],
  },
}

