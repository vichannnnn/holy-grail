"use client";
import { Pagination } from "@lib/features/client";
import type { LibraryAPIResponse, PaginatedNotes } from "../../types";
import Image from "next/image";
import { Title, Text } from "@shared/ui/components";

export function LibraryContent({ ok, data, err }: LibraryAPIResponse<PaginatedNotes>) {
	if (!ok) {
		return (
			<div className="flex flex-col items-center justify-center h-64">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					We ran into an issue :(
				</Title>
				<Text>{err ?? "An unknown error occurred."}</Text>
			</div>
		);
	}
	return (
		<Pagination currentPage={1} totalPages={10} onPageChange={(newPage) => console.log(newPage)} />
	);
}
