import Link from "next/link";
import type { FooterLinkProps } from "./types";

export function FooterLink({ label, href }: FooterLinkProps) {
	return (
		<Link href={href} className="text-zinc-600 dark:text-zinc-400 hover:underline text-sm">
			{label}
		</Link>
	);
}
