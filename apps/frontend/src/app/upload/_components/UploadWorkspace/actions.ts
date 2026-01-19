"use server";
import type { ResponseData } from "./types";
import { ACCESS_TOKEN_KEY } from "@lib/auth/constants";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadNotes(formData: FormData): Promise<ResponseData> {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

		console.log("🔥 Upload Debug:");
		console.log("  - API URL:", NEXT_PUBLIC_API_URL);
		console.log("  - Full URL:", `${NEXT_PUBLIC_API_URL}/note`);
		console.log("  - Has token:", !!accessToken);

		const headers: HeadersInit = {};
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		const response = await fetch(`${NEXT_PUBLIC_API_URL}/note`, {
			method: "POST",
			headers,
			body: formData,
		});

		console.log("🔥 Response:", response.status, response.statusText);

		if (response.ok) {
			const data = await response.json();
			return {
				ok: true,
				message: `Successfully uploaded ${data?.length || 0} note(s)`,
			};
		}

		const errorBody = await response.text();
		console.log("🔥 Error body:", errorBody);

		const status = response.status;
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
	} catch (err: unknown) {
		console.error("Upload failed:", err);
		return {
			ok: false,
			message: "An unexpected error occurred during upload. Please try again later.",
		};
	}
}
