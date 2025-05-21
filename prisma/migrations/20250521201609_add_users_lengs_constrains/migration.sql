ALTER TABLE "users" ADD CONSTRAINT "users_username_length_check" CHECK (length("username") >= 1);
ALTER TABLE "users" ADD CONSTRAINT "users_email_length_check" CHECK (length("email") >= 1);
ALTER TABLE "users" ADD CONSTRAINT "users_password_length_check" CHECK (length("password") >= 1);