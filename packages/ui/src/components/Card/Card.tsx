import type { CardProps } from "./types";
import { twMerge } from "tailwind-merge";

const defaultStyles =
	"flex flex-col bg-white border border-gray-200 rounded-md shadow dark:shadow-none dark:bg-zinc-900 dark:border-0";

export function Card({ children, className, ...rest }: CardProps) {
	const mergedStyles = twMerge(defaultStyles, className);

	return (
		<div className={mergedStyles} {...rest}>
			{children}
		</div>
	);
}
