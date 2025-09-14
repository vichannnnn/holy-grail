"use client";
import { Pagination } from "@lib/features/client";
import Image from "next/image";
import { Title, Text } from "@shared/ui/components";
import { useNavigateToSearchValue } from "@/app/library/_components/utils";
import { redirect, useSearchParams } from "next/navigation";
import { LibraryTable, LibraryCard } from "@/app/library/_components/LibraryContent";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import type { AdminContentProps } from "./types";
import type { Note } from "@/app/library/types";
import { AdminEdit, AdminDelete, AdminApprove } from "@lib/features/client";
import { Button, IconButton } from "@shared/ui/components";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";

export function AdminContent({ ok, data, err }: AdminContentProps) {
	const navigateToSearchValue = useNavigateToSearchValue();
	const searchParams = useSearchParams();
	const { breakpoint } = useContext(ClientContext);

	if (!ok || !data) {
		return (
			<div className="flex flex-col items-center justify-center mt-4">
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
			<div className="flex flex-col items-center justify-center h-64 mt-4">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="No Results" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					No pending approval notes found
				</Title>
				<Text>All notes have been reviewed or there are no pending submissions.</Text>
			</div>
		);
	}

	return (
		<main className="flex flex-col px-8 mt-4">
			{[undefined, "sm", "md"].includes(breakpoint) ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{data.items.map((item) => (
						<LibraryCard
							key={item.id}
							item={item}
							renderAdminActions={() => (
								<div className="flex gap-2 mt-2">
									<AdminEdit
										render={({ toggleOpen }) => (
											<Button variant="ghost" onClick={toggleOpen} className="flex-1 text-sm">
												Edit
											</Button>
										)}
										note={item}
									/>
									<AdminApprove
										render={({ toggleOpen }) => (
											<Button
												variant="ghost"
												onClick={toggleOpen}
												className="flex-1 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
											>
												Approve
											</Button>
										)}
										note={item}
									/>
									<AdminDelete
										render={({ toggleOpen }) => (
											<Button
												variant="ghost"
												onClick={toggleOpen}
												className="flex-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
											>
												Delete
											</Button>
										)}
										note={item}
									/>
								</div>
							)}
						/>
					))}
				</div>
			) : (
				<LibraryTable
					items={data.items}
					renderAdminActions={(note: Note) => (
						<>
							<AdminEdit
								render={({ toggleOpen }) => (
									<IconButton
										onClick={toggleOpen}
										aria-label={`Edit ${note.document_name}`}
										className="ml-2"
									>
										<PencilIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
									</IconButton>
								)}
								note={note}
							/>
							<AdminApprove
								render={({ toggleOpen }) => (
									<IconButton
										onClick={toggleOpen}
										aria-label={`Approve ${note.document_name}`}
										className="ml-2"
									>
										<CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
									</IconButton>
								)}
								note={note}
							/>
							<AdminDelete
								render={({ toggleOpen }) => (
									<IconButton
										onClick={toggleOpen}
										aria-label={`Delete ${note.document_name}`}
										className="ml-2"
									>
										<TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
									</IconButton>
								)}
								note={note}
							/>
						</>
					)}
				/>
			)}
			<Pagination
				currentPage={data.page}
				totalPages={data.pages}
				onPageChange={(page) => navigateToSearchValue({ name: "page", value: page.toString() })}
			/>
		</main>
	);
}
