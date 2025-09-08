import type { CategoryType, DocumentType } from "@/app/library/types";

export interface UploadWorkspaceProps {
	categories: CategoryType[];
	documentTypes: DocumentType[];
	// subjects prop will be fetched dynamically based on category selection (see UploadEntry.tsx)
}

export interface UploadEntryProps {
	file: File;
	onDelete: (fileName: string) => void;
	categories: CategoryType[];
	documentTypes: DocumentType[];
}
