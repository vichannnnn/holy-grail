import type { CategoryType, DocumentType } from "@/app/library/types";
import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import type { z } from "zod";
import type { NoteSchema, NotesSchema } from "./schemas";

// Infer types from Zod schemas
export type NoteFormData = z.infer<typeof NoteSchema>;
export type NotesFormData = z.infer<typeof NotesSchema>;

export interface UploadWorkspaceProps {
	categories: CategoryType[];
	documentTypes: DocumentType[];
	// subjects prop will be fetched dynamically based on category selection (see UploadEntry.tsx)
}

export interface UploadEntryProps {
	file: File;
	index: number;
	control: Control<NotesFormData>;
	setValue: UseFormSetValue<NotesFormData>;
	onDelete: (fileName: string) => void;
	categories: CategoryType[];
	documentTypes: DocumentType[];
	errors?: FieldErrors<NoteFormData>;
	totalEntries: number;
}
