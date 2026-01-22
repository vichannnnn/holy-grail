export interface StatCardProps {
	title: string;
	value: number;
	icon?: "download" | "users" | "user";
}

export interface AnalyticsResponse {
	file_download_count: number;
	unique_active_users: number;
	user_count: number;
}
