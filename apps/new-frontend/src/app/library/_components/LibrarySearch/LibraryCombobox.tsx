"use client";
import type { LibraryComboboxProps } from "./types";
import { Combobox, Text } from "@shared/ui/components";
import { memo } from "react";

function _LibraryCombobox(props: LibraryComboboxProps) {
	if (!props.items) return <Text>{props.label} could not be loaded.</Text>;
	return <Combobox {...props} />;
}

export const LibraryCombobox = memo(_LibraryCombobox);
