import Link from "next/link";
import { Button, Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Forbidden - Holy Grail",
	description:
		"You don't have permission to access this page. Your current access level doesn't allow you to view this content.",
	openGraph: {
		title: "403 - Forbidden",
		description: "Access forbidden. You don't have permission to view this content.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default function Forbidden() {
	return (
		<div className="min-h-screen flex flex-col items-center text-center mt-16">
			<Title className="text-6xl">403</Title>
			<Title order={2} className="mt-4 mb-4">
				Access Forbidden
			</Title>
			<Text className="max-w-md mb-8" description>
				Your current access level doesn't allow you to view this content.
			</Text>

			<Link href="/">
				<Button className="flex justify-center mx-auto">Return to Home</Button>
			</Link>
		</div>
	);
}
