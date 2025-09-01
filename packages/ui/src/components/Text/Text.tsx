import type { TextProps } from "./types";
import { twMerge } from "tailwind-merge";

const defaultStyles = "text-theme-dark dark:text-theme-light";
const descriptionStyles = "text-gray-600 dark:text-gray-400";

export function Text({ children, className, description = false, ...rest }: TextProps) {
	const mergedStyles = twMerge(description ? descriptionStyles : defaultStyles, className);
	return (
		<p className={mergedStyles} {...rest}>
			{children}
		</p>
	);
}
