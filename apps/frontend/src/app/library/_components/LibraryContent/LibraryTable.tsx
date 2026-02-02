"use client";
import Link from "next/link";
import type { LibraryTableProps } from "./types";
import { CustomDownloadIcon } from "./CustomDownloadIcon";

export function LibraryTable({ items, renderAdminActions }: Readonly<LibraryTableProps>) {
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-SG", options);
	};

	const getDocumentUrl = (fileName: string) => {
		const cdnUrl = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL;
		if (!cdnUrl) return undefined;
		return `${cdnUrl}/${fileName}`;
	};

	const getDownloadUrl = (noteId: number) => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		return `${apiUrl}/note/download/${noteId}`;
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full ">
				<thead>
					<tr className="text-xs border-b-2 border-navy/10 dark:border-cream/10">
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Document Name
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Category
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Subject
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Type
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Uploaded By
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Year
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Uploaded On
						</th>
						<th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
							Download
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((note) => (
						<tr key={note.id} className=" text-xs">
							<td className="px-4 py-3">
								<Link
									href={getDocumentUrl(note.file_name) ?? "#"}
									prefetch={false}
									target="_blank"
									rel="noopener noreferrer"
									className="text-amber hover:text-amber-light hover:underline"
								>
									{note.document_name.length > 60
										? `${note.document_name.substring(0, 60)}...`
										: note.document_name}
								</Link>
							</td>
							<td className="px-4 py-3 text-navy/80 dark:text-cream/80">
								{note.doc_category?.name ?? "—"}
							</td>
							<td className="px-4 py-3 text-navy/80 dark:text-cream/80">
								{note.doc_subject?.name ?? "—"}
							</td>
							<td className="px-4 py-3 text-navy/80 dark:text-cream/80">
								{note.doc_type?.name ?? "—"}
							</td>
							<td className="px-4 py-3 text-navy/80 dark:text-cream/80">
								{note.account?.username ?? "—"}
							</td>
							<td className="px-4 py-3 text-navy/80 dark:text-cream/80">{note.year || "—"}</td>
							<td className="px-4 py-3 text-navy/80 dark:text-cream/80">
								{formatDate(note.uploaded_on)}
							</td>
							<td className="px-4 py-3 flex">
								<a
									href={getDownloadUrl(note.id)}
									aria-label={`Download ${note.document_name}`}
									className="inline-flex items-center justify-center p-2 rounded-md hover:bg-cream-dark dark:hover:bg-navy/40"
								>
									<CustomDownloadIcon className="size-5 fill-navy dark:fill-cream" />
								</a>
								{renderAdminActions?.(note)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
