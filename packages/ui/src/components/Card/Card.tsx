import type { CardProps } from "./types";
import { twMerge } from "tailwind-merge";

const defaultStyles =
	"flex flex-col bg-white border border-black/8 rounded-md dark:bg-zinc-900 dark:border-white/8 p-4";

export function Card({ children, className, ...rest }: CardProps) {
	const mergedStyles = twMerge(defaultStyles, className);

	return (
		<div className={mergedStyles} {...rest}>
			{children}
		</div>
	);
}
