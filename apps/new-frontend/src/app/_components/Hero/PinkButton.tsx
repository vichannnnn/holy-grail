import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { PinkButtonProps } from "./types";

export function PinkButton({ href, className, children, ...rest }: PinkButtonProps) {
	// Copied base classes from shared UI Button (solid variant) to preserve
	// sizing, focus rings and disabled visuals, then applied the pink color scheme.
	const baseClasses =
		"inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer";

	const colorClasses =
		"bg-rose-300 text-zinc-700 hover:bg-rose-400 focus-visible:ring-rose-300 dark:bg-rose-400 dark:hover:bg-rose-500 dark:focus-visible:ring-rose-300";

	const classes = twMerge(baseClasses, colorClasses, className ?? "");

	return (
		<Link href={href} className={classes} {...rest}>
			{children}
		</Link>
	);
}
