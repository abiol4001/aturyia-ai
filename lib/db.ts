import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Connect to Supabase Postgres
const connectionString = process.env.NEXT_PUBLIC_SUPABASE_DB_URL!; // get this from Supabase settings → Database → Connection string
const client = postgres(connectionString, { ssl: "require" });

export const db = drizzle(client);

// Also export Supabase client (for auth/storage if needed)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
