import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  createTheme,
  ThemeProvider,
} from '@mui/material';

export interface Element {
  value: number;
  label: string;
}

export interface ComboboxProps
  extends Omit<
    AutocompleteProps<Element, false, false, boolean>,
    'onChange' | 'value' | 'onInputChange' | 'options' | 'renderInput'
  > {
  label: string;
  value: number | '';
  onChange: (newValue: number | '') => void;
  options: Element[];
}

export const Combobox = ({ label, value, onChange, options, ...props }: ComboboxProps) => {
  const muiTheme = createTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <Autocomplete
        value={options.find((option) => option.value === value) || null}
        options={options}
        onChange={(_, newValue: Element) => onChange(newValue?.value || '')}
        renderInput={(params) => <TextField {...params} label={label} />}
        isOptionEqualToValue={(option, value: Element) => option.value === value?.value}
        getOptionLabel={(option: Element) => option.label}
        {...props}
      />
    </ThemeProvider>
  );
};
