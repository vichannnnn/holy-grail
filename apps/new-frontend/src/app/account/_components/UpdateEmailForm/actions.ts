"use server";
import { updateUser } from "@/lib/auth/updateUser";
import type { ResponseData } from "../../types";
import type { UpdateEmailFormData } from "./schemas";
import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";

export async function updateEmail(values: UpdateEmailFormData): Promise<ResponseData> {
	try {
		await apiClient.post("/auth/update_email", values);
		const updatedUser = await updateUser({ email: values.new_email });
		if (!updatedUser) {
			return {
				ok: false,
				message:
					"Failed to update user data locally. Sign out and sign in again to see updated changes.",
			};
		}
		return { ok: true, message: "Email updated successfully" };
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			let errorDescription = "Unable to update email. Please check your input and try again.";
			switch (status) {
				case 400:
					errorDescription = "You cannot update a new email with the email you're currently using.";
					break;
				case 401:
					errorDescription = "You are not authorized to perform this action.";
					break;
				case 422:
					errorDescription = "Please ensure your new email format is valid.";
					break;
			}
			return { ok: false, message: errorDescription };
		}
		return { ok: false, message: "An unexpected error occurred. Please try again later." };
	}
}
