import Link from "next/link";
import type { FooterLinkProps } from "./types";

export function FooterLink({ label, href }: FooterLinkProps) {
	return (
		<Link href={href} className="text-black dark:text-zinc-200 hover:underline font-semibold">
			{label}
		</Link>
	);
}
