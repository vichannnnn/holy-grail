import { AxiosResponse } from "axios";

import { AccountDetails } from "./types";

import { apiClient } from "@apiClient";

export const registerAccount = async (accountDetails: AccountDetails): Promise<AxiosResponse> => {
	return await apiClient.post<AxiosResponse>("/auth/create", {
		username: accountDetails.username,
		password: accountDetails.password,
		repeat_password: accountDetails.repeat_password,
		email: accountDetails.email,
	});
};
