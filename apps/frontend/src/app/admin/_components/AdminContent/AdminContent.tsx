"use client";
import { Pagination, AdminEdit, AdminDelete, AdminApprove } from "@lib/features/client";
import Image from "next/image";
import { Title, Text, Button, IconButton } from "@shared/ui/components";
import { useNavigateToSearchValue } from "@/app/library/_components/utils";
import { redirect, useSearchParams } from "next/navigation";
import { LibraryTable, LibraryCard } from "@/app/library/_components/LibraryContent";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import type { AdminContentProps } from "./types";
import type { Note } from "@/app/library/types";
import { Pencil, Trash, Check } from "@phosphor-icons/react";

export function AdminContent({ ok, data, err }: Readonly<AdminContentProps>) {
	const navigateToSearchValue = useNavigateToSearchValue();
	const searchParams = useSearchParams();
	const { breakpoint } = useContext(ClientContext);

	if (!ok || !data) {
		return (
			<div className="flex flex-col items-center justify-center py-12 rounded-2xl border border-navy/5 bg-white/50 dark:border-cream/5 dark:bg-navy/30">
				<div className="relative mb-4">
					<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-coral/20 to-amber/20 blur-2xl dark:from-coral/10 dark:to-amber/10" />
					<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} className="relative" />
				</div>
				<Title order={2} className="font-bold mb-2 text-navy-deep dark:text-cream">
					Something went wrong
				</Title>
				<Text className="text-navy/70 dark:text-cream/60">{err ?? "An unknown error occurred."}</Text>
			</div>
		);
	}
	if (data.page > data.pages && data.pages > 0) {
		redirect(`?${searchParams.toString().replace(/page=\d+/, `page=${data.pages}`)}`);
	}

	if (data.items.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 rounded-2xl border border-navy/5 bg-white/50 dark:border-cream/5 dark:bg-navy/30">
				<div className="relative mb-4">
					<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber/20 to-coral/20 blur-2xl dark:from-amber/10 dark:to-coral/10" />
					<Image src="/trimmy-grail-chan-sparkling.webp" alt="No Results" width={100} height={100} className="relative" />
				</div>
				<Title order={2} className="font-bold mb-2 text-navy-deep dark:text-cream">
					All caught up!
				</Title>
				<Text className="text-navy/70 dark:text-cream/60">No pending submissions to review.</Text>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
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
										<Pencil className="h-5 w-5 text-gray-700 dark:text-gray-300" />
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
										<Check className="h-5 w-5 text-green-600 dark:text-green-400" />
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
										<Trash className="h-5 w-5 text-red-600 dark:text-red-400" />
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
		</div>
	);
}
