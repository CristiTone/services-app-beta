import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  splitting: false,
  clean: true,
  // Prisma client must stay external — it generates native binaries at install time
  external: ['@prisma/client'],
  // Add CJS interop shims so ESM output can import CJS modules (e.g. @prisma/client)
  shims: true,
  // Bundle workspace packages — pnpm symlinks them into node_modules as raw .ts source
  noExternal: [/@marketplace\/.*/],
});
