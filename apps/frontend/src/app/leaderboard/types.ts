export interface ScoreboardUser {
	user: {
		user_id: number;
		username: string;
	};
	upload_count: number;
}

export interface IndividualScoreboardUser extends ScoreboardUser {
	rank: number;
}
