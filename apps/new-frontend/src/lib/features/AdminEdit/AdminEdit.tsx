"use client";
import { Modal, Text, Input, Combobox, Button } from "@shared/ui/components";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { AdminEditProps } from "./types";
import { updateNote, type UpdateNoteData } from "./actions";
import { useInitialFormData, useSubjects, useFormSubmission } from "./utils";
import toast from "react-hot-toast";
import { MAPPED_YEAR_RANGE } from "./constants";

interface FormData {
	document_name: string;
	category: number;
	subject: number;
	type: number;
	year?: number;
}

export function AdminEdit({ render, note }: AdminEditProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Custom hooks for data management
	const {
		categories,
		documentTypes,
		isPending: isPendingInitialData,
		fetchData,
	} = useInitialFormData();
	const { subjects, isPending: isPendingSubjects, fetchSubjects } = useSubjects();
	const { isSubmitting, withSubmission } = useFormSubmission();

	const { control, handleSubmit, setValue, watch } = useForm<FormData>({
		defaultValues: {
			document_name: note.document_name,
			category: note.category,
			subject: note.subject,
			type: note.type,
			year: note.year || undefined,
		},
	});

	const currentCategory = watch("category");

	const toggleOpen = () => setIsOpen((prev) => !prev);

	// Fetch initial data when modal opens
	useEffect(() => {
		if (isOpen) {
			fetchData();
			// Fetch subjects for current category
			if (note.category > 0) {
				fetchSubjects(note.category);
			}
		}
	}, [isOpen, note.category]); // Remove function dependencies

	// Fetch subjects when category changes
	useEffect(() => {
		if (currentCategory && currentCategory > 0) {
			fetchSubjects(currentCategory);
		}
	}, [currentCategory]); // Remove function dependency

	const onSubmit = async (formData: FormData) => {
		await withSubmission(async () => {
			const updateData: UpdateNoteData = {
				document_name: formData.document_name,
				category: formData.category,
				subject: formData.subject,
				type: formData.type,
				year: formData.year,
			};

			const result = await updateNote(note.id, updateData);

			if (result.ok) {
				toast.success(result.message);
				setIsOpen(false);
			} else {
				toast.error(result.message);
			}
		}).catch(() => {
			toast.error("An unexpected error occurred");
		});
	};

	return (
		<>
			{render({ toggleOpen })}
			<Modal open={isOpen} onClose={() => setIsOpen(false)} className="p-6 max-w-2xl">
				<div className="space-y-6">
					<div>
						<Text className="text-xl font-semibold mb-2">Edit Note</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							Update the note information below
						</Text>
					</div>

					{isPendingInitialData && (
						<div className="flex items-center justify-center py-8">
							<Text className="text-sm text-gray-500">Loading form data...</Text>
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Controller
							name="document_name"
							control={control}
							rules={{ required: "Document name is required" }}
							render={({ field, fieldState: { error } }) => (
								<Input
									label="Document Name"
									placeholder="eg. 2023 H2 Mathematics Paper 1"
									containerClassName="w-full"
									error={error?.message}
									disabled={isPendingInitialData}
									{...field}
								/>
							)}
						/>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Controller
								name="category"
								control={control}
								rules={{
									required: "Category is required",
									min: { value: 1, message: "Please select a category" },
								}}
								render={({ field, fieldState: { error } }) => {
									const selectedCategory =
										categories.find((cat) => cat.id === field.value) || undefined;
									return (
										<Combobox
											key={`category-${categories.length}-${field.value}`}
											label="Category"
											placeholder={isPendingInitialData ? "Loading categories..." : "eg. A Levels"}
											items={categories}
											defaultValue={selectedCategory}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || 0);
												setValue("subject", 0); // Reset subject when category changes
											}}
											containerClassName="w-full"
											error={error?.message}
											disabled={isPendingInitialData}
										/>
									);
								}}
							/>

							<Controller
								name="subject"
								control={control}
								rules={{
									required: "Subject is required",
									min: { value: 1, message: "Please select a subject" },
								}}
								render={({ field, fieldState: { error } }) => {
									const selectedSubject =
										subjects.find((subj) => subj.id === field.value) || undefined;
									const isSubjectsDisabled =
										isPendingInitialData || isPendingSubjects || subjects.length === 0;
									const subjectsPlaceholder = isPendingSubjects
										? "Loading subjects..."
										: isPendingInitialData
											? "Loading..."
											: subjects.length === 0
												? "Select a category first"
												: "eg. H2 Math";
									return (
										<Combobox
											key={`subject-${subjects.length}-${field.value}-${currentCategory}`}
											label="Subject"
											placeholder={subjectsPlaceholder}
											items={subjects}
											defaultValue={selectedSubject}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || 0);
											}}
											disabled={isSubjectsDisabled}
											containerClassName="w-full"
											error={error?.message}
										/>
									);
								}}
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Controller
								name="type"
								control={control}
								rules={{
									required: "Document type is required",
									min: { value: 1, message: "Please select a document type" },
								}}
								render={({ field, fieldState: { error } }) => {
									const selectedDocumentType =
										documentTypes.find((type) => type.id === field.value) || undefined;
									return (
										<Combobox
											key={`type-${documentTypes.length}-${field.value}`}
											label="Document Type"
											placeholder={
												isPendingInitialData ? "Loading document types..." : "eg. Exam Papers"
											}
											items={documentTypes}
											defaultValue={selectedDocumentType}
											onValueChange={(newValue) => {
												field.onChange(newValue?.id || 0);
											}}
											containerClassName="w-full"
											error={error?.message}
											disabled={isPendingInitialData}
										/>
									);
								}}
							/>

							<Controller
								name="year"
								control={control}
								render={({ field, fieldState: { error } }) => {
									const selectedYear = field.value
										? { id: field.value, name: String(field.value) }
										: undefined;
									return (
										<Combobox
											key={`year-${field.value}`}
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

						<div className="flex justify-end gap-3 pt-4">
							<Button
								type="button"
								variant="ghost"
								onClick={() => setIsOpen(false)}
								disabled={isSubmitting}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Updating..." : "Update Note"}
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
