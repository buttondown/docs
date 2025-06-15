export default {
  project: ["**/*.{js,ts,tsx}"],
  entry: ["pages/_app.js", "components/**/*.tsx"],
  vite: true,
  eslint: true,
  exclude: ["types", "classMembers", "unlisted", "exports"],
  ignoreDependencies: ["@tailwindcss/typography", "tailwindcss", "postcss"],
};
