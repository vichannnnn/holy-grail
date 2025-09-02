import "server-only";
import axios from "axios";
import { ACCESS_TOKEN_KEY, USER_DATA_KEY } from "@lib/auth/constants";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
	baseURL: NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	async (config) => {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		} else {
			// If no token is found, ensure user data is cleared
			cookieStore.delete(ACCESS_TOKEN_KEY);
			cookieStore.delete(USER_DATA_KEY);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 401) {
			const cookieStore = await cookies();
			cookieStore.delete(ACCESS_TOKEN_KEY);
			cookieStore.delete(USER_DATA_KEY);
		}
		return Promise.reject(error);
	},
);
