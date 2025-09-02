import Link from "next/link";
import { Button, Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";

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
		<div className="min-h-screen flex flex-col items-center text-center mt-16">
			<Title className="text-6xl">404</Title>
			<Title order={2} className="mt-4 mb-4">Oops! Page Not Found</Title>
			<Text className="max-w-md mb-8" description>
				Looks like we're still cooking up this page. The content you're looking for might be
				simmering somewhere else.
			</Text>

			<Link href="/">
				<Button className="flex justify-center mx-auto">Return to Home</Button>
			</Link>
		</div>
	);
}
