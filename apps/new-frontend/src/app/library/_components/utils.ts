"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { NotesSearchParams } from "../types";

export function useNavigateToSearchValue() {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = (...args: { name: string; value: string }[]) => {
		const params = new URLSearchParams(searchParams.toString());

		for (const { name, value } of args) {
			if (value) {
				params.set(name, value);
			} else {
				params.delete(name);
			}
		}
		return params.toString();
	};
	return (...args: { name: keyof NotesSearchParams; value: string }[]) => {
		router.push(`${pathName}?${createQueryString(...args)}`, { scroll: false });
	};
}
