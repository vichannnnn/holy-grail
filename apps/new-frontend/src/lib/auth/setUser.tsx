import "server-only";
import { cookies } from "next/headers";
import { USER_DATA_KEY, ACCESS_TOKEN_KEY } from "./constants";
import type { User } from "./types";

// Function to set the current user in cookies
export async function setUser(user: User, accessToken: string, expiresIn: number): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set(USER_DATA_KEY, encodeURIComponent(JSON.stringify(user)), {
		expires: new Date(Date.now() + expiresIn * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
		expires: new Date(Date.now() + expiresIn * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
}
