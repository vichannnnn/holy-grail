import { StatCard } from "./StatCard";
import { fetchAnalytics } from "./actions";

export async function Analytics() {
	const analyticsData = await fetchAnalytics();

	return (
		<div className="w-4/5 md:w-3/5 mx-auto mt-8">
			<div className="grid grid-cols-1 md:grid-cols-3">
				<StatCard title="Notes Downloaded" value={analyticsData?.file_download_count ?? 0} />
				<StatCard title="Students Visited" value={analyticsData?.unique_active_users ?? 0} />
				<StatCard title="Accounts Created" value={analyticsData?.user_count ?? 0} />
			</div>
		</div>
	);
}
