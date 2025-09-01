import { UpdateTypeDetails } from "@layouts/Developer";

import { apiClient } from "@apiClient";

export const updateDocumentType = async (id: number, data: UpdateTypeDetails) => {
	return await apiClient.put(`/document_type?id=${id}`, data);
};
