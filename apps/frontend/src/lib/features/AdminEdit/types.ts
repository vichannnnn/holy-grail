import type { ReactNode } from "react";
import type { Note } from "@/app/library/types";

export interface AdminEditProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	note: Note;
}

export interface UpdateNoteData {
	category?: number;
	document_name?: string;
	subject?: number;
	type?: number;
	year?: number;
}

export interface UpdateNoteResponse {
	ok: boolean;
	message: string;
	data?: Note;
}
