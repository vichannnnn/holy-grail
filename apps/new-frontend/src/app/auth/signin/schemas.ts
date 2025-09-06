import { z } from "zod";

export const SignInSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

export type SignInSchema = z.infer<typeof SignInSchema>;
