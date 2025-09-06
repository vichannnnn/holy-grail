import type { SVGProps } from "react";
import { twMerge } from "tailwind-merge";
export function Leaderboard({ className, "aria-label": ariaLabel, ...props }: SVGProps<SVGSVGElement> & { "aria-label"?: string }) {
	const label = ariaLabel ?? "Leaderboard";
	return (
		<svg
			role="img"
			aria-label={label}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={twMerge("size-6", className)}
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
			/>
		</svg>
	);
}
