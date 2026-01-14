"use client";
import { Modal, Text, Input, Button } from "@shared/ui/components";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EditDocumentTypeSchema, type EditDocumentTypeFormData } from "./schemas";
import type { DocumentTypeEditProps } from "./types";
import { createDocumentType, updateDocumentType } from "../actions";
import type { LibraryAPIResponse } from "@/app/library/types";

export function DocumentTypeEdit({ render, documentType }: Readonly<DocumentTypeEditProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const isEditMode = !!documentType;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditDocumentTypeFormData>({
		resolver: zodResolver(EditDocumentTypeSchema),
		defaultValues: {
			name: documentType?.name || "",
		},
	});

	const getButtonText = () => {
		if (isPending) {
			return isEditMode ? "Updating..." : "Creating...";
		}
		return isEditMode ? "Update Document Type" : "Create Document Type";
	};

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const onSubmit = async (formData: EditDocumentTypeFormData) => {
		startTransition(async () => {
			try {
				let result: LibraryAPIResponse<void>;
				if (isEditMode) {
					result = await updateDocumentType(documentType?.id, formData);
				} else {
					result = await createDocumentType(formData);
				}

				if (!result.ok) {
					toast.error(result.err || "An error occurred");
					return;
				}

				toast.success(`Document type ${isEditMode ? "updated" : "created"} successfully`);
				setIsOpen(false);
				router.refresh();
			} catch {
				toast.error(`Failed to ${isEditMode ? "update" : "create"} document type`);
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
							{isEditMode ? "Edit Document Type" : "Add Document Type"}
						</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{isEditMode
								? "Update the document type name below."
								: "Enter the document type name below."}
						</Text>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Input
							label="Document Type Name"
							placeholder="eg. Exam Papers"
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
								{getButtonText()}
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
