"use client";
import { Input } from "@shared/ui/components";
import { memo } from "react";
import type { DocumentNameSearchProps } from "./types";

function _DocumentNameSearch({ defaultValue, onChange }: DocumentNameSearchProps) {
	return (
		<Input
			label="Document Name"
			placeholder="eg. NYJC Math"
			onChange={(e) => onChange(e.target.value)}
			defaultValue={defaultValue}
		/>
	);
}

export const DocumentNameSearch = memo(_DocumentNameSearch);
