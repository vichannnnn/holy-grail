"use client";

import { Button as ButtonBase, ButtonProps, SxProps, Theme } from "@mui/material";
import { MouseEvent, forwardRef, useContext } from "react";

import { DarkModeContext } from "@providers/DarkModeProvider";

interface ButtonBaseProps extends ButtonProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	sx?: SxProps<Theme>;
	href?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
	({ onClick, sx, href, children, ...props }, ref) => {
		const { isDarkMode } = useContext(DarkModeContext);

		return (
			<ButtonBase
				onClick={onClick}
				ref={ref}
				href={href}
				sx={{
					width: 36,
					height: 36,
					minWidth: 0,
					minHeight: 0,
					padding: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "50%",
					color: isDarkMode ? "#e5e5e5" : "#484b6a",
					"&:hover": {
						backgroundColor: isDarkMode ? "#2d2d2d" : "#e4e5f1",
						border: "none",
					},
					...sx,
				}}
				{...props}
			>
				{children}
			</ButtonBase>
		);
	},
);

IconButton.displayName = "IconButton";
