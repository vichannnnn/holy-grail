"use client";

import { TrophyIcon, StarIcon } from "@heroicons/react/24/solid";
import { CountUp } from "@/app/_components/Analytics/CountUp";

interface ContributorCardProps {
	rank: 1 | 2 | 3;
	username: string;
	uploadCount: number;
}

const rankStyles = {
	1: {
		container:
			"bg-gradient-to-br from-amber/20 via-amber/10 to-amber/5 border-amber/30 dark:from-amber/30 dark:via-amber/15 dark:to-amber/5 dark:border-amber/40",
		badge: "bg-amber text-navy-deep",
		icon: "text-amber",
		glow: "shadow-amber/20 dark:shadow-amber/30",
	},
	2: {
		container:
			"bg-gradient-to-br from-navy/15 via-navy/10 to-navy/5 border-navy/30 dark:from-cream/20 dark:via-cream/15 dark:to-cream/10 dark:border-cream/30",
		badge: "bg-navy/60 text-cream dark:bg-cream/80 dark:text-navy-deep",
		icon: "text-navy/60 dark:text-cream/80",
		glow: "shadow-navy/15 dark:shadow-cream/20",
	},
	3: {
		container:
			"bg-gradient-to-br from-orange-400/20 via-orange-300/10 to-orange-200/5 border-orange-400/30 dark:from-orange-500/20 dark:via-orange-400/10 dark:to-orange-300/5 dark:border-orange-500/30",
		badge: "bg-orange-500 text-white",
		icon: "text-orange-500",
		glow: "shadow-orange-400/20 dark:shadow-orange-500/20",
	},
};

const rankLabels = {
	1: "1st",
	2: "2nd",
	3: "3rd",
};

export function ContributorCard({ rank, username, uploadCount }: ContributorCardProps) {
	const styles = rankStyles[rank];

	return (
		<div
			className={`relative overflow-hidden rounded-3xl border p-6 shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.02] ${styles.container} ${styles.glow}`}
		>
			<div
				className={`absolute -right-2 -top-2 flex size-12 items-center justify-center rounded-full ${styles.badge} font-bold shadow-md`}
			>
				{rankLabels[rank]}
			</div>

			<div className="flex flex-col items-center gap-4">
				<div className="relative">
					{rank === 1 ? (
						<TrophyIcon className={`size-16 ${styles.icon}`} />
					) : (
						<StarIcon className={`size-14 ${styles.icon}`} />
					)}
				</div>

				<div className="text-center">
					<h3 className="text-lg font-bold text-navy-deep dark:text-cream">{username}</h3>

					<div className="mt-2 flex items-baseline justify-center gap-1">
						<span className="text-3xl font-bold text-navy-deep dark:text-cream">
							<CountUp end={uploadCount} duration={1.5} />
						</span>
						<span className="text-sm text-navy/60 dark:text-cream/50">
							{uploadCount === 1 ? "upload" : "uploads"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
