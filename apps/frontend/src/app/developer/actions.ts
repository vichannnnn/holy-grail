"use server";

import { apiClient } from "@lib/api-client";
import type { LibraryAPIResponse } from "@/app/library/types";
import type { AxiosResponse } from "axios";
import type {
	EditCategoryFormData,
	EditSubjectFormData,
	EditDocumentTypeFormData,
	PaginatedUsers,
} from "./_components";

export async function fetchUsers(
	page: number = 1,
	size: number = 20,
	search?: string,
): Promise<LibraryAPIResponse<PaginatedUsers>> {
	let response: AxiosResponse<PaginatedUsers>;
	try {
		const params = new URLSearchParams({
			page: page.toString(),
			size: size.toString(),
		});
		if (search) {
			params.append("search", search);
		}
		response = await apiClient.get(`/admin/users?${params.toString()}`);
	} catch (error) {
		return { ok: false, err: `Failed to fetch users: ${error}` };
	}

	return { ok: true, data: response.data };
}

// Create operations
export async function createCategory(
	data: EditCategoryFormData,
): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.post("/category", data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to create category: ${error}` };
	}
}

export async function createSubject(data: EditSubjectFormData): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.post("/subject", data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to create subject: ${error}` };
	}
}

export async function createDocumentType(
	data: EditDocumentTypeFormData,
): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.post("/document_type", data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to create document type: ${error}` };
	}
}

// Update operations
export async function updateCategory(
	id: number,
	data: EditCategoryFormData,
): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.put(`/category?id=${id}`, data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to update category: ${error}` };
	}
}

export async function updateSubject(
	id: number,
	data: EditSubjectFormData,
): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.put(`/subject?id=${id}`, data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to update subject: ${error}` };
	}
}

export async function updateDocumentType(
	id: number,
	data: EditDocumentTypeFormData,
): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.put(`/document_type?id=${id}`, data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to update document type: ${error}` };
	}
}

export async function updateUserRole(
	userId: number,
	data: { role: number },
): Promise<LibraryAPIResponse<void>> {
	try {
		await apiClient.put(`/admin/user/${userId}`, data);
		return { ok: true };
	} catch (error) {
		return { ok: false, err: `Failed to update user role: ${error}` };
	}
}
