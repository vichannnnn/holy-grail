"use client";

import type { ReactNode } from "react";
import { CountUp } from "./CountUp";
import type { StatCardProps } from "./types";
import { useScrollReveal } from "@lib/hooks";

interface ExtendedStatCardProps extends StatCardProps {
	icon: ReactNode;
	delay?: number;
}

export function StatCard({ title, value, icon, delay = 0 }: ExtendedStatCardProps) {
	const [ref, isRevealed] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });

	return (
		<div
			ref={ref}
			className="flex flex-col items-center p-6 text-center scroll-reveal"
			style={{
				transitionDelay: `${delay}ms`,
				opacity: isRevealed ? 1 : 0,
				transform: isRevealed ? "translateY(0)" : "translateY(30px)",
			}}
		>
			<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400/20 to-lavender-300/20 dark:from-primary-500/20 dark:to-lavender-400/20 flex items-center justify-center mb-4">
				<div className="text-primary-500 dark:text-primary-400">{icon}</div>
			</div>
			<span className="font-[var(--font-fraunces)] tabular-nums text-4xl md:text-5xl font-bold text-warm-black dark:text-white mb-2">
				{isRevealed ? <CountUp start={0} end={value} separator="," duration={2} /> : "0"}
			</span>
			<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
				{title}
			</span>
		</div>
	);
}
