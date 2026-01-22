"use client";

import { CountUp } from "@/app/_components/Analytics/CountUp";
import type { ScoreboardUser } from "../types";

interface LeaderboardTableProps {
	users: ScoreboardUser[];
	startRank?: number;
}

export function LeaderboardTable({ users, startRank = 4 }: LeaderboardTableProps) {
	if (users.length === 0) return null;

	return (
		<section className="py-8 md:py-12">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl border border-navy/5 bg-white/60 shadow-sm backdrop-blur-sm dark:border-cream/5 dark:bg-navy/40">
					<div className="absolute -left-20 -top-20 size-64 rounded-full bg-amber/5 blur-3xl" />
					<div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-coral/5 blur-3xl" />

					<div className="relative">
						<div className="grid grid-cols-[auto_1fr_auto] gap-4 border-b border-navy/10 px-6 py-4 dark:border-cream/10 sm:gap-6 sm:px-8">
							<span className="text-xs font-semibold uppercase tracking-wider text-amber">
								Rank
							</span>
							<span className="text-xs font-semibold uppercase tracking-wider text-amber">
								Username
							</span>
							<span className="text-xs font-semibold uppercase tracking-wider text-amber">
								Uploads
							</span>
						</div>

						<div className="divide-y divide-navy/5 dark:divide-cream/5">
							{users.map((user, idx) => (
								<div
									key={user.user.user_id}
									className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-navy/5 dark:hover:bg-cream/5 sm:gap-6 sm:px-8"
								>
									<div className="flex size-8 items-center justify-center rounded-full bg-navy/10 text-sm font-semibold text-navy-deep dark:bg-cream/10 dark:text-cream">
										{startRank + idx}
									</div>
									<span className="truncate text-sm font-medium text-navy-deep dark:text-cream">
										{user.user.username}
									</span>
									<span className="text-sm font-semibold text-navy/70 dark:text-cream/60">
										<CountUp end={user.upload_count} duration={1} />
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
