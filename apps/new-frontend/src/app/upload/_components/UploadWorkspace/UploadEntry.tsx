"use client";
import {
	Accordion,
	Modal,
	Button,
	Title,
	Text,
	Dropdown,
	Input,
	Combobox,
} from "@shared/ui/components";
import type { UploadEntryProps } from "./types";
import { fetchAllSubjects } from "@/app/library/actions";
import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import type { SubjectType } from "@/app/library/types";

export function UploadEntry({ file, onDelete, categories, documentTypes }: UploadEntryProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [subjects, setSubjects] = useState<SubjectType[]>([]);

	// hack: force re-render of subject combobox when category changes
	const [categoryKey, setCategoryKey] = useState(0);

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

	// fetch subjects when category changes
	const fetchSubjects = async (categoryId: number) => {
		const subjects = await fetchAllSubjects(categoryId);
		if (subjects.ok && subjects.data) {
			setSubjects(subjects.data);
		}
	};

	return (
		<>
			<div className="relative mb-2">
				<Accordion
					defaultOpen
					label={file.name}
					className="mb-0"
					iconClassName="size-8 p-1 transition-none rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-gray-200 dark:hover:bg-zinc-700 focus-visible:ring-blue-500"
				>
					<div className="flex flex-col items-center gap-2">
						<Input
							label="Document Name"
							defaultValue={file.name}
							placeholder={`eg. ${file.name}`}
							containerClassName="w-full"
						/>
						<div className="flex flex-col sm:flex-row gap-4 w-full">
							<Combobox
								label="Category"
								placeholder="eg. A Levels"
								items={categories}
								onValueChange={(newValue) => {
									// Force re-render of subject combobox by changing key
									setCategoryKey((prev) => prev + 1);
									if (newValue && newValue.id) {
										fetchSubjects(Number(newValue.id));
									} else {
										setSubjects([]);
									}
								}}
								containerClassName="w-full"
							/>
							<Combobox
								key={categoryKey}
								label="Subject"
								placeholder="eg. H2 Math"
								items={subjects}
								onValueChange={(newValue) => {
									console.log(newValue);
									// do nothing for now
								}}
								disabled={subjects.length === 0}
								containerClassName="w-full"
							/>
							<Combobox
								label="Document Type"
								placeholder="eg. Exam Papers"
								items={documentTypes}
								onValueChange={(newValue) => {
									// do nothing
								}}
								containerClassName="w-full"
							/>
						</div>
					</div>
				</Accordion>
				<div className="absolute top-3 right-12 z-10">
					<Dropdown
						onClick={(e) => e.stopPropagation()}
						header={
							<AdjustmentsHorizontalIcon className="size-8 stroke-2 p-1 stroke-gray-700 dark:stroke-gray-300 cursor-pointer" />
						}
						content={[
							<div
								role="button"
								className="block w-full px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-zinc-600 text-left"
								id="delete-file"
								onClick={handleDeleteClick}
							>
								Delete this field
							</div>,
							<div
								role="button"
								className="block w-full px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-zinc-600 text-left"
								id="mirror-properties"
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								Mirror properties to other entries
							</div>,
						]}
					/>
				</div>
			</div>
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
