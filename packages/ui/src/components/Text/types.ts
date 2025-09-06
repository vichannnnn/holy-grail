import type { HTMLAttributes, PropsWithChildren } from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement>, PropsWithChildren {
	description?: boolean;
	className?: string;
}
