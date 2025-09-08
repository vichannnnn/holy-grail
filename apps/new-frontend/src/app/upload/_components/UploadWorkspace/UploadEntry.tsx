"use client";
import { Accordion, Modal, Button, Title, Text } from "@shared/ui/components";
import type { UploadEntryProps } from "./types";
import { fetchAllSubjects } from "@/app/library/actions";
import { useState } from "react";

export function UploadEntry({ file, onDelete, categories, documentTypes }: UploadEntryProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDeleteClick = () => {
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		onDelete(file.name);
		setShowDeleteModal(false);
	};

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
	};

	return (
		<>
			<Accordion label={file.name} className="mb-2">
				<div className="flex justify-between items-center">
					<span className="text-gray-500">File details coming soon...</span>
					<button
						onClick={handleDeleteClick}
						className="text-red-500 hover:text-red-700 px-3 py-1 rounded text-sm"
					>
						Delete
					</button>
				</div>
			</Accordion>
			<Modal onClose={handleCancelDelete} open={showDeleteModal}>
				<Title order={3} className="mb-4">
					Confirm Delete
				</Title>
				<Text className="text-gray-600 dark:text-gray-400 mb-6">
					Are you sure you want to delete <span className="font-semibold">{file.name}</span>? This
					action cannot be undone.
				</Text>
				<div className="flex justify-end gap-3">
					<Button onClick={handleCancelDelete} variant="ghost">
						Cancel
					</Button>
					<Button
						onClick={handleConfirmDelete}
						variant="solid"
						className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
					>
						Delete
					</Button>
				</div>
			</Modal>
		</>
	);
}
