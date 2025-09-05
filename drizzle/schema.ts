// drizzle/schema.ts
import { pgTable, text, varchar, date, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  authUserId: uuid("auth_user_id").primaryKey(), 
  email: text("email").notNull().unique(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
});
