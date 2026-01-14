"use server";

import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";
import type { UpdateNoteData, UpdateNoteResponse } from "./types";

export async function updateNote(
	noteId: number,
	data: UpdateNoteData,
): Promise<UpdateNoteResponse> {
	try {
		const response = await apiClient.put(`/note/${noteId}`, data);
		return {
			ok: true,
			message: "Note updated successfully",
			data: response.data,
		};
	} catch (err: unknown) {
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;

			const errorMessages = {
				400: "Invalid data provided. Please check your input.",
				401: "Authentication required. Please login.",
				403: "You don't have permission to update this note.",
				404: "Note not found.",
			} as const;

			const errorMessage =
				errorMessages[status as keyof typeof errorMessages] ??
				"Failed to update note. Please try again.";

			return { ok: false, message: errorMessage };
		}
		return {
			ok: false,
			message: "An unexpected error occurred. Please try again later.",
		};
	}
}
