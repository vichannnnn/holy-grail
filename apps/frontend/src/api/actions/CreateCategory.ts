import { AddTypeDetails } from "@layouts/Developer";

import { apiClient } from "@apiClient";

export const createCategory = async (data: AddTypeDetails) => {
	const response = await apiClient.post("/category", data);
	return response.data;
};
