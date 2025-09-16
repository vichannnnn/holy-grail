"use client";
import { Modal, Text, Input, Combobox, Button } from "@shared/ui/components";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AdminEditProps } from "./types";
import { updateNote } from "./actions";
import { useInitialFormData, useSubjects, useFormSubmission } from "./utils";
import { UpdateNoteSchema, type UpdateNoteFormData } from "./schemas";
import toast from "react-hot-toast";
import { MAPPED_YEAR_RANGE } from "./constants";

export function AdminEdit({ render, note }: Readonly<AdminEditProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	// Custom hooks for data management
	const {
		categories,
		documentTypes,
		isPending: isPendingInitialData,
		fetchData,
	} = useInitialFormData();
	const { subjects, isPending: isPendingSubjects, fetchSubjects } = useSubjects();
	const { isSubmitting, withSubmission } = useFormSubmission();

	const { control, handleSubmit, setValue, watch } = useForm<UpdateNoteFormData>({
		resolver: zodResolver(UpdateNoteSchema),
		defaultValues: {
			document_name: note.document_name,
			category: note.category,
			subject: note.subject,
			type: note.type,
			year: note.year ?? undefined,
		},
	});

	const currentCategory = watch("category");

	const toggleOpen = () => setIsOpen((prev) => !prev);

	// Fetch initial data when modal opens
	// biome-ignore lint/correctness/useExhaustiveDependencies: Adding fetchSubjects and fetchData would cause infinite loops
	useEffect(() => {
		if (isOpen) {
			fetchData();
			// Fetch subjects for current category
			if (note.category > 0) {
				fetchSubjects(note.category);
			}
		}
		// biome-ignore lint/correctness/useExhaustiveDependencies: Adding function dependencies would cause infinite loops
	}, [isOpen, note.category]);

	// Fetch subjects when category changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: Adding fetchSubjects would cause infinite loops
	useEffect(() => {
		if (currentCategory && currentCategory > 0) {
			fetchSubjects(currentCategory);
		}
	}, [currentCategory]);

	const onSubmit = async (formData: UpdateNoteFormData) => {
		await withSubmission(async () => {
			const result = await updateNote(note.id, formData);

			if (result.ok) {
				toast.success(result.message);
				setIsOpen(false);
				router.refresh();
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
			<Modal open={isOpen} onClose={() => setIsOpen(false)} className="p-6 max-w-4xl">
				<div className="space-y-6">
					<div>
						<Text className="text-xl font-semibold mb-2">Edit Note</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							Update the note information below.
						</Text>
					</div>

					{isPendingInitialData ? (
						<div className="flex items-center justify-center py-8">
							<Text className="text-sm text-gray-500">Loading form data...</Text>
						</div>
					) : (
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<Controller
								name="document_name"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Input
										label="Document Name"
										placeholder="eg. 2023 H2 Mathematics Paper 1"
										containerClassName="w-full"
										error={error?.message}
										{...field}
									/>
								)}
							/>

							<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
								<Controller
									name="category"
									control={control}
									render={({ field, fieldState: { error } }) => {
										const selectedCategory = categories.find((cat) => cat.id === field.value);
										return (
											<Combobox
												key={`category-${categories.length}-${field.value}`}
												label="Category"
												placeholder="eg. A Levels"
												items={categories}
												defaultValue={selectedCategory}
												onValueChange={(newValue) => {
													field.onChange(newValue?.id ?? 0);
													setValue("subject", 0); // Reset subject when category changes
												}}
												containerClassName="w-full"
												error={error?.message}
											/>
										);
									}}
								/>

								<Controller
									name="subject"
									control={control}
									render={({ field, fieldState: { error } }) => {
										const selectedSubject = subjects.find((subj) => subj.id === field.value);
										const isSubjectsDisabled =
											!currentCategory ||
											currentCategory === 0 ||
											isPendingSubjects ||
											subjects.length === 0;

										const getSubjectsPlaceholder = () => {
											if (isPendingSubjects) return "Loading subjects...";
											if (!currentCategory || currentCategory === 0)
												return "Select a category first";
											if (subjects.length === 0) return "No subjects available";
											return "eg. H2 Math";
										};

										return (
											<Combobox
												key={`subject-${subjects.length}-${field.value}-${currentCategory}`}
												label="Subject"
												placeholder={getSubjectsPlaceholder()}
												items={subjects}
												defaultValue={selectedSubject}
												onValueChange={(newValue) => {
													field.onChange(newValue?.id ?? 0);
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
									render={({ field, fieldState: { error } }) => {
										const selectedDocumentType = documentTypes.find(
											(type) => type.id === field.value,
										);
										return (
											<Combobox
												key={`type-${documentTypes.length}-${field.value}`}
												label="Document Type"
												placeholder="eg. Exam Papers"
												items={documentTypes}
												defaultValue={selectedDocumentType}
												onValueChange={(newValue) => {
													field.onChange(newValue?.id ?? 0);
												}}
												containerClassName="w-full"
												error={error?.message}
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
													field.onChange(newValue?.id ?? undefined);
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
					)}
				</div>
			</Modal>
		</>
	);
}
