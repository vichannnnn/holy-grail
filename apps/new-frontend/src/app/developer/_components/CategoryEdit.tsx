"use client";
import { Modal, Text, Input, Button } from "@shared/ui/components";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EditCategorySchema, type EditCategoryFormData } from "./schemas";
import type { CategoryEditProps } from "./types";
import { createCategory, updateCategory } from "../actions";
import type { LibraryAPIResponse } from "@/app/library/types";

export function CategoryEdit({ render, category }: Readonly<CategoryEditProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const isEditMode = !!category;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditCategoryFormData>({
		resolver: zodResolver(EditCategorySchema),
		defaultValues: {
			name: category?.name || "",
		},
	});

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const onSubmit = async (formData: EditCategoryFormData) => {
		startTransition(async () => {
			try {
				let result: LibraryAPIResponse<void>;
				if (isEditMode) {
					result = await updateCategory(category?.id, formData);
				} else {
					result = await createCategory(formData);
				}

				if (!result.ok) {
					toast.error(result.err || "An error occurred");
					return;
				}

				toast.success(`Category ${isEditMode ? "updated" : "created"} successfully`);
				setIsOpen(false);
				router.refresh();
			} catch {
				toast.error(`Failed to ${isEditMode ? "update" : "create"} category`);
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
							{isEditMode ? "Edit Category" : "Add Category"}
						</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{isEditMode ? "Update the category name below." : "Enter the category name below."}
						</Text>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Input
							label="Category Name"
							placeholder="eg. A Levels"
							containerClassName="w-full"
							error={errors.name?.message}
							{...register("name")}
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
										? "Update Category"
										: "Create Category"}
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
