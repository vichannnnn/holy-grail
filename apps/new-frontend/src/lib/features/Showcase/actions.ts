"use server";

import { apiClient } from "@lib/api-client";

export async function adClickAction(): Promise<void> {
	try {
		await apiClient.post("/ad_analytics/ad_click");
	} catch (error) {
		console.error("Failed to track ad click:", error);
	}
}

export async function adImpressionAction(): Promise<void> {
	try {
		await apiClient.post("/ad_analytics/ad_view");
	} catch {
		// Ignore because of intended rate limit
	}
}
