import type { ScoreboardUser } from "../types";
import { ContributorCard } from "./ContributorCard";

interface TopContributorsProps {
	users: ScoreboardUser[];
}

export function TopContributors({ users }: TopContributorsProps) {
	if (users.length === 0) return null;

	const first = users[0];
	const second = users[1];
	const third = users[2];

	return (
		<section className="py-8 md:py-12">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-center md:gap-8">
					{second && (
						<div className="order-2 w-full max-w-[280px] animate-fade-in-up [animation-delay:100ms] md:order-1 md:w-1/3">
							<ContributorCard
								rank={2}
								username={second.user.username}
								uploadCount={second.upload_count}
							/>
						</div>
					)}

					{first && (
						<div className="order-1 w-full max-w-[300px] animate-fade-in-up md:order-2 md:-mb-4 md:w-1/3">
							<ContributorCard
								rank={1}
								username={first.user.username}
								uploadCount={first.upload_count}
							/>
						</div>
					)}

					{third && (
						<div className="order-3 w-full max-w-[280px] animate-fade-in-up [animation-delay:200ms] md:w-1/3">
							<ContributorCard
								rank={3}
								username={third.user.username}
								uploadCount={third.upload_count}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
