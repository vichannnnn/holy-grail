import type { ReactNode } from "react";
import type { Note } from "@/app/library/types";

export interface AdminEditProps {
	render: ({ toggleOpen }: { toggleOpen: () => void }) => ReactNode;
	note: Note;
}
