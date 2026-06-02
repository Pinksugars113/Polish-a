import { defineConfig } from "drizzle-kit";
import { requireEnv } from "./env-validation";

const DATABASE_URL = requireEnv("DATABASE_URL", "Ensure the database is provisioned.");

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
