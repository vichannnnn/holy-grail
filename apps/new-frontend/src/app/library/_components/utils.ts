"use client";
import { useSearchParams } from "next/navigation";
import type { NotesSearchParams } from "../types";

export function useAddQueryString() {
	const searchParams = useSearchParams();

	const addQs = (name: keyof NotesSearchParams, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		return params.toString();
	};
	return addQs;
}
