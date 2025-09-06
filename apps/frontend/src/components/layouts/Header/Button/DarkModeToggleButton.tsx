"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";

import { IconButton } from "@components/Button";

import { DarkModeContext } from "@providers/DarkModeProvider";

export const DarkModeToggleButton = () => {
	const { toggleDarkMode } = useContext(DarkModeContext);

	return (
		<>
			<IconButton onClick={toggleDarkMode}>
				<DarkModeIcon />
			</IconButton>
		</>
	);
};
