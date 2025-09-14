import type { LibraryAPIResponse, PaginatedNotes, Note } from "../../types";

export interface LibraryCardProps {
	isAdmin: boolean;
	item: Note;
}

export interface LibraryTableProps {
	isAdmin: boolean;
	items: Note[];
}

export interface LibraryContentProps extends LibraryAPIResponse<PaginatedNotes> {
	isAdmin: boolean;
}
