import nextPlugin from "@next/eslint-plugin-next";

// ESLint 10 flat config.
// Note: TypeScript 7 (native, no API) is not yet supported by typescript-eslint
// (see https://github.com/typescript-eslint/typescript-eslint/issues/10940),
// and eslint-config-next's typescript configs pull in typescript-eslint which
// throws on TS 7. To keep `eslint` working with the newest deps (TS 7.0.2,
// eslint 10.11.0), we lint JS with Next.js rules here and rely on `tsc --noEmit`
// (which works with TS 7) for type checking. TS/TSX files are ignored by
// eslint for now; run `pnpm exec tsc --noEmit` for type-aware checks.
// Original .eslintrc rules for @typescript-eslint are preserved below as docs
// and will be re-enabled once typescript-eslint supports TS 7.1+ API:
//   "@typescript-eslint/array-type": "off",
//   "@typescript-eslint/consistent-type-definitions": "off",
//   "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
//   "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
//   "@typescript-eslint/require-await": "off",
//   "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],

const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx",
      "**/*.mts",
      "**/*.cts",
    ],
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];

export default config;
