import { SyntheticEvent } from 'react';
import { Autocomplete, AutocompleteProps, styled } from '@mui/material';
import { TextField } from '@components/TextField';
import { DropdownMenuItem } from '@components/DropdownMenuItem';

export const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    backgroundColor: '#2d2d2d',
    borderRadius: '8px',
    paddingRight: '0',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#333333',
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#444444',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },

    '& .MuiAutocomplete-input': {
      backgroundColor: '#2d2d2d',
      borderRadius: '8px',
    },
  },

  '& label': {
    color: '#949494',
  },

  '& label.Mui-focused': {
    color: '#949494',
  },

  '& .Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
    fontFamily: '"Poppins", sans-serif',
  },

  '&.Mui-focused .MuiOutlinedInput-root.Mui-error fieldset': {
    borderColor: theme.palette.error.main,
  },

  '&.Mui-focused .MuiFormLabel-root.Mui-error': {
    color: theme.palette.error.main,
  },

  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
  },

  '& .MuiFormLabel-root.Mui-error': {
    color: theme.palette.error.main,
  },

  '& .MuiFormHelperText-root': {
    fontFamily: '"Poppins", sans-serif',
  },
}));

export interface ComboboxProps<T extends Record<string, string>>
  extends Omit<
    AutocompleteProps<T[keyof T], false, false, boolean>,
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
  value: T[keyof T] | null;
  onChange: (newValue: T[keyof T] | null) => void;
  error?: boolean;
  helperText?: string;
  options: T[keyof T][];
  getOptionLabel: (option: T[keyof T]) => string;
  isOptionEqualToValue: (option: T[keyof T], value: T[keyof T]) => boolean;
}

export const Combobox = <T extends Record<string, string>>({
  label,
  value,
  onChange,
  error,
  options,
  helperText,
  getOptionLabel,
  isOptionEqualToValue,
  ...props
}: ComboboxProps<T>) => {
  // TODO: Need to fix the onChange lint type error
  return (
    <CustomAutocomplete
      value={value}
      options={options}
      noOptionsText={
        <span className='text-[#949494]' style={{ fontFamily: 'Poppins, sans-serif' }}>
          No options available
        </span>
      }
      renderOption={(props, option, { selected }) => (
        <DropdownMenuItem {...props} selected={selected}>
          {getOptionLabel(option as T[keyof T])}
        </DropdownMenuItem>
      )}
      // @ts-ignore
      onChange={(_: SyntheticEvent<Element, Event>, newValue: string | null) => {
        onChange(newValue as T[keyof T]);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} error={error} helperText={helperText} />
      )}
      isOptionEqualToValue={(option, value) => {
        if (value === null || value === undefined) {
          return false;
        }
        return isOptionEqualToValue(option as T[keyof T], value as T[keyof T]);
      }}
      getOptionLabel={(option) => getOptionLabel(option as T[keyof T])}
      {...props}
    />
  );
};
