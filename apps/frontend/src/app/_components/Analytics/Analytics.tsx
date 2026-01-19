import {
	ArrowDownTrayIcon,
	UserGroupIcon,
	UserPlusIcon,
} from "@heroicons/react/24/outline";
import { StatCard } from "./StatCard";
import { fetchAnalytics } from "./actions";
import { BlobDecoration } from "../shared";

export async function Analytics() {
	const analyticsData = await fetchAnalytics();

	return (
		<section className="relative py-20 px-6 overflow-hidden">
			<BlobDecoration
				variant="pink"
				size="lg"
				className="-bottom-32 -left-32 opacity-20"
			/>
			<BlobDecoration
				variant="lavender"
				size="md"
				className="-top-16 -right-16 opacity-20"
			/>

			<div className="relative max-w-4xl mx-auto">
				<div className="glass rounded-3xl p-8 md:p-12 border border-white/20 dark:border-white/5">
					<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200/50 dark:divide-zinc-700/50">
						<StatCard
							title="Notes Downloaded"
							value={analyticsData?.file_download_count ?? 0}
							icon={<ArrowDownTrayIcon className="w-6 h-6" />}
							delay={0}
						/>
						<StatCard
							title="Students Visited"
							value={analyticsData?.unique_active_users ?? 0}
							icon={<UserGroupIcon className="w-6 h-6" />}
							delay={100}
						/>
						<StatCard
							title="Accounts Created"
							value={analyticsData?.user_count ?? 0}
							icon={<UserPlusIcon className="w-6 h-6" />}
							delay={200}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
