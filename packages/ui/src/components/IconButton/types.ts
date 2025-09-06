import type { ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import type { ReactNode } from "react";

export interface IconButtonProps extends HeadlessButtonProps {
	children: ReactNode;
	size?: "sm" | "md" | "lg";
	className?: string;
}
