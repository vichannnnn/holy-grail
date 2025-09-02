"use client";
import { Button } from "@shared/ui/components";
import { useRouter } from "next/navigation";
import { AUTH_LINKS } from "./constants";

export function AuthButtons() {
	const router = useRouter();
	return (
		<>
			{Object.entries(AUTH_LINKS).map(([key, { label, href }]) => (
				<Button key={key} variant="ghost" onClick={() => router.push(href)}>
					{label}
				</Button>
			))}
		</>
	);
}
