module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['IBM Plex Mono', 'ui-monospace', 'Menlo', 'Consolas'],
    },
    extend: {
      colors: {
        "buttondown-blue": "#0069FF",
      },
    },
  },
  plugins: [],
};
