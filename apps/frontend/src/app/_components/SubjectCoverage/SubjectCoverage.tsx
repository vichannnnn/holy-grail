import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Text, Title } from "@shared/ui/components";
import { SubjectCard } from "./SubjectCard";

const subjects = [
	{
		level: "O-Level",
		description: "GCE 'O' Level subjects for Secondary students",
		subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"],
		href: "/library?category=GCE 'O' Levels",
		color: "amber" as const,
	},
	{
		level: "A-Level",
		description: "GCE 'A' Level subjects for JC students",
		subjects: ["H2 Math", "H2 Physics", "H2 Chemistry", "H2 Economics", "General Paper"],
		href: "/library?category=GCE 'A' Levels",
		color: "coral" as const,
	},
	{
		level: "IB",
		description: "International Baccalaureate subjects",
		subjects: ["Math AA/AI", "Physics", "Chemistry", "Economics", "English A"],
		href: "/library?category=IB",
		color: "navy" as const,
	},
];

export function SubjectCoverage() {
	return (
		<section className="py-16">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<Title className="mb-4 text-3xl font-bold text-navy-deep dark:text-cream sm:text-4xl">
						Coverage for every exam
					</Title>
					<Text className="mx-auto max-w-2xl text-navy/70 dark:text-cream/60">
						From O-Levels to A-Levels and IB, we have notes and papers to help you succeed.
					</Text>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{subjects.map((subject) => (
						<SubjectCard key={subject.level} {...subject} />
					))}
				</div>

				<div className="mt-10 text-center">
					<Link
						href="/library"
						className="inline-flex items-center gap-2 text-amber transition-colors hover:text-amber-light dark:text-amber dark:hover:text-amber-light"
					>
						<span className="font-medium">Browse all subjects</span>
						<ArrowRightIcon className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
