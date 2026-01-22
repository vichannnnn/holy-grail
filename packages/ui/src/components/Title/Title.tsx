import type { TitleProps, TitleOrder } from "./types";
import { twMerge } from "tailwind-merge";

export const defaultStyles = "text-navy-deep dark:text-cream";
export const twTitleTextSizing: Record<TitleOrder, string> = {
	1: "text-4xl tracking-tight",
	2: "text-2xl tracking-tight",
	3: "text-xl tracking-tight",
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
