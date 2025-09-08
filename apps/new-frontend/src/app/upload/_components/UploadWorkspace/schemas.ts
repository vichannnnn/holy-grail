import { z } from "zod";

const SUPPORTED_FORMATS = ["application/pdf", "application/zip"];
const FILE_SIZE_LIMIT = 1048576000; // 1GB

export const NoteSchema = z.object({
	name: z.string().min(1, "Document name is required").max(100, "Maximum 100 characters"),
	subject: z.number().min(1, "Subject is required"),
	type: z.number().min(1, "Type is required"),
	category: z.number().min(1, "Category is required"),
	file: z
		.file()
		.refine((file) => file.size <= FILE_SIZE_LIMIT, "File too large")
		.refine((file) => SUPPORTED_FORMATS.includes(file.type), "Unsupported File Format"),
});
