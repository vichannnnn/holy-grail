"use server";

import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";
import type { DeleteNoteResponse } from "./types";

export async function deleteNote(noteId: number): Promise<DeleteNoteResponse> {
	try {
		await apiClient.delete(`/note/${noteId}`);
		return {
			ok: true,
			message: "Note deleted successfully",
		};
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;

			const errorMessages = {
				400: "Invalid request. Unable to delete note.",
				401: "Authentication required. Please login.",
				403: "You don't have permission to delete this note.",
				404: "Note not found.",
			} as const;

			const errorMessage =
				errorMessages[status as keyof typeof errorMessages] ??
				"Failed to delete note. Please try again.";

			return { ok: false, message: errorMessage };
		}
		return {
			ok: false,
			message: "An unexpected error occurred. Please try again later.",
		};
	}
}
