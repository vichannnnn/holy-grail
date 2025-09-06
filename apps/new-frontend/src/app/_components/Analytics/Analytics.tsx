import { StatCard } from "./StatCard";

// import { AnalyticsResponse, getAnalytics } from "@api/analytics";

const analyticsData = {
	file_download_count: 69420,
	unique_active_users: 999,
	user_count: 67,
};

export const Analytics = () => {
	/*
	const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse>(defaultAnalyticsData);

	useEffect(() => {
		const fetchAnalytics = async () => {
			const data = await getAnalytics();
			setAnalyticsData(data);
		};
		fetchAnalytics().then((r) => null);
	}, []);
  */

	return (
		<div className="w-4/5 md:w-3/5 mx-auto mt-8">
			<div className="grid grid-cols-1 md:grid-cols-3">
				<StatCard title="Notes Downloaded" value={analyticsData.file_download_count} />
				<StatCard title="Students Visited" value={analyticsData.unique_active_users} />
				<StatCard title="Accounts Created" value={analyticsData.user_count} />
			</div>
		</div>
	);
};
