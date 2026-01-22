"use client";

import { useEffect } from "react";
import { Button, Title, Text } from "@shared/ui/components";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="min-h-screen flex flex-col items-center text-center mt-16">
			<Title className="text-6xl">Oops!</Title>
			<Title order={2} className="mt-4 mb-4">
				Something went wrong
			</Title>
			<Text className="max-w-md mb-8" description>
				We encountered an unexpected error. Please try again, or return to the homepage if the
				problem persists.
			</Text>
			<div className="flex gap-4">
				<Button onClick={() => reset()}>Try Again</Button>
				<Button variant="outline" onClick={() => (window.location.href = "/")}>
					Return to Home
				</Button>
			</div>
		</div>
	);
}
