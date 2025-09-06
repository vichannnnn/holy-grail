"use client";
import { Pagination } from "@lib/features/client";
import type { LibraryAPIResponse, PaginatedNotes } from "../../types";
import Image from "next/image";
import { Title, Text } from "@shared/ui/components";
import { useNavigateToSearchValue } from "../utils";
import { redirect, useSearchParams } from "next/navigation";
import { LibraryTable } from "./LibraryTable";

export function LibraryContent({ ok, data, err }: LibraryAPIResponse<PaginatedNotes>) {
	const navigateToSearchValue = useNavigateToSearchValue();
	const searchParams = useSearchParams();

	if (!ok || !data) {
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
	if (data.page > data.pages && data.pages > 0) {
		// redirect to last valid page if current page exceeds total pages
		redirect(`?${searchParams.toString().replace(/page=\d+/, `page=${data.pages}`)}`);
	}

	if (data.items.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-64">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="No Results" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					We couldn't find any results :(
				</Title>
				<Text>Try adjusting your search criteria.</Text>
			</div>
		);
	}

	return (
		<main>
			<LibraryTable items={data.items} />
			<Pagination
				currentPage={data.page}
				totalPages={data.pages}
				onPageChange={(page) => navigateToSearchValue({ name: "page", value: page.toString() })}
			/>
		</main>
	);
}
