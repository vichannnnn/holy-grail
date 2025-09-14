"use client";
import { Modal, Text, Button } from "@shared/ui/components";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AdminApproveProps } from "./types";
import { approveNote } from "./actions";
import toast from "react-hot-toast";

export function AdminApprove({ render, note }: AdminApproveProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const handleApprove = () => {
		startTransition(async () => {
			try {
				const result = await approveNote(note.id);

				if (result.ok) {
					toast.success(result.message);
					setIsOpen(false);
					router.refresh();
				} else {
					toast.error(result.message);
				}
			} catch {
				toast.error("An unexpected error occurred");
			}
		});
	};

	return (
		<>
			{render({ toggleOpen })}
			<Modal open={isOpen} onClose={() => setIsOpen(false)} className="p-6 max-w-md">
				<div className="space-y-6">
					<div>
						<Text className="text-xl font-semibold mb-2 text-green-600">Approve Note</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							Are you sure you want to approve this note? Once approved, it will be visible to all
							users.
						</Text>
					</div>

					<div>
						<Text className="font-medium mb-1">Document Name:</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">{note.document_name}</Text>

						<Text className="font-medium mb-1 mt-3">Category:</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{note.doc_category.name}
						</Text>

						<Text className="font-medium mb-1 mt-3">Subject:</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{note.doc_subject.name}
						</Text>

						<Text className="font-medium mb-1 mt-3">Uploaded by:</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{note.account.username}
						</Text>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setIsOpen(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button
							type="button"
							className="bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus-visible:ring-green-400"
							onClick={handleApprove}
							disabled={isPending}
						>
							{isPending ? "Approving..." : "Approve Note"}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
