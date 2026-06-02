import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { requireEnv } from "./env-validation";

const { Pool } = pg;

const DATABASE_URL = requireEnv("DATABASE_URL", "Did you forget to provision a database?");

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle(pool, { schema });
