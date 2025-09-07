"use client";
import { Button, Card, Text, Title } from "@shared/ui/components";
import { downloadNote } from "../../actions";
import Link from "next/link";
import type { Note } from "../../types";
import type { LibraryCardProps } from "./types";

export function LibraryCard({ item }: LibraryCardProps) {
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		return new Date(dateString).toLocaleDateString("en-SG", options);
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
		const cdnUrl = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL;
		if (!cdnUrl) return undefined;
		return `${cdnUrl}/${fileName}`;
	};

	return (
		<Card className="flex flex-col p-4 gap-3">
			{/* Document Name */}
			<div>
				<Title order={6} className="mb-1">
					Document Name
				</Title>
				<Link
					href={getDocumentUrl(item.file_name) ?? "#"}
					prefetch={false}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
				>
					{item.document_name.length > 80
						? `${item.document_name.substring(0, 80)}...`
						: item.document_name}
				</Link>
			</div>

			{/* Document Details Grid */}
			<div className="grid grid-cols-2 max-[300px]:grid-cols-1 gap-3">
				<div>
					<Text description className="text-xs mb-1">
						Category
					</Text>
					<Text className="text-sm">{item.doc_category?.name ?? "—"}</Text>
				</div>
				<div>
					<Text description className="text-xs mb-1">
						Subject
					</Text>
					<Text className="text-sm">{item.doc_subject?.name ?? "—"}</Text>
				</div>
				<div>
					<Text description className="text-xs mb-1">
						Type
					</Text>
					<Text className="text-sm">{item.doc_type?.name ?? "—"}</Text>
				</div>
				<div>
					<Text description className="text-xs mb-1">
						Year
					</Text>
					<Text className="text-sm">{item.year || "—"}</Text>
				</div>
				<div>
					<Text description className="text-xs mb-1">
						Uploaded By
					</Text>
					<Text className="text-sm">{item.account?.username ?? "—"}</Text>
				</div>
				<div>
					<Text description className="text-xs mb-1">
						Uploaded On
					</Text>
					<Text className="text-sm">{formatDate(item.uploaded_on)}</Text>
				</div>
			</div>

			{/* Download Button */}
			<div className="pt-2 mt-auto">
				<Button variant="outline" onClick={() => handleDownload(item)} className="w-full text-sm">
					Download
				</Button>
			</div>
		</Card>
	);
}
