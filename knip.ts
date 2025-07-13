export default {
  project: ["**/*.{js,ts,tsx}"],
  entry: ["components/**/*.tsx"],
  vite: true,
  eslint: true,
  exclude: ["types", "classMembers", "unlisted", "exports"],
  ignoreDependencies: [
    "@tailwindcss/typography",
    "tailwindcss",
    // Necessary for an undeclared peer dependency.
    // https://github.com/ajv-validator/ajv-draft-04/issues/10
    "ajv",
  ],
};
