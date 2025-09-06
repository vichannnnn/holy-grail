import { Button as HeadlessButton } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./types";

const baseClasses =
	"inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer";

const variantClasses: Record<string, string> = {
	solid:
		"bg-pink-600 text-white hover:bg-pink-700 focus-visible:ring-pink-500 dark:bg-pink-500 dark:hover:bg-pink-600 dark:focus-visible:ring-pink-400",
	outline:
		"border border-pink-300 text-pink-700 hover:bg-pink-100 focus-visible:ring-pink-500 dark:bg-pink-600 dark:border-pink-700 dark:text-pink-200 dark:hover:bg-pink-700 dark:focus-visible:ring-pink-400",
	ghost:
		"text-pink-700 hover:bg-pink-100 focus-visible:ring-pink-500 dark:bg-transparent dark:text-pink-200 dark:hover:bg-zinc-700 dark:focus-visible:ring-pink-400",
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
