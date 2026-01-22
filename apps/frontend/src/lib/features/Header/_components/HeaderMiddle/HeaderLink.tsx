"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HeaderLinkProps } from "./types";

export function HeaderLink({ label, href }: HeaderLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

	return (
		<Link
			href={href}
			className={`relative px-1 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
				isActive
					? "text-navy dark:text-cream"
					: "text-navy/70 dark:text-cream/70 hover:text-navy dark:hover:text-cream"
			}`}
		>
			{label}
			<span
				className={`absolute -bottom-1 left-0 h-0.5 bg-amber transition-all duration-150 ${
					isActive ? "w-full" : "w-0 group-hover:w-full"
				}`}
			/>
		</Link>
	);
}
