import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#034A9F",
        secondary: "#005432",
        customGray: "#F8F8F8",
        whiteOverlay: "#FFFFFF1A",
        textColor: "#252F4A",
        lightYellow: "#DD7A08",
        offGreen: "#08EA79",
        lightWhite: "#D7D7D7",
        lightGreen: "#57B708",
        darkBlue: "#252F4A",
      },
    },
  },
  plugins: [],
};
export default config;
