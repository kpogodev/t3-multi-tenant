/** @type {import('tailwindcss').Config} */
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "w-sidebar": "260px 1fr",
      },
      keyframes: {
        gradientAnim: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      "light",
      {
        luxury: {
          ...require("daisyui/src/colors/themes")["[data-theme=luxury]"],
          primary: "#333",
          "primary-focus": "#666",
          "primary-content": "#fff",
        },
      },
    ],
  },
}
