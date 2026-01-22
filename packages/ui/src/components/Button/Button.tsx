import { Button as HeadlessButton } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./types";

const baseClasses =
	"inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer";

const variantClasses: Record<string, string> = {
	solid:
		"bg-amber text-navy-deep hover:bg-amber-light focus-visible:ring-amber dark:focus-visible:ring-amber-light hover:scale-[1.02] active:scale-[0.98]",
	outline:
		"border border-amber/50 text-amber hover:bg-amber/10 focus-visible:ring-amber dark:bg-transparent dark:border-amber/50 dark:text-amber dark:hover:bg-amber/10 dark:focus-visible:ring-amber hover:scale-[1.02] active:scale-[0.98]",
	ghost:
		"text-navy/70 hover:text-navy hover:bg-navy/5 focus-visible:ring-amber dark:bg-transparent dark:text-cream/70 dark:hover:text-cream dark:hover:bg-cream/5 dark:focus-visible:ring-amber",
	glow:
		"bg-amber text-navy-deep hover:bg-amber-light focus-visible:ring-amber dark:focus-visible:ring-amber-light shadow-lg shadow-amber/25 hover:shadow-xl hover:shadow-amber/30 hover:scale-[1.02] active:scale-[0.98]",
};

export function Button({ variant = "solid", className, children, ...props }: ButtonProps) {
	const classes = twMerge(
		baseClasses,
		variantClasses[variant] ?? variantClasses.solid,
		className ?? "",
	);

	return (
		<HeadlessButton className={classes} {...props}>
			{children}
		</HeadlessButton>
	);
}
