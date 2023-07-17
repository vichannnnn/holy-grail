import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AlertToast, AlertProps } from '@components';
import {
  AccountVerifyPage,
  ApprovalPage,
  ChangePasswordPage,
  DeveloperPage,
  ForgotPasswordPage,
  Footer,
  Header,
  LandingPage,
  LoginPage,
  ResetPasswordPage,
  NotFound,
  SignUpPage,
  UploadPage,
} from '@features';
import { AuthProvider, MediaQueryProvider } from '@providers';

export function App() {
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.alertContent) {
      setAlertContent(location.state.alertContent);
      setOpenAlert(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <MediaQueryProvider>
      <AuthProvider>
        <ChakraProvider>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<SignUpPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/admin' element={<ApprovalPage />} />
            <Route path='/developer' element={<DeveloperPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/update-password' element={<ChangePasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/verify-account' element={<AccountVerifyPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />

          <AlertToast
            openAlert={openAlert}
            onClose={() => setOpenAlert(false)}
            alertContent={alertContent}
          />
        </ChakraProvider>
      </AuthProvider>
    </MediaQueryProvider>
  );
}
