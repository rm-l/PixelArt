import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        '21': 'repeat(21, minmax(0, 1fr))',
        '31': 'repeat(31, minmax(0, 1fr))',
        '51': 'repeat(51, minmax(0, 1fr))',
        '101': 'repeat(101, minmax(0, 1fr))',
      },
      borderWidth: {
        '0.5': '0.05px',
        '1': '1px',
        '1.5': '1.5px',
      },
    },
  },
  plugins: [],
};
export default config;
