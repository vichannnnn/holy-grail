import { Text, Title } from "@shared/ui/components";
import type { Metadata } from "next";
import Image from "next/image";
import { fetchScoreboardUsers, fetchUserScore } from "./actions";
import {
	LeaderboardHero,
	TopContributors,
	LeaderboardTable,
	UserStatsCard,
} from "./_components";

export const metadata: Metadata = {
	title: "Leaderboard - Holy Grail",
	description:
		"Explore the Holy Grail leaderboard to see top contributors and rankings. Track your progress and compare with" +
		" others in the community.",
	openGraph: {
		title: "Community Leaderboard | Holy Grail",
		description:
			"Check out Holy Grail's leaderboard to discover top contributors and track your own progress. See how you" +
			" compare with others and celebrate community achievements.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default async function LeaderboardPage() {
	"use cache: private";
	const scoreboardUsers = await fetchScoreboardUsers();
	const userScore = await fetchUserScore();

	if (!scoreboardUsers) {
		return (
			<main className="flex flex-col items-center py-16">
				<div className="relative animate-float">
					<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-coral/20 to-amber/20 blur-2xl dark:from-coral/10 dark:to-amber/10" />
					<Image
						src="/trimmy-grail-chan-sparkling.webp"
						alt="Error"
						width={160}
						height={160}
						className="relative"
					/>
				</div>
				<Title
					order={2}
					className="mt-6 text-2xl font-bold text-navy-deep dark:text-cream"
				>
					We ran into an issue
				</Title>
				<Text className="mt-2 text-navy/70 dark:text-cream/60">
					Unable to load top contributor data. Please try again later.
				</Text>
			</main>
		);
	}

	const topThree = scoreboardUsers.slice(0, 3);
	const remaining = scoreboardUsers.slice(3);

	return (
		<main>
			<LeaderboardHero />
			<TopContributors users={topThree} />
			{remaining.length > 0 && <LeaderboardTable users={remaining} />}
			{userScore && <UserStatsCard userScore={userScore} />}
		</main>
	);
}
