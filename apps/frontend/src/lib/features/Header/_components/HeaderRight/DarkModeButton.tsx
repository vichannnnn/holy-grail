"use client";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import { IconButton } from "@shared/ui/components";
import { Sun, Moon } from "@phosphor-icons/react";

export function DarkModeButton() {
	const { theme, setTheme } = useContext(ClientContext);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	return (
		<IconButton onClick={toggleTheme} size="sm" aria-label="Toggle Dark Mode">
			{theme === "light" ? (
				<Moon className="size-6" />
			) : (
				<Sun className="size-6 text-white" />
			)}
		</IconButton>
	);
}
