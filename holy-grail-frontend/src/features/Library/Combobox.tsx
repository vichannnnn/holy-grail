import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ComboboxProps {
  label: string;
  value: number | "";
  onChange: (newValue: number | "") => void;
  options: { value: number; label: string }[];
}

const Combobox = ({ label, value, onChange, options }: ComboboxProps) => {
  return (
    <Autocomplete
      sx={{
        "& .MuiInputBase-root": {
          height: "35px",
        },
        "& .MuiInputLabel-root": {
          marginTop: "-9px",
        },
      }}
      value={options.find((option) => option.value === value) || null}
      options={options}
      onChange={(_, newValue) => onChange(newValue?.value || "")}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      getOptionLabel={(option) => option.label}
    />
  );
};

export default Combobox;
