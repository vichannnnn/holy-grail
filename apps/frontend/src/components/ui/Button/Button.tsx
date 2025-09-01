"use client";

import { Button as ButtonBase, ButtonProps, SxProps, Theme, useTheme } from "@mui/material";
import { MouseEvent, forwardRef } from "react";

interface ButtonBaseProps extends ButtonProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	sx?: SxProps<Theme>;
	href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(
	({ onClick, sx, href, children, className, ...props }, ref) => {
		const theme = useTheme();
		const isDark = theme.palette.mode === "dark";

		// TODO: We can make a parent component for both Button and IconButton since they're using the same logic.
		return (
			<ButtonBase
				className={className}
				onClick={onClick}
				ref={ref}
				href={href}
				variant="outlined"
				sx={[
					{
						border: "none",
						textTransform: "capitalize",
						fontSize: "16px",
						fontWeight: "bold",
						borderRadius: "4px",
						padding: "8px 10px 8px 10px",

						"&:hover": {
							border: "none",
						},

						"&:focus": {
							border: "none",
							outline: "none",
							boxShadow: "none",
						},

						...sx,
					},
					isDark
						? {
								color: "#e5e5e5",
							}
						: {
								color: "#484b6a",
							},
					isDark
						? {
								"&:hover": {
									backgroundColor: "#2d2d2d",
								},
							}
						: {
								"&:hover": {
									backgroundColor: "#e4e5f1",
								},
							},
				]}
				{...props}
			>
				{children}
			</ButtonBase>
		);
	},
);

Button.displayName = "Button";
