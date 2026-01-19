import { Button as HeadlessButton } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./types";

const baseClasses =
	"inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer";

const variantClasses: Record<string, string> = {
	solid:
		"bg-pink-500 text-white hover:bg-pink-600 focus-visible:ring-pink-500 dark:focus-visible:ring-pink-400 hover:scale-[1.02] active:scale-[0.98]",
	outline:
		"border border-pink-300 text-pink-600 hover:bg-pink-100 focus-visible:ring-pink-500 dark:bg-transparent dark:border-pink-400/50 dark:text-pink-300 dark:hover:bg-pink-500/10 dark:focus-visible:ring-pink-400 hover:scale-[1.02] active:scale-[0.98]",
	ghost:
		"text-pink-600 hover:bg-pink-100 focus-visible:ring-pink-500 dark:bg-transparent dark:text-pink-50 dark:hover:bg-zinc-700 dark:focus-visible:ring-pink-400",
	glow:
		"bg-pink-500 text-white hover:bg-pink-600 focus-visible:ring-pink-500 dark:focus-visible:ring-pink-400 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98]",
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
