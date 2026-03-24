import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        s1: "var(--s1)",
        s2: "var(--s2)",
        s3: "var(--s3)",
        border: "var(--border)",
        border2: "var(--border2)",
        text: "var(--text)",
        muted: "var(--muted)",
        muted2: "var(--muted2)",
        gold: "var(--gold)",
        gold2: "var(--gold2)",
        "gold-dim": "var(--gold-dim)",
        cold: "var(--cold)",
        warm: "var(--warm)",
        hot: "var(--hot)",
        fire: "var(--fire)",
        blue: "var(--blue)",
        "blue-dim": "var(--blue-dim)",
        "blue-bright": "var(--blue-bright)"
      },
      fontFamily: {
        nanum: ["var(--font-nanum)", "serif"],
        dodum: ["var(--font-dodum)", "serif"],
      }
    },
  },
  plugins: [],
};
export default config;
