"use client";
import type { LibraryComboboxProps } from "./types";
import { Combobox } from "@shared/ui/components";
import { memo } from "react";

function _LibraryCombobox(props: LibraryComboboxProps) {
	return <Combobox {...props} />;
}

export const LibraryCombobox = memo(_LibraryCombobox);
