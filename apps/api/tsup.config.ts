import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  splitting: false,
  clean: true,
  // Prisma client must stay external — it generates native binaries at install time
  external: ['@prisma/client'],
});
