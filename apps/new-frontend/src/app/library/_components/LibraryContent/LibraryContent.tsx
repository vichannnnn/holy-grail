"use client";
import { Pagination } from "@lib/features/client";
import type { LibraryAPIResponse, PaginatedNotes, NotesSearchParams } from "../../types";
import Image from "next/image";
import { Title, Text } from "@shared/ui/components";
import { useRouter, usePathname } from "next/navigation";
import { useAddQueryString } from "../utils";

export function LibraryContent({ ok, data, err }: LibraryAPIResponse<PaginatedNotes>) {
	const router = useRouter();
	const pathName = usePathname();
	const addQs = useAddQueryString();

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

	return (
		<main>
			{JSON.stringify(data.items)}
			<Pagination
				currentPage={data.page}
				totalPages={data.pages}
				onPageChange={() => {
					router.push(`${pathName}?${addQs("page", String(data.page + 1))}`);
				}}
			/>
		</main>
	);
}
