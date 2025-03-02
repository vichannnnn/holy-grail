import { DropdownMenuItem } from '@components/DropdownMenuItem';
import { TextField } from '@components/TextField';
import { ChangeEvent } from 'react';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<{ value: unknown }>) => void;
  options: SelectOption[];
}

export const Select = ({ label, value, onChange, options }: SelectProps) => {
  return (
    <TextField select label={label} value={value} onChange={onChange} fullWidth>
      {options.map((option) => (
        <DropdownMenuItem key={option.value} value={option.value}>
          {option.label}
        </DropdownMenuItem>
      ))}
    </TextField>
  );
};
