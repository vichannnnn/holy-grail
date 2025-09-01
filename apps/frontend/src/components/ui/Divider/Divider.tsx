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
			sx={{
				width: "100%",
				borderColor: (theme) => (theme.palette.mode === "dark" ? "#e5e5e5" : "#484b6a"),
				...sx,
			}}
			{...props}
		/>
	);
};
