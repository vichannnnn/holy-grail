"use server";
import type { ScoreboardUser, IndividualScoreboardUser } from "./types";
import { apiClient } from "@lib/api-client";

export async function fetchScoreboardUsers(): Promise<ScoreboardUser[] | null> {
	try {
		const response = await apiClient.get<ScoreboardUser[]>("/scoreboard");
		return response.data;
	} catch {
		return null;
	}
}

export async function fetchUserScore(): Promise<IndividualScoreboardUser | null> {
	try {
		const response = await apiClient.get<IndividualScoreboardUser>("/scoreboard/user");
		return response.data;
	} catch {
		return null;
	}
}
