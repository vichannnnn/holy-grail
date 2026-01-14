"use server";
import { updateUser } from "@lib/auth";
import { apiClient } from "@lib/api-client";

export async function verifyAccount(token: string) {
	try {
		await apiClient.post("/auth/verify", {
			token: token,
		});
		await updateUser({
			verified: true,
		});

		return { ok: true };
	} catch {
		return { ok: false };
	}
}
