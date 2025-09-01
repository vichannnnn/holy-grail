import type { HTMLAttributes, PropsWithChildren } from "react";

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement>, PropsWithChildren {
	order?: TitleOrder;
	className?: string;
}
