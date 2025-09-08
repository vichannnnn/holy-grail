import type { ReactNode } from "react";

export interface AccordionProps {
	label: string;
	children: ReactNode;
	className?: string;
	buttonClassName?: string;
	panelClassName?: string;
	iconClassName?: string;
	defaultOpen?: boolean;
}
