import "server-only";
import { cookies } from "next/headers";
import { USER_DATA_KEY, ACCESS_TOKEN_KEY } from "./constants";
import type { User } from "./schemas";

// Function to set the current user in cookies
// expiresAtMs is the absolute timestamp (milliseconds since epoch) when the cookie should expire
export async function setUser(user: User, accessToken: string, expiresAtMs: number): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set(USER_DATA_KEY, encodeURIComponent(JSON.stringify(user)), {
		expires: new Date(expiresAtMs),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
		expires: new Date(expiresAtMs),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
}
