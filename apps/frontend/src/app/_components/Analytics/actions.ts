"use server";
import { apiClient } from "@lib/api-client";
import type { AnalyticsResponse } from "./types";

export async function fetchAnalytics(): Promise<AnalyticsResponse | null> {
	let response: { data: AnalyticsResponse };
	try {
		response = await apiClient.get<AnalyticsResponse>("/analytics/get_latest_analytics");
	} catch {
		return null;
	}
	return response.data;
}
