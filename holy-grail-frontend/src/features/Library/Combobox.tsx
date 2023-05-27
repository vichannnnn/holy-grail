import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface ComboboxProps {
  label: string;
  value: number | "";
  onChange: (newValue: number | "") => void;
  options: { value: number; label: string }[];
}

const Combobox = ({ label, value, onChange, options }: ComboboxProps) => {
  const muiTheme = createTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <Autocomplete
        sx={{
          "& .MuiInputBase-root": {
            width: "auto",
            height: "35px",
            padding: "0 10px",
          },
          "& .MuiInputLabel-root": {
            marginTop: "-9px",
          },
        }}
        componentsProps={{ popper: { style: { width: "fit-content" } } }}
        value={options.find((option) => option.value === value) || null}
        options={options}
        onChange={(_, newValue) => onChange(newValue?.value || "")}
        renderInput={(params) => <TextField {...params} label={label} />}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        getOptionLabel={(option) => option.label}
      />
    </ThemeProvider>
  );
};

export default Combobox;
