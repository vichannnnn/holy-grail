import { Snackbar, Alert, ThemeProvider, createTheme, Typography } from '@mui/material';

interface AlertProps {
  title: string;
  description: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface AlertToastProps {
  openAlert: boolean;
  onClose: () => void;
  alert: AlertProps;
}

const AlertToast = ({ openAlert, onClose, alert }: AlertToastProps) => {
  const muiTheme = createTheme();
  return (
    <ThemeProvider theme={muiTheme}>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alert.severity} sx={{ width: '100%' }}>
          <Typography fontWeight='bold'>{alert.title}</Typography>
          <Typography>{alert.description}</Typography>
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AlertToast;
export type { AlertProps };
