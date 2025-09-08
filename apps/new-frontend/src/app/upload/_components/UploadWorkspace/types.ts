import type {
	CategoryType,
	DocumentType,
	SubjectType,
	LibraryAPIResponse,
} from "@/app/library/types";

export interface UploadWorkspaceProps {
	categories: CategoryType[];
	documentTypes: DocumentType[];
	// subjects prop will be fetched dynamically based on category selection
	fetchSubjects: (category_id?: number) => Promise<LibraryAPIResponse<SubjectType[]>>;
}
