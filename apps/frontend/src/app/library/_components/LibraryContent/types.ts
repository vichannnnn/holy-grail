import type { LibraryAPIResponse, PaginatedNotes, Note } from "../../types";
import type { ReactNode } from "react";

export interface LibraryCardProps {
	item: Note;
	renderAdminActions?: () => ReactNode;
    renderFavouriteAction?: () => ReactNode
}

export interface LibraryTableProps {
	items: Note[];
	renderAdminActions?: (note: Note) => ReactNode;
    renderFavouriteAction?: (note: Note) => ReactNode
}

export interface LibraryContentProps extends LibraryAPIResponse<PaginatedNotes> {
	isAdmin: boolean;
    favouriteList: number[] | null;
}
