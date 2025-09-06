"use client";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import { IconButton } from "@shared/ui/components";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export function DarkModeButton() {
	const { theme, setTheme } = useContext(ClientContext);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	return (
		<IconButton onClick={toggleTheme} size="sm" aria-label="Toggle Dark Mode">
			{theme === "light" ? (
				<MoonIcon className="size-6" />
			) : (
				<SunIcon className="size-6 stroke-white" />
			)}
		</IconButton>
	);
}
