import { pgTable, serial, text, varchar, date } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  password: text("password"),
  dateOfBirth: date("date_of_birth").notNull(),
})
