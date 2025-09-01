import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
	baseURL: NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		} else {
			localStorage.removeItem("user");
			localStorage.removeItem("access_token");
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("user");
			localStorage.removeItem("access_token");
		}
		return Promise.reject(error);
	},
);
