import type { TitleProps, TitleOrder } from "./types";
import { twMerge } from "tailwind-merge";

export const defaultStyles = "text-zinc-900 dark:text-white";
export const twTitleTextSizing: Record<TitleOrder, string> = {
	1: "text-4xl",
	2: "text-2xl",
	3: "text-xl",
	4: "text-lg",
	5: "text-base",
	6: "text-sm",
};

export function Title({ children, order = 1, className, ...rest }: TitleProps) {
	const Tag = `h${order}` as const;
	const mergedStyles = twMerge("font-semibold", defaultStyles, twTitleTextSizing[order], className);
	return (
		<Tag className={mergedStyles} {...rest}>
			{children}
		</Tag>
	);
}
