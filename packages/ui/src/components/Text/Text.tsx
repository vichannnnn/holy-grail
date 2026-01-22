import type { TextProps } from "./types";
import { twMerge } from "tailwind-merge";

const defaultStyles = "text-navy dark:text-cream";
const descriptionStyles = "text-navy/60 dark:text-cream/50";

export function Text({ children, className, description = false, ...rest }: TextProps) {
	const mergedStyles = twMerge(description ? descriptionStyles : defaultStyles, className);
	return (
		<p className={mergedStyles} {...rest}>
			{children}
		</p>
	);
}
