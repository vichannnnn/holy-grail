"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { CountUp } from "@/app/_components/Analytics/CountUp";
import type { IndividualScoreboardUser } from "../types";

interface UserStatsCardProps {
	userScore: IndividualScoreboardUser;
}

export function UserStatsCard({ userScore }: UserStatsCardProps) {
	return (
		<section className="py-8 md:py-12">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl border border-coral/10 bg-gradient-to-br from-coral/5 via-white/60 to-amber/5 p-6 shadow-sm backdrop-blur-sm dark:border-coral/20 dark:from-coral/10 dark:via-navy/40 dark:to-amber/10 sm:p-8">
					<div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-coral/10 blur-3xl dark:bg-coral/5" />
					<div className="absolute -left-20 -top-20 size-64 rounded-full bg-amber/10 blur-3xl dark:bg-amber/5" />

					<div className="relative">
						<p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-coral sm:text-left">
							Your Contribution
						</p>

						<div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
							<div className="flex items-center gap-4">
								<UserCircleIcon className="size-12 text-coral/80" />
								<div>
									<h3 className="text-lg font-bold text-navy-deep dark:text-cream">
										{userScore.user.username}
									</h3>
									<p className="text-sm text-navy/60 dark:text-cream/50">
										Rank #{userScore.rank}
									</p>
								</div>
							</div>

							<div className="h-px w-full bg-navy/10 dark:bg-cream/10 sm:h-12 sm:w-px" />

							<div className="text-center sm:text-left">
								<span className="text-4xl font-bold text-navy-deep dark:text-cream">
									<CountUp end={userScore.upload_count} duration={1.5} />
								</span>
								<p className="mt-1 text-sm text-navy/60 dark:text-cream/50">
									{userScore.upload_count === 1
										? "resource uploaded"
										: "resources uploaded"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
