import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customPurple: "#1D052C",
        customLightPurple: "#AF5AD0",
        lightPink: "#F6F0E5",
        skyBlue: "#1DC5C4",
        lightGray: "#F2F2F2",
        darkBlue: "#103883",
        lightBlue: "#E5F0F6",
        paleAqua: "#E6F1F0",
        pink: "#F7EDEC",
        lightPurple: "#EAE5F1",
        cream: "#F3EBE4",
        gray: "#E6E6E6",
        darkGray: "#E6E6E6",
        textGray:"#999999",
        customButton :'#333333',
        priceColor: "#6C7275",
      },
    },
  },
  safelist: [
    "bg-lightPink",
    "bg-lightBlue",
    "bg-paleAqua",
    "bg-pink",
    "bg-lightPurple",
    "bg-cream",
  ],
  plugins: [],
};
export default config;
