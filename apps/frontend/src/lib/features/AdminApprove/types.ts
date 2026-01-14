import type { ReactNode } from "react";
import type { Note } from "@/app/library/types";

export interface AdminApproveProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	note: Note;
}

export interface ApproveNoteResponse {
	ok: boolean;
	message: string;
}
