import { z } from "zod";

export const EditCategorySchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
});

export const EditSubjectSchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
	category_id: z.number().min(1, "Category is required"),
});

export const CreateSubjectSchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
	category_id: z.number().min(1, "Category is required"),
});

export const UpdateSubjectSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be less than 100 characters")
		.optional(),
	category_id: z.number().min(1, "Category is required").optional(),
});

export const EditDocumentTypeSchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
});

export const EditUserSchema = z.object({
	role: z.number().min(1, "Role is required").max(3, "Invalid role"),
});

export type EditCategoryFormData = z.infer<typeof EditCategorySchema>;
export type EditSubjectFormData = z.infer<typeof EditSubjectSchema>;
export type EditDocumentTypeFormData = z.infer<typeof EditDocumentTypeSchema>;
export type EditUserFormData = z.infer<typeof EditUserSchema>;

export const ROLE_OPTIONS = [
	{ id: 1, name: "User" },
	{ id: 2, name: "Admin" },
	{ id: 3, name: "Developer" },
];
