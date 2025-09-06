import type { ButtonProps as HeadlessButtonProps } from "@headlessui/react";

export interface ButtonProps extends HeadlessButtonProps {
	variant?: "solid" | "outline" | "ghost";
	className?: string;
}
