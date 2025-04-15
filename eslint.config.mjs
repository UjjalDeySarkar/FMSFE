import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade from error to warning
      "@typescript-eslint/no-unused-vars": "warn", // Downgrade from error to warning
      "react-hooks/exhaustive-deps": "warn", // Already a warning, but being explicit
      "@next/next/no-img-element": "warn", // Downgrade from error to warning
    },
  },
];

export default eslintConfig;
