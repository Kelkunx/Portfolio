/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        muted: "var(--muted)",
        border: "var(--border)",
        blue: "var(--blue)",
        cyan: "var(--cyan)",
        teal: "var(--teal)",
        purple: "var(--purple)",
        magenta: "var(--magenta)",
        green: "var(--green)",
        yellow: "var(--yellow)",
        orange: "var(--orange)",
        red: "var(--red)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      backgroundImage: {
        hero: "var(--grad-hero)",
        accent: "var(--grad-accent)",
      },
    },
  },
  plugins: [],
}
