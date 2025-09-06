"use server";
import { apiClient } from "@lib/api-client";
import type {
	PaginatedNotes,
	NotesSearchParams,
	LibraryAPIResponse,
	CategoryType,
	DocumentType,
	SubjectType,
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
		return { ok: false, err: "Failed to fetch notes" };
	}

	return { ok: true, data: response.data };
}

export async function fetchAllCategories(): Promise<LibraryAPIResponse<CategoryType[]>> {
	let response;
	try {
		response = await apiClient.get("/all_category_level");
	} catch (error) {
		return { ok: false, err: "Failed to fetch categories" };
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
		return { ok: false, err: "Failed to fetch document types" };
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
		return { ok: false, err: "Failed to fetch subjects" };
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
