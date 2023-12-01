import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AlertProps, AlertToast } from '@components';
import {
  AccountDetailsPage,
  AccountVerifyPage,
  ApprovalPage,
  DeveloperPage,
  Footer,
  ForgotPasswordPage,
  Header,
  LandingPage,
  Library,
  LoginPage,
  NotFound,
  ResetPasswordPage,
  Scoreboard,
  SignUpPage,
  UploadPage,
} from '@features';
import { AuthProvider, MediaQueryProvider } from '@providers';
import { createTheme, ThemeProvider } from '@mui/material';
import ReactGA from 'react-ga4';

const customMuiTheme = {
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          cursor: 'pointer',
          ':hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#aed1ca',
            border: 'none',
          },
          '&:focus': {
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fcfbf8',
          borderRadius: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { fontFamily: '"Poppins", sans-serif' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontFamily: '"Poppins", sans-serif' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontFamily: '"Poppins", sans-serif' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { fontSize: '18px' },
      },
    },
  },
};

export function App() {
  const muiTheme = createTheme(customMuiTheme);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.hash });
    if (location.state && location.state.alertContent) {
      setAlertContent(location.state.alertContent);
      setOpenAlert(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <ThemeProvider theme={muiTheme}>
      <MediaQueryProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/library' element={<Library />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<SignUpPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/admin' element={<ApprovalPage />} />
            <Route path='/developer' element={<DeveloperPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/verify-account' element={<AccountVerifyPage />} />
            <Route path='/account' element={<AccountDetailsPage />} />
            <Route path='/scoreboard' element={<Scoreboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
          <AlertToast
            openAlert={openAlert}
            onClose={() => setOpenAlert(false)}
            alertContent={alertContent}
          />
        </AuthProvider>
      </MediaQueryProvider>
    </ThemeProvider>
  );
}
