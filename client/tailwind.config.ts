import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      backgroundlmage: {
        "gradient—radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient—conic":
          "conic-gradient(from-180deg at 50% 50%, var(--tw-gradient-stops)",
      },
      screens: {
        l000px: "l000px",
        ll00px: "ll00px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
};
export default config;
