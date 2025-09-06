import { CountUp } from "./CountUp";
import { Title } from "@shared/ui/components";
import type { StatCardProps } from "./types";

export function StatCard({ title, value }: StatCardProps) {
	return (
		<div className="flex flex-col mx-4">
			<div className="h-16 flex items-end justify-center">
				<Title order={2} className="text-center font-bold">
					{title}
				</Title>
			</div>
			<div className="h-16 flex items-center justify-center">
				<Title order={3} className="text-3xl font-normal">
					<CountUp start={0} end={value} separator="," />
				</Title>
			</div>
		</div>
	);
}
