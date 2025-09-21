import Link from "next/link";
import { Button } from "@shared/ui/components";
import type { LinkButtonProps } from "./types";

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
	return (
		<Link href={href}>
			<Button {...props}>{children}</Button>
		</Link>
	);
}
