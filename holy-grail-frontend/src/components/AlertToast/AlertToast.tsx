import { Alert, createTheme, Snackbar, ThemeProvider, Typography } from '@mui/material';
import { AlertProps } from './types';

interface AlertToastProps {
  openAlert: boolean;
  onClose: () => void;
  alertContent?: AlertProps;
}

export const AlertToast = ({ openAlert, onClose, alertContent }: AlertToastProps) => {
  const muiTheme = createTheme();
  if (!alertContent) {
    return null;
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alertContent.severity} sx={{ width: '100%' }}>
          <Typography fontWeight='bold'>{alertContent.title}</Typography>
          <Typography>{alertContent.description}</Typography>
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};
