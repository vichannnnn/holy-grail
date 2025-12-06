import type { ComboboxProps } from "@shared/ui/components";
import type {
	NotesSearchParams,
	CategoryType,
	DocumentType,
	SubjectType,
	LibraryAPIResponse,
} from "../../types";

export interface LibrarySearchProps {
	query?: NotesSearchParams;
	allCategories: LibraryAPIResponse<CategoryType[]>;
	allDocumentTypes: LibraryAPIResponse<DocumentType[]>;
	allSubjects: LibraryAPIResponse<SubjectType[]>;
    adminPanel?: boolean;
    isAuthenticated?: boolean;
}

export interface DocumentNameSearchProps {
	defaultValue?: string;
	onChange: (value: string) => void;
}

export interface LibraryComboboxProps
	extends ComboboxProps<CategoryType | DocumentType | SubjectType> {}

export interface FavouriteSwitchProps {
    query?: NotesSearchParams;
}