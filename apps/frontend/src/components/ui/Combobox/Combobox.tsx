import { Autocomplete, AutocompleteProps } from "@mui/material";
import { SyntheticEvent } from "react";

import { DropdownMenuItem } from "@components/DropdownMenuItem";
import { TextField } from "@components/TextField";

export interface CommonType {
	id: number;
	name: string;
}

export interface ComboboxProps
	extends Omit<
		AutocompleteProps<CommonType, false, false, boolean>,
		| "onChange"
		| "value"
		| "onInputChange"
		| "options"
		| "renderInput"
		| "isOptionEqualToValue"
		| "renderOption"
		| "renderTags"
		| "filterOptions"
		| "getOptionDisabled"
		| "groupBy"
		| "onHighlightChange"
	> {
	label: string;
	value: number | "";
	onChange: (newValue: number | "") => void;
	error?: boolean;
	helperText?: string;
	options: CommonType[];
}

export const Combobox = ({
	label,
	value,
	onChange,
	error,
	options,
	helperText,
	...props
}: ComboboxProps) => {
	return (
		<Autocomplete
			ListboxProps={{
				sx: {
					"&::-webkit-scrollbar": {
						width: "8px",
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "rgba(0, 0, 0, 0.2)",
						borderRadius: "4px",
					},
					"&::-webkit-scrollbar-track": {
						backgroundColor: "transparent",
					},
				},
			}}
			value={options.find((option) => option.id === value) || null}
			options={options}
			renderOption={(props, option: CommonType | string, { selected }) => {
				const { key, ...otherProps } = props;
				return (
					<DropdownMenuItem key={key} {...otherProps} selected={selected}>
						{typeof option === "string" ? option : option.name}
					</DropdownMenuItem>
				);
			}}
			onChange={(_: SyntheticEvent<Element, Event>, newValue: string | CommonType | null) => {
				if (typeof newValue === "string" || newValue === null) {
					onChange("");
				} else {
					onChange(newValue.id);
				}
			}}
			renderInput={(params) => (
				<TextField {...params} label={label} error={error} helperText={helperText} />
			)}
			isOptionEqualToValue={(option: string | CommonType, value: string | CommonType) =>
				typeof option !== "string" && typeof value !== "string" ? option.id === value.id : false
			}
			getOptionLabel={(option: CommonType | string) =>
				typeof option === "string" ? option : option.name
			}
			{...props}
		/>
	);
};
