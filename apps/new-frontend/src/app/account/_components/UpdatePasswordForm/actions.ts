"use server";
import type { ResponseData } from "../../types";
import type { UpdatePasswordFormData } from "./schemas";
import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";

export async function updatePassword(values: UpdatePasswordFormData): Promise<ResponseData> {
	try {
		await apiClient.post("/auth/update_password", values);
		return { ok: true, message: "Password updated successfully" };
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			console.log(status);
			let errorDescription = "Unable to update password. Please check your input and try again.";
			switch (status) {
				case 400:
					errorDescription = "Invalid current password or new password requirements not met.";
					break;
				case 403:
				case 401:
					errorDescription = "You are not authorized to perform this action.";
					break;
				case 422:
					errorDescription = "Please ensure your password meets all requirements.";
					break;
			}
			return { ok: false, message: errorDescription };
		}
		return { ok: false, message: "An unexpected error occurred. Please try again later." };
	}
}
