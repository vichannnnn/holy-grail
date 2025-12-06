"use server";
import { cookies } from "next/headers";
import { USER_DATA_KEY, ACCESS_TOKEN_KEY } from "./constants";
import { redirect } from "next/navigation";

// Function to set the current user in cookies
export async function deleteUser(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete(USER_DATA_KEY);
	cookieStore.delete(ACCESS_TOKEN_KEY);
    redirect('/')
}
