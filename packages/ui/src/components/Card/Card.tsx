import type { CardProps } from "./types";
import { twMerge } from "tailwind-merge";

const defaultStyles =
	"flex flex-col bg-white/60 border border-navy/5 rounded-2xl dark:bg-navy/40 dark:border-cream/5 p-4 backdrop-blur-sm";

export function Card({ children, className, ...rest }: CardProps) {
	const mergedStyles = twMerge(defaultStyles, className);

	return (
		<div className={mergedStyles} {...rest}>
			{children}
		</div>
	);
}
