import { z } from "zod";

export const RegisterSchema = z
	.object({
		username: z
			.string()
			.regex(/^[a-zA-Z0-9]{4,20}$/, "Username should contain 4 to 20 alphanumeric characters"),
		email: z.email("Invalid email provided"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(30, "Password cannot exceed 30 characters")
			.regex(/[!@#$%^&*/]/, "Password must one of the following special characters: !@#$%^&*/")
			.regex(/[A-Z]/, "Password must contain an uppercase letter"),
		repeat_password: z.string().min(1, "Repeat password is required"),
	})
	.refine((data) => data.password === data.repeat_password, {
		message: "Passwords must match",
		path: ["repeat_password"],
	});
