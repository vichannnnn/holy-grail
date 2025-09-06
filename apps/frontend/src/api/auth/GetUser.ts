import { apiClient } from "@apiClient";

import { User } from "@providers/AuthProvider";

export const getUser = async (): Promise<User> => {
	const response = await apiClient.get("/auth/get");
	return response.data;
};
