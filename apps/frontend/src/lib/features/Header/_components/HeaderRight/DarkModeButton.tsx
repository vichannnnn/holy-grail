"use client";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import { Sun, Moon } from "@phosphor-icons/react";

export function DarkModeButton() {
	const { theme, setTheme } = useContext(ClientContext);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="p-2 rounded-lg text-navy/70 hover:text-navy hover:bg-cream-dark dark:text-cream/70 dark:hover:text-cream dark:hover:bg-navy transition-colors"
			aria-label="Toggle Dark Mode"
		>
			{theme === "light" ? (
				<Moon className="size-5" weight="fill" />
			) : (
				<Sun className="size-5" weight="fill" />
			)}
		</button>
	);
}
