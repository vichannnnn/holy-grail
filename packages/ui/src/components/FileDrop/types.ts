import type { InputHTMLAttributes } from "react";

export interface FileDropProps extends InputHTMLAttributes<HTMLInputElement> {
	optional?: boolean;
}
