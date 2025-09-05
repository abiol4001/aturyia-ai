"use server";

import { users } from "@/drizzle/schema";
import { db } from "@/lib/db";



export async function createUser(data: {
  authUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}) {
  try {
    await db
      .insert(users)
      .values(data)
      .onConflictDoUpdate({
        target: users.authUserId,
        set: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
        },
      });
    return { success: true };
  } catch (err) {
    console.error(err);
    // Handle unique violations gracefully 
    const pgError = err as { code?: string; constraint_name?: string; constraint?: string };
    const code = pgError?.code;
    if (code === "23505") {
      // Unique violation
      const constraint = pgError?.constraint_name || pgError?.constraint;
      if (constraint === "users_email_unique") {
        return { success: false, error: "Email already exists", errorCode: code };
      }
      if (constraint === "users_pkey") {
        return { success: false, error: "Profile already exists for this account", errorCode: code };
      }
      return { success: false, error: "A record with these details already exists", errorCode: code };
    }
    return { success: false, error: "Failed to create user" };
  }
}
