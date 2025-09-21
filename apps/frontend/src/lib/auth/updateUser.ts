import "server-only";
import { cookies } from "next/headers";
import { USER_DATA_KEY } from "./constants";
import type { User } from "./schemas";
import { getUser } from "./getUser";

// Function to update the current user in cookies
export async function updateUser(userUpdates: Partial<User>): Promise<User | null> {
	const cookieStore = await cookies();
	const currentUser = await getUser();

	if (!currentUser) {
		return null;
	}

	// Merge current user data with updates
	const updatedUser: User = {
		...currentUser,
		...userUpdates,
	};

	try {
		// Set the updated user cookie
		cookieStore.set(USER_DATA_KEY, encodeURIComponent(JSON.stringify(updatedUser)));
		return updatedUser;
	} catch (error) {
		console.error("Error updating user cookie:", error);
		return null;
	}
}
