import type { ReactNode } from "react";
import type { Note } from "@/app/library/types";

export interface AdminDeleteProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	note: Note;
}

export interface DeleteNoteResponse {
	ok: boolean;
	message: string;
}
