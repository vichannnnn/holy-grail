"use server";
import { apiClient } from "@lib/api-client";

export async function resetPassword(token: string) {
	try {
		const response = await apiClient.post("/auth/reset_password", {
			token: token,
		});
		return { ok: true };
	} catch {
		return { ok: false };
	}
}
