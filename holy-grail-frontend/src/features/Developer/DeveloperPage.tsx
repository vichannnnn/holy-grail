import { DeveloperScreen } from './DeveloperScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './developer.css';

export const DeveloperPage = () => {
  const muiTheme = createTheme();
  return (
    <section className='developer section container'>
      <ThemeProvider theme={muiTheme}>
        <DeveloperScreen />
      </ThemeProvider>
    </section>
  );
};
