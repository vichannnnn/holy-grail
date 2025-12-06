"use client";
import { Accordion, Dropdown, Input, Combobox, Text } from "@shared/ui/components";
import type { UploadEntryProps } from "./types";
import { fetchAllSubjects } from "@/app/library/actions";
import { useState, useEffect } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import type { SubjectType } from "@/app/library/types";
import { Controller, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { MAPPED_YEAR_RANGE } from "@lib/features/AdminEdit/constants";
import { NameInfoButton } from "./NameInfoButton";

/**
 * Renders a collapsible upload entry for a single file, exposing editable metadata controls and entry-level actions.
 *
 * Displays inputs for document name, category, subject, document type, and year; fetches subjects when the category changes;
 * provides a dropdown to mirror this entry's category/subject/type/year to other entries and to delete the entry with confirmation.
 *
 * @param file - The file metadata to display for this entry (used for label and hidden file field)
 * @param index - The zero-based index of this entry within the form's notes array
 * @param control - react-hook-form control object used to register and watch form fields for this entry
 * @param setValue - react-hook-form setter function used to update other entries when mirroring properties
 * @param onDelete - Callback invoked with the file name when the user confirms deletion of this entry
 * @param categories - Available category options for the Category combobox
 * @param documentTypes - Available document type options for the Document Type combobox
 * @param errors - Validation errors for the form; used to display file-related validation messages for this entry
 * @param totalEntries - Total number of entries in the form (used to enable/disable mirroring)
 *
 * @returns The JSX element representing the upload entry UI
 */
export function UploadEntry({
	file,
	index,
	control,
	setValue,
	onDelete,
	categories,
	documentTypes,
	errors,
	totalEntries,
}: Readonly<UploadEntryProps>) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [subjects, setSubjects] = useState<SubjectType[]>([]);

	// Watch current entry values for mirroring
	const currentValues = useWatch({
		control,
		name: `notes.${index}`,
	});

	// Watch category changes to fetch subjects
	const currentCategory = useWatch({
		control,
		name: `notes.${index}.category`,
	});

	// fetch subjects when category changes
	const fetchSubjects = async (categoryId: number) => {
		const subjects = await fetchAllSubjects(categoryId);
		if (subjects.ok && subjects.data) {
			setSubjects(subjects.data);
		}
	};

	// Fetch subjects when category changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: fetchSubjects changes on every render
	useEffect(() => {
		if (currentCategory && currentCategory > 0) {
			fetchSubjects(currentCategory);
		} else {
			setSubjects([]);
		}
	}, [currentCategory]);

	// Mirror current entry's properties to all other entries
	const handleMirrorProperties = () => {
		if (!currentValues || totalEntries <= 1) {
			toast.error("Cannot mirror properties - need at least 2 entries");
			return;
		}

		const { category, subject, type, year } = currentValues;

		if (!category || !subject || !type) {
			toast.error("Please fill in all fields before mirroring");
			return;
		}

		// Update all other entries with the current entry's values
		for (let i = 0; i < totalEntries; i++) {
			if (i !== index) {
				setValue(`notes.${i}.category`, category);
				setValue(`notes.${i}.subject`, subject);
				setValue(`notes.${i}.type`, type);
				if (year) {
					setValue(`notes.${i}.year`, year);
				}
			}
		}

		const entriesUpdated = totalEntries - 1;
		toast.success(
			`Properties mirrored to ${entriesUpdated} other entr${entriesUpdated === 1 ? "y" : "ies"}!`,
		);
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
						{/* Display file validation errors */}
						{errors?.file && (
							<div className="w-full">
								<Text className="!text-red-500 text-xs">
									File validation error: {errors.file.message}
								</Text>
							</div>
						)}
						<Controller
							name={`notes.${index}.name`}
							control={control}
							render={({ field, fieldState: { error } }) => (
								<Input
									label="Document Name"
									placeholder={`eg. ${file.name}`}
									containerClassName="w-full"
									error={error?.message}
                                    infoButton={<NameInfoButton/>}
									{...field}
								/>
							)}
						/>
						{/* Hidden controller for the file */}
						<Controller
							name={`notes.${index}.file`}
							control={control}
							defaultValue={file}
							render={() => <></>}
						/>

						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
							<Controller
								name={`notes.${index}.category`}
								control={control}
								defaultValue={0}
								render={({ field, fieldState: { error } }) => {
									const selectedCategory =
										categories.find((cat) => cat.id === field.value) || undefined;
									return (
										<Combobox
											key={`category-${index}-${field.value}`}
											label="Category"
											placeholder="eg. A Levels"
											items={categories}
											defaultValue={selectedCategory}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || 0);
												// Reset subject when category changes
												setValue(`notes.${index}.subject`, 0);
												if (newValue?.id) {
													fetchSubjects(Number(newValue.id));
												} else {
													setSubjects([]);
												}
											}}
											containerClassName="w-full"
											error={error?.message}
										/>
									);
								}}
							/>
							<Controller
								name={`notes.${index}.subject`}
								control={control}
								defaultValue={0}
								render={({ field, fieldState: { error } }) => {
									const selectedSubject =
										subjects.find((subj) => subj.id === field.value) || undefined;
									return (
										<Combobox
											key={`subject-${currentCategory}-${index}-${field.value}-${subjects.map((s) => s.id).join(",")}`}
											label="Subject"
											placeholder="eg. H2 Math"
											items={subjects}
											defaultValue={selectedSubject}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || 0);
											}}
											disabled={subjects.length === 0}
											containerClassName="w-full"
											error={error?.message}
										/>
									);
								}}
							/>

							<Controller
								name={`notes.${index}.type`}
								control={control}
								defaultValue={0}
								render={({ field, fieldState: { error } }) => {
									const selectedDocumentType =
										documentTypes.find((type) => type.id === field.value) || undefined;
									return (
										<Combobox
											key={`type-${index}-${field.value}`}
											label="Document Type"
											placeholder="eg. Exam Papers"
											items={documentTypes}
											defaultValue={selectedDocumentType}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || 0);
											}}
											containerClassName="w-full"
											error={error?.message}
										/>
									);
								}}
							/>
							<Controller
								name={`notes.${index}.year`}
								control={control}
								render={({ field, fieldState: { error } }) => {
									const selectedYear = field.value
										? { id: field.value, name: String(field.value) }
										: undefined;
									return (
										<Combobox
											key={`year-${index}-${field.value}`}
											label="Year"
											placeholder={`eg. ${new Date().getFullYear()} (optional)`}
											items={MAPPED_YEAR_RANGE}
											defaultValue={selectedYear}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || undefined);
											}}
											containerClassName="w-full"
											error={error?.message}
										/>
									);
								}}
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
							<button
								type="button"
								className={twMerge(
									"block w-full px-2 py-1 rounded-sm text-left",
									totalEntries > 1 &&
										currentValues?.category &&
										currentValues?.subject &&
										currentValues?.type
										? "hover:bg-gray-200 dark:hover:bg-zinc-600 cursor-pointer"
										: "opacity-50 cursor-not-allowed",
								)}
								key="mirror-properties"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleMirrorProperties();
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										e.stopPropagation();
										handleMirrorProperties();
									}
								}}
							>
								Mirror properties to other entries
							</button>,
							<button
								type="button"
								className="block w-full px-2 py-1 rounded-sm hover:bg-red-100 dark:hover:bg-red-900/30 text-left text-red-600 dark:text-red-400"
								key="delete-file"
								onClick={(e) => {
									e.stopPropagation();
									setShowDeleteModal(true);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										e.stopPropagation();
										setShowDeleteModal(true);
									}
								}}
							>
								Delete this entry
							</button>,
						]}
					/>
				</div>
			</div>
			<DeleteConfirmModal
				isOpen={showDeleteModal}
				fileName={file.name}
				onConfirm={() => {
					onDelete(file.name);
					setShowDeleteModal(false);
				}}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</>
	);
}