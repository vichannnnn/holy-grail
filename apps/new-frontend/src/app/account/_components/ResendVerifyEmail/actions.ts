"use server";
import type { ResponseData } from "../../types";
import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";

export async function resendVerificationEmail(): Promise<ResponseData> {
	try {
		await apiClient.post("/auth/resend_email_verification_token");
		return { ok: true, message: "Verification email sent successfully" };
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			let errorDescription = "Unable to send verification email. Please try again later.";
			switch (status) {
				case 400:
					errorDescription = "Your email is already verified.";
					break;
				case 401:
					errorDescription = "You are not authorized to perform this action.";
					break;
				case 429:
					errorDescription = "Too many requests. Please wait before requesting another email.";
					break;
			}
			return { ok: false, message: errorDescription };
		}
		return { ok: false, message: "An unexpected error occurred. Please try again later." };
	}
}
