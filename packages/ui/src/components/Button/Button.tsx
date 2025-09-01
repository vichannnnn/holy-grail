import { Button as HeadlessButton } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./types";

const baseClasses =
	"inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer";

const variantClasses: Record<string, string> = {
	solid: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
	outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:ring-indigo-500",
	ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-indigo-500",
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
