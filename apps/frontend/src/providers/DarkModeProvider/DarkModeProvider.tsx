"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext({
	isDarkMode: false,
	toggleDarkMode: () => {},
});

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setIsDarkMode(savedTheme === "dark");
		} else {
			setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
		}
	}, []);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};
