import type { ReactNode } from "react";
import type {
	CategoryType,
	DocumentType,
	SubjectType,
	LibraryAPIResponse,
} from "@/app/library/types";
import type { User } from "@lib/auth";

export interface DeveloperContentProps {
	categories: LibraryAPIResponse<CategoryType[]>;
	subjects: LibraryAPIResponse<SubjectType[]>;
	documentTypes: LibraryAPIResponse<DocumentType[]>;
	users: LibraryAPIResponse<User[]>;
}

export interface DataTableProps<T = Record<string, unknown>> {
	data: T[];
	columns: string[];
	renderEditAction?: (item: T) => ReactNode;
}

export interface CategoryEditProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	category?: CategoryType;
}

export interface SubjectEditProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	subject?: SubjectType;
	categories: CategoryType[];
}

export interface DocumentTypeEditProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	documentType?: DocumentType;
}

export interface UserEditProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	user: User;
}
