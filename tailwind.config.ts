import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purple-gradient":
          "linear-gradient(86.67deg, #783BE3 -7.13%, #6028B5 92.13%)",
      },
      backgroundColor: {
        "brand-purple": "#783BE3",
      },
      textColor: {
        "brand-darkpurple": "#221044",
        "brand-purple": "#783BE3",
      },
    },
  },
  plugins: [],
};
export default config;
