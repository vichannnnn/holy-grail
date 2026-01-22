"use client";
import { Card, Text, Title } from "@shared/ui/components";
import Link from "next/link";
import type { LibraryCardProps } from "./types";

export function LibraryCard({ item, renderAdminActions }: Readonly<LibraryCardProps>) {
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
					{item.document_name.length > 160
						? `${item.document_name.substring(0, 160)}...`
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
				<a
					href={getDownloadUrl(item.id)}
					className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-inset transition-all duration-150 cursor-pointer border border-pink-300 text-pink-600 hover:bg-pink-100 focus-visible:ring-pink-500 dark:bg-transparent dark:border-pink-400/50 dark:text-pink-300 dark:hover:bg-pink-500/10 dark:focus-visible:ring-pink-400 hover:scale-[1.02] active:scale-[0.98] w-full"
				>
					Download
				</a>
				{renderAdminActions?.()}
			</div>
		</Card>
	);
}
