import Link from "next/link";
import Image from "next/image";
import { Button, Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
	title: "Page Not Found - Holy Grail",
	description:
		"The page you are looking for could not be found. Please check the URL or return to the homepage of Holy Grail.",
	openGraph: {
		title: "404 - Page Not Found",
		description:
			"Oops! The page you are looking for does not exist. Return to the Holy Grail homepage.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default function NotFound() {
	return (
		<main className="min-h-[70vh] flex items-center justify-center px-4">
			<div className="text-center max-w-md">
				<div className="relative mx-auto mb-8 w-fit animate-float">
					<div className="absolute -inset-6 rounded-full bg-gradient-to-br from-coral/20 to-amber/15 blur-2xl dark:from-coral/10 dark:to-amber/10" />
					<Image
						src="/trimmy-grail-chan-sparkling.webp"
						alt="Grail-chan looking around"
						width={180}
						height={180}
						className="relative"
					/>
				</div>

				<div className="mb-2 inline-flex items-center justify-center rounded-full bg-coral/10 px-3 py-1 text-sm font-medium text-coral dark:bg-coral/20">
					Page not found
				</div>

				<Title className="mb-3 text-2xl font-bold text-navy-deep dark:text-cream sm:text-3xl">
					Lost in the stacks?
				</Title>

				<Text className="mb-8 text-navy/70 dark:text-cream/60">
					This page wandered off somewhere. Maybe it's hiding in the library? Let's get you back
					on track.
				</Text>

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Link href="/">
						<Button variant="glow" className="w-full sm:w-auto">
							<span>Back to Home</span>
							<ArrowRightIcon className="ml-1.5 size-4" />
						</Button>
					</Link>
					<Link href="/library">
						<Button variant="ghost" className="w-full sm:w-auto">
							<MagnifyingGlassIcon className="mr-1.5 size-4" />
							<span>Browse Library</span>
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
