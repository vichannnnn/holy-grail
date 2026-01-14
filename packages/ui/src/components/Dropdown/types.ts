import type { ReactNode, HTMLAttributes } from "react";

export interface DropdownProps extends Omit<HTMLAttributes<HTMLButtonElement>, "content"> {
	header: ReactNode;

	content: ReactNode[];
}
