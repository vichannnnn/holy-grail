import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

export interface FooterLinkProps extends LinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	label: string;
}
