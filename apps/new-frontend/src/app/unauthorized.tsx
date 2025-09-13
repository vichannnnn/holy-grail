import Link from "next/link";
import { Button, Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";

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
		<div className="min-h-screen flex flex-col items-center text-center mt-16">
			<Title className="text-6xl">401</Title>
			<Title order={2} className="mt-4 mb-4">
				Authentication Required
			</Title>
			<Text className="max-w-md mb-8" description>
				You need to be logged in to access this page. Please sign in to continue.
			</Text>

			<Link href="/auth/sign-in">
				<Button className="flex justify-center mx-auto">Sign In</Button>
			</Link>
		</div>
	);
}
