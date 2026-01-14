"use client";
import { Modal, Button, Title, Text } from "@shared/ui/components";
import type { DeleteConfirmModalProps } from "./types";

export function DeleteConfirmModal({
	isOpen,
	fileName,
	onConfirm,
	onCancel,
}: Readonly<DeleteConfirmModalProps>) {
	return (
		<Modal onClose={onCancel} open={isOpen}>
			<Title order={3} className="mb-4">
				Confirm Delete
			</Title>
			<Text className="text-gray-600 dark:text-gray-400 mb-6">
				Are you sure you want to delete <span className="font-semibold">{fileName}</span>? This
				action cannot be undone.
			</Text>
			<div className="flex justify-end gap-3">
				<Button onClick={onCancel} variant="ghost">
					Cancel
				</Button>
				<Button
					onClick={onConfirm}
					variant="solid"
					className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
				>
					Delete
				</Button>
			</div>
		</Modal>
	);
}
