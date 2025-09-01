import { TextFieldProps } from "@mui/material";

import { TextField } from "@components/TextField";

export interface FreeTextComboboxProps extends Omit<TextFieldProps, "onChange" | "value"> {
	label: string;
	value: string;
	onChange: (newValue: string) => void;
}

export const FreeTextCombobox = ({
	label,
	value,
	onChange,
	className,
	...props
}: FreeTextComboboxProps) => {
	return (
		<div className={className}>
			<TextField
				{...props}
				value={value}
				label={label}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
};
