"use server";

import { apiClient } from "@lib/api-client";
import type { PaginatedNotes, NotesSearchParams, LibraryAPIResponse } from "@/app/library/types";
import type { AxiosResponse } from "axios";

export async function fetchPendingApprovalNotes(
	searchParams: NotesSearchParams,
): Promise<LibraryAPIResponse<PaginatedNotes>> {
	let response: AxiosResponse<PaginatedNotes>;
	try {
		response = await apiClient.get<PaginatedNotes>("/notes/pending", {
			params: searchParams,
		});
	} catch (error) {
		return { ok: false, err: `Failed to fetch pending approval notes ${error}` };
	}

	return { ok: true, data: response.data };
}

export async function approveNote(noteId: number): Promise<LibraryAPIResponse<null>> {
	try {
		await apiClient.put(`/admin/approve/${noteId}`);
	} catch (error) {
		return { ok: false, err: `Failed to approve note ${noteId}: ${error}` };
	}

	return { ok: true, data: null };
}

export async function deleteNote(noteId: number): Promise<LibraryAPIResponse<null>> {
	try {
		await apiClient.delete(`/note/${noteId}`);
	} catch (error) {
		return { ok: false, err: `Failed to delete note ${noteId}: ${error}` };
	}

	return { ok: true, data: null };
}
