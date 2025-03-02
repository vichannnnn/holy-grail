import { SyntheticEvent } from 'react';
import { TextField } from '@components/TextField';
import { CustomAutocomplete as Autocomplete } from '@components/Combobox';
import { AutocompleteProps } from '@mui/material';
import { DropdownMenuItem } from '@components/DropdownMenuItem';

export interface MultiSelectionComboboxProps<T extends Record<string, string>>
  extends Omit<
    AutocompleteProps<T[keyof T], true, false, boolean>,
    | 'onChange'
    | 'value'
    | 'onInputChange'
    | 'options'
    | 'renderInput'
    | 'getOptionLabel'
    | 'isOptionEqualToValue'
    | 'renderOption'
    | 'renderTags'
    | 'filterOptions'
    | 'getOptionDisabled'
    | 'groupBy'
    | 'onHighlightChange'
  > {
  label: string;
  value: T[keyof T][];
  onChange: (newValue: T[keyof T][]) => void;
  error?: boolean;
  helperText?: string;
  options: T[keyof T][];
  getOptionLabel: (option: T[keyof T]) => string;
  isOptionEqualToValue: (option: T[keyof T], value: T[keyof T]) => boolean;
}

export const MultiSelectionCombobox = <T extends Record<string, string>>({
  label,
  value,
  onChange,
  error,
  options,
  helperText,
  getOptionLabel,
  isOptionEqualToValue,
  ...props
}: MultiSelectionComboboxProps<T>) => {
  // TODO: Need to fix the onChange lint type error
  return (
    <Autocomplete
      multiple
      value={value}
      options={options}
      // @ts-ignore
      onChange={(_: SyntheticEvent<Element, Event>, newValue: string[] | null) => {
        onChange(newValue as T[keyof T][]);
      }}
      renderOption={(props, option, { selected }) => (
        <DropdownMenuItem {...props} selected={selected}>
          {getOptionLabel(option as T[keyof T])}
        </DropdownMenuItem>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} error={error} helperText={helperText} />
      )}
      isOptionEqualToValue={(option, value) => {
        if (value === null || value === undefined) {
          return false;
        }
        return isOptionEqualToValue(option as T[keyof T], value as T[keyof T])
      }
      }
      getOptionLabel={(option) => getOptionLabel(option as T[keyof T])}
      {...props}
    />
  );
};
