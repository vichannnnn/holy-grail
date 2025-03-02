import { HTMLAttributes, ReactNode } from "react";
import WarningIcon from "@mui/icons-material/Warning";

interface ErrorTextProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

export const ErrorText = ({ children, ...props }: ErrorTextProps) => {
	return (
		// TODO: We should probably set this color in our Tailwind custom class.
		<div className="flex text-[#d73e4f]">
			<WarningIcon sx={{ marginRight: "8px" }} />
			<p {...props}>{children}</p>
		</div>
	);
};
