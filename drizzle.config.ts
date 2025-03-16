import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: './src/drizzle/schemas/*',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
});
