<<<<<<< HEAD
import DeveloperScreen from './DeveloperScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './developer.css';
=======
import DeveloperScreen from "./DeveloperScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./developer.css"
>>>>>>> bbe493b (new FE (desktop))

const DeveloperPage = () => {
  const muiTheme = createTheme();
  return (
<<<<<<< HEAD
    <section className='developer section container'>
=======
    <section className="developer section container">
>>>>>>> bbe493b (new FE (desktop))
      <ThemeProvider theme={muiTheme}>
        <DeveloperScreen />
      </ThemeProvider>
    </section>
  );
};

export default DeveloperPage;
