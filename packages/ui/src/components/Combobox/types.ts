export type Item = {
	id: string | number;
	name: string;
};

export interface ComboboxProps<T extends Item> {
	id?: string;
	label: string;
	description?: string;
	error?: string;
	items: T[];
	onValueChange: (value: T | null) => void;
	defaultValue?: T;
	className?: string;
	containerClassName?: string;
	placeholder?: string;
	disabled?: boolean;
}
