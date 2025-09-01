import WarningIcon from "@mui/icons-material/Warning";
import { HTMLAttributes, ReactNode } from "react";

interface ErrorTextProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

export const ErrorText = ({ children, ...props }: ErrorTextProps) => {
	return (
		// TODO: We should probably set this color in our Tailwind custom class.
		<div className="flex">
			<WarningIcon sx={{ marginRight: "8px" }} />
			<h5 className="text-[#d73e4f]">{children}</h5>
		</div>
	);
};
