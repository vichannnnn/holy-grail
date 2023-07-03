import { Snackbar, Alert, ThemeProvider, createTheme, Typography } from '@mui/material';

interface AlertProps {
  title: string;
  description: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface AlertToastProps {
  openAlert: boolean;
  onClose: () => void;
  alertContent?: AlertProps;
}

const AlertToast = ({ openAlert, onClose, alertContent }: AlertToastProps) => {
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

export default AlertToast;
export type { AlertProps };
