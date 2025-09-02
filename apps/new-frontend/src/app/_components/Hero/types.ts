import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface PinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	children?: ReactNode;
	className?: string;
}
