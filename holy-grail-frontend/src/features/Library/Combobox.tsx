import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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
  extras?: Extras;
}

const Combobox = ({ label, value, onChange, options, style, extras }: ComboboxProps) => {
  const muiTheme = createTheme();
  return (
    <ThemeProvider theme={muiTheme}>
      <Autocomplete
        style={style}
        value={options.find((option) => option.value === value) || null}
        options={options}
        onChange={(_, newValue) => onChange(newValue?.value || '')}
        renderInput={(params) => <TextField {...params} label={label} />}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        getOptionLabel={(option) => option.label}
        {...extras}
      />
    </ThemeProvider>
  );
};

export default Combobox;
