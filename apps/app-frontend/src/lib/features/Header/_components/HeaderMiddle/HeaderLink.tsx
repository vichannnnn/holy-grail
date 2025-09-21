import Link from "next/link";
import type { HeaderLinkProps } from "./types";

export function HeaderLink({ label, href }: HeaderLinkProps) {
	return (
		<Link href={href} className="text-black dark:text-zinc-200 hover:underline font-semibold">
			{label}
		</Link>
	);
}
