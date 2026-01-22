import { StatCard } from "./StatCard";
import { fetchAnalytics } from "./actions";

export async function Analytics() {
	const analyticsData = await fetchAnalytics();

	return (
		<section className="py-16">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl border border-navy/5 bg-white/60 px-6 py-12 shadow-sm backdrop-blur-sm dark:border-cream/5 dark:bg-navy/40 sm:px-12">
					<div className="absolute -left-20 -top-20 size-64 rounded-full bg-amber/5 blur-3xl" />
					<div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-coral/5 blur-3xl" />

					<div className="relative">
						<div className="mb-10 text-center">
							<p className="text-sm font-semibold uppercase tracking-wider text-amber">
								Trusted by students across Singapore
							</p>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
							<StatCard
								title="Notes Downloaded"
								value={analyticsData?.file_download_count ?? 0}
								icon="download"
							/>
							<StatCard
								title="Students Visited"
								value={analyticsData?.unique_active_users ?? 0}
								icon="users"
							/>
							<StatCard
								title="Accounts Created"
								value={analyticsData?.user_count ?? 0}
								icon="user"
							/>
						</div>

						<p className="mt-10 text-center text-sm text-navy/50 dark:text-cream/40">
							Join the community of students acing their exams
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
