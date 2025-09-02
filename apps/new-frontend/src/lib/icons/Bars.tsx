import type { SVGProps } from "react";
import { twMerge } from "tailwind-merge";
export function Bars({ className, "aria-label": ariaLabel, ...props }: SVGProps<SVGSVGElement> & { "aria-label"?: string }) {
	const label = ariaLabel ?? "Menu";
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
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	);
}
