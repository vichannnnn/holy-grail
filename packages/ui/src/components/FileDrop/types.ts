import type { InputHTMLAttributes, Ref } from "react";

export interface FileDropProps extends InputHTMLAttributes<HTMLInputElement> {
	optional?: boolean;
	retainFiles?: boolean;
	ref?: Ref<FileDropHandle>;
}

export interface FileDropHandle {
	input: HTMLInputElement | null;
	removeByName: (name: string) => void;
	clear: () => void;
}
