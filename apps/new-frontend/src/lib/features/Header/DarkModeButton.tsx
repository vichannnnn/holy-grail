"use client";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import { IconButton } from "@shared/ui/components";
import { Sun } from "@lib/icons/Sun";
import { Moon } from "@lib/icons/Moon";

export function DarkModeButton() {
	const { theme, setTheme } = useContext(ClientContext);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	return (
		<IconButton onClick={toggleTheme} size="sm" aria-label="Toggle Dark Mode">
			{theme === "light" ? <Moon className="size-6" /> : <Sun className="size-6 stroke-white" />}
		</IconButton>
	);
}
