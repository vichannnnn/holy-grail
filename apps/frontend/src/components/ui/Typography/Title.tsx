import { HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
export const Title = ({ children, className, ...props }: TitleProps) => {
	const baseClasses = "text-2xl font-bold mt-12";
	const combinedClassName = `${baseClasses} ${className}`.trim();

	return (
		<div className={combinedClassName} {...props}>
			<p>{children}</p>
		</div>
	);
};
