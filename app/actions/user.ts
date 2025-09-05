"use server";

import { users } from "@/drizzle/schema";
import { db } from "@/lib/db";



export async function createUser(data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: Date;
}) {
  try {
    await db.insert(users).values(data);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to create user" };
  }
}
