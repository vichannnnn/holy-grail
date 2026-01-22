import { Text, Title } from "@shared/ui/components";

export function LeaderboardHero() {
	return (
		<section className="relative overflow-hidden py-12 md:py-16">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber/10 via-transparent to-transparent dark:from-amber/5" />

			<div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="animate-fade-in-up text-center">
					<p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber">
						Community Leaderboard
					</p>

					<Title className="mb-4 text-3xl font-bold tracking-tight text-navy-deep dark:text-cream sm:text-4xl lg:text-5xl">
						Top Contributors
					</Title>

					<Text className="mx-auto max-w-2xl text-lg text-navy/70 dark:text-cream/60">
						Celebrating the students who have contributed resources to help others succeed.
						Thank you for making Holy Grail a better place for everyone.
					</Text>
				</div>
			</div>
		</section>
	);
}
