"use client";
import type { Note } from "../../types";
import { Button } from "@shared/ui/components";
import { downloadNote } from "../../actions";

interface LibraryTableProps {
	items: Note[];
}

export function LibraryTable({ items }: LibraryTableProps) {
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const handleDownload = async (note: Note) => {
		const result = await downloadNote(note);
		if (result.ok && result.data) {
			const { data: base64Data, filename } = result.data;

			// Convert base64 back to binary
			const binaryString = atob(base64Data);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}

			// Create blob and download
			const blob = new Blob([bytes]);
			const blobUrl = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = filename; // Use the preserved filename
			link.click();
			URL.revokeObjectURL(blobUrl);
		}
	};

	const getDocumentUrl = (fileName: string) => {
		// TODO: Replace with actual CloudFront URL from environment
		return `#${fileName}`;
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
				<thead>
					<tr className="bg-gray-50 dark:bg-gray-800">
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Document Name
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Category
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Subject
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Type
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Uploaded By
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Year
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Uploaded On
						</th>
						<th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
							Download
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((note) => (
						<tr key={note.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
								<a
									href={getDocumentUrl(note.file_name)}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 dark:text-blue-400 hover:underline"
								>
									{note.document_name.length > 40
										? `${note.document_name.substring(0, 40)}...`
										: note.document_name}
								</a>
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.doc_category?.name || "—"}
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.doc_subject?.name || "—"}
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.doc_type?.name || "—"}
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.account?.username || "—"}
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100">
								{note.year || "—"}
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100">
								{formatDate(note.uploaded_on)}
							</td>
							<td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
								<Button
									variant="outline"
									onClick={() => handleDownload(note)}
									className="text-xs px-2 py-1"
								>
									Download
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
