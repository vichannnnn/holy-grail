"use client";

import {
	DividerProps as BaseDividerProps,
	Divider as DividerBase,
	SxProps,
	Theme,
} from "@mui/material";

interface DividerProps extends BaseDividerProps {
	sx?: SxProps<Theme>;
}

export const Divider = ({ sx, ...props }: DividerProps) => {
	return (
		<DividerBase
			sx={[
				{
					width: "100%",
					borderColor: "#484b6a",
				},
				...(Array.isArray(sx) ? sx : sx ? [sx] : []),
				(theme: Theme) =>
					theme?.applyStyles
						? theme.applyStyles("dark", { borderColor: "#e5e5e5" })
						: { borderColor: theme.palette.mode === "dark" ? "#e5e5e5" : "#484b6a" },
			]}
			{...props}
		/>
	);
};
