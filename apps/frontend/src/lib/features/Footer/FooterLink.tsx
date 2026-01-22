import Link from "next/link";
import type { FooterLinkProps } from "./types";

export function FooterLink({ label, href, ...rest }: Readonly<FooterLinkProps>) {
	return (
		<Link
			href={href}
			className="text-sm text-navy/60 transition-colors hover:text-amber dark:text-cream/50 dark:hover:text-amber"
			{...rest}
		>
			{label}
		</Link>
	);
}
