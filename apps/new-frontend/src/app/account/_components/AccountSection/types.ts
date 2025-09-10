import type { ReactNode } from "react";

export interface AccountSectionProps {
	title: string;
	icon: ReactNode;
	children: ReactNode;
	className?: string;
}
