import { UpdateTypeDetails } from "@layouts/Developer";

import { apiClient } from "@apiClient";

export const updateSubject = async (id: number, data: UpdateTypeDetails) => {
	return await apiClient.put(`/subject?id=${id}`, data);
};
