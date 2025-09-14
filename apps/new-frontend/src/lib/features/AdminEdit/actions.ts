"use server";

import { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects } from "@/app/library/actions";
import type { Note } from "@/app/library/types";
import { apiClient } from "@lib/api-client";
import { isAxiosError } from "axios";

export interface UpdateNoteData {
	category?: number;
	document_name?: string;
	subject?: number;
	type?: number;
	year?: number;
}

export interface UpdateNoteResponse {
	ok: boolean;
	message: string;
	data?: Note;
}

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
			let errorMessage = "Failed to update note. Please try again.";
			switch (status) {
				case 400:
					errorMessage = "Invalid data provided. Please check your input.";
					break;
				case 401:
					errorMessage = "Authentication required. Please login.";
					break;
				case 403:
					errorMessage = "You don't have permission to update this note.";
					break;
				case 404:
					errorMessage = "Note not found.";
					break;
			}
			return { ok: false, message: errorMessage };
		}
		return {
			ok: false,
			message: "An unexpected error occurred. Please try again later.",
		};
	}
}

export { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects };
