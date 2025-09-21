import type { LibraryAPIResponse, PaginatedNotes, Note } from "@/app/library/types";
import type { ReactNode } from "react";

export interface AdminCardProps {
	item: Note;
	renderAdminActions?: () => ReactNode;
}

export interface AdminTableProps {
	items: Note[];
	renderAdminActions?: (note: Note) => ReactNode;
}

export interface AdminContentProps extends LibraryAPIResponse<PaginatedNotes> {}
