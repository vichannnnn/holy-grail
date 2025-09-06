"use client";
import { useLayoutEffect, useSyncExternalStore } from "react";
import type { Theme } from "./types";

const THEME_KEY = "app-theme";

function getThemeFromLocalStorage(): Theme {
	const localStorageTheme = localStorage.getItem(THEME_KEY);
	if (localStorageTheme === "light" || localStorageTheme === "dark") {
		return localStorageTheme;
	}
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	return systemTheme;
}

function subscribeToThemeChanges(callback: () => void) {
	window.addEventListener(THEME_KEY, callback);
	return () => {
		window.removeEventListener(THEME_KEY, callback);
	};
}

export function useTheme() {
	const theme = useSyncExternalStore(
		subscribeToThemeChanges,
		getThemeFromLocalStorage,
		() => "light" as const,
	);

	const setTheme = (newTheme: Theme) => {
		localStorage.setItem(THEME_KEY, newTheme);
		window.dispatchEvent(new Event(THEME_KEY));
	};

	// on initial render, set the theme class on the html element
	useLayoutEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return {
		theme,
		setTheme,
	};
}
