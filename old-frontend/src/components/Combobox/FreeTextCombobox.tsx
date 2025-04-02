import { TextField, TextFieldProps } from '@mui/material';

export interface FreeTextComboboxProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const FreeTextCombobox = ({ label, value, onChange, ...props }: FreeTextComboboxProps) => {
  return (
    <TextField
      value={value}
      label={label}
      onChange={(event) => onChange(event.target.value)}
      {...props}
    />
  );
};
