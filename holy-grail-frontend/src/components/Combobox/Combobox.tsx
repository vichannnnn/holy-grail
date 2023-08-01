import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';
import { CommonType } from '@api/library';

export interface ComboboxProps
  extends Omit<
    AutocompleteProps<CommonType, false, false, boolean>,
    | 'onChange'
    | 'value'
    | 'onInputChange'
    | 'options'
    | 'renderInput'
    | 'isOptionEqualToValue'
    | 'renderOption'
    | 'renderTags'
    | 'filterOptions'
    | 'getOptionDisabled'
    | 'groupBy'
    | 'onHighlightChange'
  > {
  label: string;
  value: number | '';
  onChange: (newValue: number | '') => void;
  error?: boolean;
  options: CommonType[];
}

export const Combobox = ({ label, value, onChange, error, options, ...props }: ComboboxProps) => {
  return (
    <Autocomplete
      value={options.find((option) => option.id === value) || null}
      options={options}
      onChange={(event: SyntheticEvent<Element, Event>, newValue: string | CommonType | null) => {
        if (typeof newValue === 'string' || newValue === null) {
          onChange('');
        } else {
          onChange(newValue.id);
        }
      }}
      renderInput={(params) => <TextField {...params} label={label} error={error} />}
      isOptionEqualToValue={(option: string | CommonType, value: string | CommonType) =>
        typeof option !== 'string' && typeof value !== 'string' ? option.id === value.id : false
      }
      getOptionLabel={(option: CommonType | string) =>
        typeof option === 'string' ? option : option.name
      }
      {...props}
    />
  );
};
