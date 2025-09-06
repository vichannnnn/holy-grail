"use server";
import { apiClient } from "@lib/api-client";
import { PaginatedNotes, NotesSearchParams, LibraryAPIResponse } from "./types";

export async function fetchApprovedNotes(
	searchParams: NotesSearchParams,
): Promise<LibraryAPIResponse<PaginatedNotes>> {
	/*
	if (searchParams.year === 0) {
		delete searchParams.year;
	}*/
	let response;
	try {
		response = await apiClient.get<PaginatedNotes>("/notes/approved", {
			params: searchParams,
		});
	} catch (error) {
		return { ok: false, err: "Failed to fetch notes" };
	}

	return { ok: true, data: response.data };
}
