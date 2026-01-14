import type { ReactNode } from "react";

export interface AccordionProps {
	label: string;
	children: ReactNode;
	className?: string;
	buttonClassName?: string;
	additionalButtons?: ReactNode;
	panelClassName?: string;
	iconClassName?: string;
	defaultOpen?: boolean;
}
