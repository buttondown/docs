module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "buttondown-blue": "#0069FF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
