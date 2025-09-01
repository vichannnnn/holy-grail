import { UpdateUserDetails } from "@layouts/Developer";

import { apiClient } from "@apiClient";

export const updateUserRole = async (userId: number, data: UpdateUserDetails): Promise<void> => {
	const response = await apiClient.put(`/admin/user/${userId}`, data);
	return response.data;
};
