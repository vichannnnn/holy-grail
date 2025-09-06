import { AddTypeDetails } from "@layouts/Developer";

import { apiClient } from "@apiClient";

export const createSubject = async (data: AddTypeDetails) => {
	const response = await apiClient.post("/subject", data);
	return response.data;
};
