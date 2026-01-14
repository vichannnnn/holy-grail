import { fetchScoreboardUsers, fetchUserScore } from "./actions";
import { Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";
import Image from "next/image";

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

	// we couldnt get the data, show error
	if (!scoreboardUsers) {
		return (
			<main className="flex flex-col items-center">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					We ran into an issue :(
				</Title>
				<Text>Unable to load top contributor data. Please try again later.</Text>
			</main>
		);
	}
	return (
		<main className="flex flex-col items-center mx-auto lg:w-2/3 w-5/6 ">
			<div className="flex flex-col items-center gap-2 mb-8">
				<Title order={1} className="font-bold text-center text-2xl">
					Top Contributors
				</Title>
				<Title order={2} className="text-center text-lg font-normal">
					These are the top contributors that has contributed resource materials such as practice
					papers or notes to the Holy Grail.
				</Title>
			</div>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full min-w-96">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
										No.
									</th>
									<th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
										Username
									</th>
									<th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider wrap-break-word max-w-24">
										No. of resources uploaded
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
								{scoreboardUsers.map((user, idx) => (
									<tr key={user.user.user_id}>
										<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
											{idx + 1}
										</td>
										<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
											{user.user.username}
										</td>
										<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
											{user.upload_count}
										</td>
									</tr>
								))}

								{userScore && (
									<>
										<tr className="bg-gray-50 dark:bg-gray-700">
											<td colSpan={3} className="px-6 py-2">
												<Title
													order={3}
													className="text-sm font-bold text-gray-900 dark:text-gray-100"
												>
													Your statistics
												</Title>
											</td>
										</tr>
										<tr>
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
												{userScore.rank}
											</td>
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
												{userScore.user.username}
											</td>
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
												{userScore.upload_count}
											</td>
										</tr>
									</>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}
