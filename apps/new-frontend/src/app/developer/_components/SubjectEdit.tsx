"use client";
import { Modal, Text, Input, Combobox, Button } from "@shared/ui/components";
import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreateSubjectSchema, type EditSubjectFormData } from "./schemas";
import type { SubjectEditProps } from "./types";
import type { LibraryAPIResponse } from "@/app/library/types";
import { createSubject, updateSubject } from "../actions";

export function SubjectEdit({ render, subject, categories }: Readonly<SubjectEditProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const isEditMode = !!subject;

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditSubjectFormData>({
		resolver: zodResolver(CreateSubjectSchema),
		defaultValues: {
			name: subject?.name || "",
			category_id: subject?.category.id || categories[0]?.id || 0,
		},
	});

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const onSubmit = async (formData: EditSubjectFormData) => {
		startTransition(async () => {
			try {
				let result: LibraryAPIResponse<void>;
				if (isEditMode) {
					result = await updateSubject(subject?.id, formData);
				} else {
					result = await createSubject(formData);
				}

				if (!result.ok) {
					toast.error(result.err || "An error occurred");
					return;
				}

				toast.success(`Subject ${isEditMode ? "updated" : "created"} successfully`);
				setIsOpen(false);
				router.refresh();
			} catch {
				toast.error(`Failed to ${isEditMode ? "update" : "create"} subject`);
			}
		});
	};

	return (
		<>
			{render({ toggleOpen })}
			<Modal open={isOpen} onClose={() => setIsOpen(false)} className="p-6 max-w-md">
				<div className="space-y-6">
					<div>
						<Text className="text-xl font-semibold mb-2">
							{isEditMode ? "Edit Subject" : "Add Subject"}
						</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{isEditMode
								? "Update the subject information below."
								: "Enter the subject information below."}
						</Text>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Input
							label="Subject Name"
							placeholder="eg. H2 Mathematics"
							containerClassName="w-full"
							error={errors.name?.message}
							{...register("name")}
						/>

						<Controller
							name="category_id"
							control={control}
							render={({ field, fieldState: { error } }) => {
								const selectedCategory = categories.find((cat) => cat.id === field.value);
								return (
									<Combobox
										label="Category"
										placeholder="eg. A Levels"
										items={categories}
										defaultValue={selectedCategory}
										onValueChange={(newValue) => {
											field.onChange(newValue?.id ?? 0);
										}}
										containerClassName="w-full"
										error={error?.message}
									/>
								);
							}}
						/>

						<div className="flex justify-end gap-3 pt-4">
							<Button
								type="button"
								variant="ghost"
								onClick={() => setIsOpen(false)}
								disabled={isPending}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isPending}>
								{isPending
									? isEditMode
										? "Updating..."
										: "Creating..."
									: isEditMode
										? "Update Subject"
										: "Create Subject"}
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
