"use server";
import type { ForgotPasswordSchema } from "./schemas";
import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";
import type { z } from "zod";

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export async function sendResetPasswordEmail(values: ForgotPasswordFormData) {
	try {
		await apiClient.post("/auth/send_reset_password_mail", values);
		return { ok: true, message: "Password reset email successfully sent." };
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			let errorDescription = "Unable to reset password. Please check your input and try again.";
			if (status === 429) {
				errorDescription = "You're doing this too fast. Please try again later.";
			}
			return { ok: false, message: errorDescription };
		}
		return { ok: false, message: "An unexpected error occurred. Please try again later." };
	}
}
