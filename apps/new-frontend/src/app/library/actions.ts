"use server";
import { apiClient } from "@lib/api-client";
import type {
	PaginatedNotes,
	NotesSearchParams,
	LibraryAPIResponse,
	CategoryType,
	DocumentType,
	SubjectType,
	Note,
} from "./types";

export async function fetchApprovedNotes(
	searchParams: NotesSearchParams,
): Promise<LibraryAPIResponse<PaginatedNotes>> {
	let response;
	try {
		response = await apiClient.get<PaginatedNotes>("/notes/approved", {
			params: searchParams,
		});
	} catch (error) {
		return { ok: false, err: `Failed to fetch notes ${error}` };
	}

	return { ok: true, data: response.data };
}

export async function fetchAllCategories(): Promise<LibraryAPIResponse<CategoryType[]>> {
	let response;
	try {
		response = await apiClient.get("/all_category_level");
	} catch (error) {
		return { ok: false, err: `Failed to fetch categories: ${error}` };
	}

	return {
		ok: true,
		data: response.data.map((category: CategoryType) => ({
			id: category.id,
			name: category.name,
		})),
	};
}

export async function fetchAllDocumentTypes(): Promise<LibraryAPIResponse<DocumentType[]>> {
	let response;
	try {
		response = await apiClient.get("/all_document_type");
	} catch (error) {
		return { ok: false, err: `Failed to fetch document types: ${error}` };
	}

	return {
		ok: true,
		data: response.data.map((document: DocumentType) => ({
			id: document.id,
			name: document.name,
		})),
	};
}

export async function fetchAllSubjects(
	category_id?: number,
): Promise<LibraryAPIResponse<SubjectType[]>> {
	let subjectsResponse;
	try {
		if (category_id) {
			subjectsResponse = await apiClient.get("/all_subjects", {
				params: { category_id: category_id },
			});
		} else {
			subjectsResponse = await apiClient.get("/all_subjects");
		}
	} catch (error) {
		return { ok: false, err: `Failed to fetch subjects: ${error}` };
	}

	return {
		ok: true,
		data: subjectsResponse.data.map((subject: SubjectType) => ({
			id: subject.id,
			name: subject.name,
			category: subject.category,
		})),
	};
}

export async function downloadNote(
	note: Note,
): Promise<LibraryAPIResponse<{ data: string; filename: string }>> {
	try {
		const response = await apiClient.get(`/note/download/${note.id}`, {
			responseType: "arraybuffer",
		});

		if (response.status === 200) {
			// Convert ArrayBuffer to base64 string for serialization
			const buffer = Buffer.from(response.data);
			const base64Data = buffer.toString("base64");

			return {
				ok: true,
				data: {
					data: base64Data,
					filename: note.document_name,
				},
			};
		} else {
			return { ok: false, err: "File not found" };
		}
	} catch (error) {
		return { ok: false, err: `Failed to download note: ${error}` };
	}
}
