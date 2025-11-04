import type { SkeletonProps } from "./types";
import { twMerge } from "tailwind-merge";

const defaultStyles = "animate-pulse bg-gray-200 rounded dark:bg-zinc-800";

export function Skeleton({ className, ...rest }: SkeletonProps) {
	const mergedStyles = twMerge(defaultStyles, className);

	return <div className={mergedStyles} {...rest} />;
}
