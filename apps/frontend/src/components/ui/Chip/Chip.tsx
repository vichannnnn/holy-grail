import {
	Chip as BaseChip,
	ChipProps as BaseChipProps,
	SxProps,
	Theme,
	useTheme,
} from "@mui/material";

interface ChipProps extends BaseChipProps {
	sx?: SxProps<Theme>;
}

export const Chip = ({ sx, ...props }: ChipProps) => {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<BaseChip
			// TODO: Centralize the color themes such that MUI components can use the tailwind custom color as well.
			sx={[
				{
					backgroundColor: "#949494",
					...sx,
				},
				isDark
					? {
							color: "#e5e5e5",
						}
					: {
							color: "#484b6a",
						},
			]}
			{...props}
		/>
	);
};

export default Chip;
