import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Connect to Supabase Postgres 

const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL!;
const client = postgres(connectionString, { ssl: "require" });

export const db = drizzle(client);
