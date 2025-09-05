CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"password" text,
	"date_of_birth" date NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
