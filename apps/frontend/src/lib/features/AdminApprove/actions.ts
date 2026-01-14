"use server";

import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";
import type { ApproveNoteResponse } from "./types";

export async function approveNote(noteId: number): Promise<ApproveNoteResponse> {
	try {
		await apiClient.put(`/admin/approve/${noteId}`);
		return {
			ok: true,
			message: "Note approved successfully",
		};
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;

			const errorMessages = {
				400: "Invalid request. Unable to approve note.",
				401: "Authentication required. Please login.",
				403: "You don't have permission to approve this note.",
				404: "Note not found.",
			} as const;

			const errorMessage =
				errorMessages[status as keyof typeof errorMessages] ??
				"Failed to approve note. Please try again.";

			return { ok: false, message: errorMessage };
		}

		return {
			ok: false,
			message: "Network error occurred. Please try again.",
		};
	}
}
