import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SubjectCardProps {
	level: string;
	description: string;
	subjects: string[];
	href: string;
	color: "amber" | "coral" | "navy";
}

const colorStyles = {
	amber: {
		badge: "bg-amber/10 text-amber border-amber/20 dark:bg-amber/20 dark:border-amber/30",
		border: "border-amber/10 hover:border-amber/30 dark:border-amber/20 dark:hover:border-amber/40",
		accent: "bg-amber",
	},
	coral: {
		badge: "bg-coral/10 text-coral border-coral/20 dark:bg-coral/20 dark:border-coral/30",
		border: "border-coral/10 hover:border-coral/30 dark:border-coral/20 dark:hover:border-coral/40",
		accent: "bg-coral",
	},
	navy: {
		badge: "bg-navy/10 text-navy border-navy/20 dark:bg-cream/10 dark:text-cream dark:border-cream/20",
		border: "border-navy/10 hover:border-navy/30 dark:border-cream/20 dark:hover:border-cream/40",
		accent: "bg-navy dark:bg-cream",
	},
};

export function SubjectCard({ level, description, subjects, href, color }: SubjectCardProps) {
	const styles = colorStyles[color];

	return (
		<Link href={href} className="group block">
			<div
				className={`relative h-full overflow-hidden rounded-2xl border bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 dark:bg-navy/30 ${styles.border} hover:shadow-lg`}
			>
				<div className={`absolute left-0 top-0 h-1 w-full ${styles.accent}`} />

				<div className={`mb-4 inline-block rounded-lg border px-3 py-1.5 text-sm font-semibold ${styles.badge}`}>
					{level}
				</div>

				<p className="mb-4 text-sm text-navy/60 dark:text-cream/50">{description}</p>

				<div className="mb-4 flex flex-wrap gap-2">
					{subjects.slice(0, 4).map((subject) => (
						<span
							key={subject}
							className="rounded-md bg-navy/5 px-2 py-1 text-xs text-navy/70 dark:bg-cream/5 dark:text-cream/60"
						>
							{subject}
						</span>
					))}
					{subjects.length > 4 && (
						<span className="rounded-md bg-navy/5 px-2 py-1 text-xs text-navy/50 dark:bg-cream/5 dark:text-cream/40">
							+{subjects.length - 4} more
						</span>
					)}
				</div>

				<div className="flex items-center gap-1 text-sm font-medium text-navy/70 transition-colors group-hover:text-amber dark:text-cream/70 dark:group-hover:text-amber">
					<span>Browse {level}</span>
					<ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
				</div>
			</div>
		</Link>
	);
}
