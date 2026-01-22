import { ArrowDownTrayIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { CountUp } from "./CountUp";
import type { StatCardProps } from "./types";

const iconMap = {
	download: ArrowDownTrayIcon,
	users: UsersIcon,
	user: UserIcon,
};

export function StatCard({ title, value, icon }: StatCardProps) {
	const Icon = icon ? iconMap[icon] : null;

	return (
		<div className="text-center">
			{Icon && (
				<div className="mx-auto mb-4 inline-flex rounded-2xl bg-amber/10 p-4 dark:bg-amber/20">
					<Icon className="size-7 text-amber" />
				</div>
			)}

			<div className="mb-2">
				<span className="font-mono text-4xl font-bold tabular-nums text-navy-deep dark:text-cream sm:text-5xl">
					<CountUp start={0} end={value} separator="," duration={2.5} />
				</span>
			</div>

			<p className="text-sm font-medium text-navy/60 dark:text-cream/60">{title}</p>
		</div>
	);
}
