import { Autocomplete, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CSSProperties } from 'react';

export interface Extras {
  disablePortal?: boolean;
}
export interface ComboboxProps {
  label: string;
  value: number | '';
  onChange: (newValue: number | '') => void;
  options: { value: number; label: string }[];
  style?: CSSProperties;
  disabled?: boolean;
  error?: boolean;
  extras?: Extras;
}

const Combobox = ({ label, value, onChange, options, style, disabled, error, extras }: ComboboxProps) => {
  const muiTheme = createTheme();
  return (
    <ThemeProvider theme={muiTheme}>
      <Autocomplete
        style={style}
        value={options.find((option) => option.value === value) || null}
        options={options}
        onChange={(_, newValue) => onChange(newValue?.value || '')}
        renderInput={(params) => <TextField {...params} label={label} error={error} />}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        getOptionLabel={(option) => option.label}
        disabled={disabled}
        {...extras}
      />
    </ThemeProvider>
  );
};

export default Combobox;
