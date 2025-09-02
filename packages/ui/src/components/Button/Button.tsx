import { Button as HeadlessButton } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./types";

const baseClasses =
	"inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer";

const variantClasses: Record<string, string> = {
	solid:
		"bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus-visible:ring-blue-400",
	outline:
		"border border-gray-300 text-gray-700 hover:bg-gray-200 focus-visible:ring-blue-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-700 dark:focus-visible:ring-blue-400",
	ghost:
		"bg-transparent text-gray-700 hover:bg-gray-200 focus-visible:ring-blue-500 dark:text-gray-200 dark:hover:bg-zinc-700 dark:focus-visible:ring-blue-400",
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
