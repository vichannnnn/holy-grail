"use client";
import { Pagination } from "@lib/features/client";

export function LibraryContent() {
	return (
		<Pagination currentPage={1} totalPages={10} onPageChange={(newPage) => console.log(newPage)} />
	);
}
