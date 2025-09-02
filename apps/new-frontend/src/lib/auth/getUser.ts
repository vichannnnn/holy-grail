import "server-only";
import { cookies } from "next/headers";
import { USER_DATA_KEY, ACCESS_TOKEN_KEY } from "./constants";
import type { User } from "./types";
import { jwtDecode } from "jwt-decode";

// Function to get the current user from cookies
export async function getUser(): Promise<User | null> {
	const cookieStore = await cookies();
	const userCookie = cookieStore.get(USER_DATA_KEY)?.value;

	const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
	const { exp } = accessToken ? jwtDecode<{ exp: number }>(accessToken) : { exp: 0 };
	const currentTime = Date.now() / 1000;
	if (exp < currentTime) {
		// Token has expired
		return null;
	}

	if (userCookie) {
		try {
			const user: User = JSON.parse(decodeURIComponent(userCookie));
			return user;
		} catch (error) {
			console.error("Error parsing user cookie:", error);
			return null;
		}
	}
	return null;
}
