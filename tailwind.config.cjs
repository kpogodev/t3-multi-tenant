/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "w-sidebar": "320px 1fr",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "luxury"],
  },
}
