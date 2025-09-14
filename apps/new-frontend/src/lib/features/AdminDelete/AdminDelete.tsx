"use client";
import { Modal, Text, Button } from "@shared/ui/components";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AdminDeleteProps } from "./types";
import { deleteNote } from "./actions";
import toast from "react-hot-toast";

export function AdminDelete({ render, note }: AdminDeleteProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const handleDelete = () => {
		startTransition(async () => {
			try {
				const result = await deleteNote(note.id);

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
						<Text className="text-xl font-semibold mb-2 text-red-600">Delete Note</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							Are you sure you want to delete this note? This action cannot be undone.
						</Text>
					</div>

					<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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
							className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus-visible:ring-red-400"
							onClick={handleDelete}
							disabled={isPending}
						>
							{isPending ? "Deleting..." : "Delete Note"}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
