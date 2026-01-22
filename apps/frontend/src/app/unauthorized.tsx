import Link from "next/link";
import Image from "next/image";
import { Button, Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
	title: "Unauthorized - Holy Grail",
	description:
		"You need to be logged in to access this page. Please log in to continue using Holy Grail.",
	openGraph: {
		title: "401 - Unauthorized",
		description: "Access denied. Please log in to continue using Holy Grail.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default function Unauthorized() {
	return (
		<main className="min-h-[70vh] flex items-center justify-center px-4">
			<div className="text-center max-w-md">
				<div className="relative mx-auto mb-8 w-fit animate-float">
					<div className="absolute -inset-6 rounded-full bg-gradient-to-br from-amber/20 to-coral/15 blur-2xl dark:from-amber/10 dark:to-coral/10" />
					<Image
						src="/trimmy-grail-chan-studying.webp"
						alt="Grail-chan studying"
						width={180}
						height={180}
						className="relative"
					/>
				</div>

				<div className="mb-2 inline-flex items-center justify-center rounded-full bg-amber/10 px-3 py-1 text-sm font-medium text-amber dark:bg-amber/20">
					Login required
				</div>

				<Title className="mb-3 text-2xl font-bold text-navy-deep dark:text-cream sm:text-3xl">
					Psst... members only!
				</Title>

				<Text className="mb-8 text-navy/70 dark:text-cream/60">
					This page is for logged-in students. Sign in to access your study materials and track
					your contributions.
				</Text>

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Link href="/auth/sign-in">
						<Button variant="glow" className="w-full sm:w-auto">
							<span>Sign In</span>
							<ArrowRightIcon className="ml-1.5 size-4" />
						</Button>
					</Link>
					<Link href="/">
						<Button variant="ghost" className="w-full sm:w-auto">
							Back to Home
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
