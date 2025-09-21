import type { User } from "@lib/auth";
import type { ReactNode, HTMLAttributes } from "react";

export interface DropdownButtonProps extends HTMLAttributes<HTMLButtonElement> {
	label: string;
	icon: ReactNode;
}

export type NavInfo = {
	needsRole?: 1 | 2 | 3; // Minimum role required to see this link
	render: () => ReactNode;
};

export interface HeaderRightProps {
	user: User | null;
}
