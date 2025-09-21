"use server";
import type { ResponseData } from "./types";
import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";

export async function uploadNotes(formData: FormData): Promise<ResponseData> {
	try {
		// Send FormData directly - axios will set proper Content-Type with boundary
		const response = await apiClient.post("/note", formData);
		return {
			ok: true,
			message: `Successfully uploaded ${response.data?.length || 0} note(s)`,
		};
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			let errorDescription = "Please check your input and try again.";
			switch (status) {
				case 400:
					errorDescription =
						"You can upload a maximum of 25 documents at once. Please remove some documents and try again.";
					break;
				case 401:
					errorDescription = "Please login to upload documents.";
					break;
				case 403:
					errorDescription = "You must verify your account before you upload notes.";
					break;
				case 429:
					errorDescription = "You're trying too fast! Please try again in 1 minute.";
					break;
			}
			return { ok: false, message: errorDescription };
		}
		return {
			ok: false,
			message: "An unexpected error occurred during upload. Please try again later.",
		};
	}
}
