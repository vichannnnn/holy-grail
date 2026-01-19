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
					<tr className="text-xs border-b-2 border-gray-200 dark:border-slate-700">
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Document Name
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Category
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Subject
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Type
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Uploaded By
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Year
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Uploaded On
						</th>
						<th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
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
									className="text-blue-600 dark:text-blue-400 hover:underline"
								>
									{note.document_name.length > 60
										? `${note.document_name.substring(0, 60)}...`
										: note.document_name}
								</Link>
							</td>
							<td className="px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.doc_category?.name ?? "—"}
							</td>
							<td className="px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.doc_subject?.name ?? "—"}
							</td>
							<td className="px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.doc_type?.name ?? "—"}
							</td>
							<td className="px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.account?.username ?? "—"}
							</td>
							<td className="px-4 py-3 text-gray-900 dark:text-gray-100">{note.year || "—"}</td>
							<td className="px-4 py-3 text-gray-900 dark:text-gray-100">
								{formatDate(note.uploaded_on)}
							</td>
							<td className="px-4 py-3 flex">
								<a
									href={getDownloadUrl(note.id)}
									aria-label={`Download ${note.document_name}`}
									className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									<CustomDownloadIcon className="size-5 fill-gray-700 dark:fill-gray-300" />
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
