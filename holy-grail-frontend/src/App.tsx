import './App.css';
import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './features/SignIn/LoginPage';
import LandingPage from './features/Landing/LandingPage';
import { useLocation, Router, Route, Routes } from 'react-router-dom';
import Footer from './features/Footer/Footer';
import SignUpPage from './features/SignUp/SignUpPage';
import UploadPage from './features/Upload/UploadPage';
import { AuthProvider } from './providers/AuthProvider';
import ApprovalPage from './features/Approval/ApprovalPage';
import NotFound from './features/Common/NotFound';
import DeveloperPage from './features/Developer/DeveloperPage';
import ChangePasswordPage from './features/ChangePassword/ChangePasswordPage';
import ForgotPasswordPage from './features/ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './features/ResetPassword/ResetPasswordPage';
import AccountVerifyPage from './features/AccountVerify/AccountVerifyPage';
import AlertToast, { AlertProps } from './components/AlertToast/AlertToast';

import Header from './features/Header/Header';
import { MediaQueryProvider } from './providers/MediaQueryProvider';

function App() {
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.alertContent) {
      setAlertContent(location.state.alertContent);
      setOpenAlert(true);
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

export default App;
