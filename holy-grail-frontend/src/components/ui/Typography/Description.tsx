import { HTMLAttributes, ReactNode } from "react";

interface DescriptionProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
export const Description = ({
	children,
	className,
	...props
}: DescriptionProps) => {
	const baseClasses = "block text-lg text-gray-400 mb-2";
	const combinedClassName = `${baseClasses} ${className}`.trim();

	return (
		<div className={combinedClassName} {...props}>
			<p>{children}</p>
		</div>
	);
};
