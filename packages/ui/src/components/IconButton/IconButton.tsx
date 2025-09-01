import { Button as HeadlessButton } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { IconButtonProps } from "./types";

const sizeClasses: Record<NonNullable<IconButtonProps["size"]>, string> = {
	sm: "p-1",
	md: "p-2",
	lg: "p-3",
};

const defaultStyles =
	"inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-gray-200 dark:hover:bg-zinc-700 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer";

export function IconButton({ children, className, size = "md", ...props }: IconButtonProps) {
	const classes = twMerge(defaultStyles, sizeClasses[size], className ?? "");

	return (
		<HeadlessButton className={classes} {...props}>
			{children}
		</HeadlessButton>
	);
}

export default IconButton;
