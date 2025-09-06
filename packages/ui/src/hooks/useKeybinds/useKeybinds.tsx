"use client";
import { useEffect } from "react";
import type { KeybindMapping } from "./types";

export function useKeybinds(keybindMapping: KeybindMapping) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const key = [
				event.ctrlKey ? "Ctrl" : "",
				event.altKey ? "Alt" : "",
				event.shiftKey ? "Shift" : "",
				event.metaKey ? "Meta" : "",
				event.key,
			]
				.filter(Boolean)
				.join("+");

			const keybind = keybindMapping[key];
			if (keybind) {
				keybind();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [keybindMapping]);
}
