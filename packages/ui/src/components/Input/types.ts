import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	/** Optional icon to display inside the input, aligned to the right */
	icon?: ReactNode;
	className?: string;
	containerClassName?: string;
}
