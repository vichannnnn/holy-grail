import type { DividerProps } from "./types";
import { twMerge } from "tailwind-merge";

const thicknessMap = {
	thin: "border-t",
	normal: "border-t-2",
	thick: "border-t-4",
} as const;

export function Divider({ thickness = "normal", className, ...rest }: DividerProps) {
	const base = "border-black/40 dark:border-white/10 w-full";
	const merged = twMerge(thicknessMap[thickness], base, className);
	return <hr className={merged} {...rest} />;
}
