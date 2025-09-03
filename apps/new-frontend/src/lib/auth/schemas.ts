import { z } from "zod";

export const UserSchema = z.object({
	user_id: z.number(),
	username: z.string(),
	email: z.string().optional(),
	role: z.number(),
	verified: z.boolean(),
});

export const CurrentUserWithJWTSchema = z.object({
	data: UserSchema,
	access_token: z.string(),
	token_type: z.string(),
	exp: z.number(),
});

export type User = z.infer<typeof UserSchema>;
export type CurrentUserWithJWT = z.infer<typeof CurrentUserWithJWTSchema>;

export interface LogInDetails {
	username: string;
	password: string;
}
