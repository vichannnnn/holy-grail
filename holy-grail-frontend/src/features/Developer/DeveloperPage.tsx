import DeveloperScreen from "./DeveloperScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const DeveloperPage = () => {
  const muiTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <DeveloperScreen />
      </ThemeProvider>
    </>
  );
};

export default DeveloperPage;
