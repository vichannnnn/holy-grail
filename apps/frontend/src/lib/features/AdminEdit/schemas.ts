import { z } from "zod";

export const UpdateNoteSchema = z.object({
	document_name: z
		.string()
		.min(1, "Document name is required")
		.max(100, "Document name must be 100 characters or less"),
	category: z.number().min(1, "Category is required"),
	subject: z.number().min(1, "Subject is required"),
	type: z.number().min(1, "Document type is required"),
	year: z.number().min(1900, "Year must be valid").max(2100, "Year must be valid").optional(),
});

export type UpdateNoteFormData = z.infer<typeof UpdateNoteSchema>;
