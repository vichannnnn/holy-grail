import { Card, Title } from "@shared/ui/components";
import type { AccountSectionProps } from "./types";
import { twMerge } from "tailwind-merge";

export function AccountSection({ title, icon, children, className }: AccountSectionProps) {
	return (
		<div className="w-full">
			<Title order={2} className="flex items-center gap-2 mb-2 text-xl font-semibold">
				{icon}
				{title}
			</Title>
			<Card className={twMerge("p-6 w-full", className)}>{children}</Card>
		</div>
	);
}
