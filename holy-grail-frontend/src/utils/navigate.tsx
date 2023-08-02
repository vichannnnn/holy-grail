import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = (options = {}) => navigate('/', options);
  const goToRegister = (options = {}) => navigate('/register', options);
  const goToUploadPage = (options = {}) => navigate('/upload', options);
  const goToLoginPage = (options = {}) => navigate('/login', options);
  const goToLibrary = (options = {}) => navigate('/#library', options);
  const goToFAQ = (options = {}) => navigate('/#faq', options);
  const goToUpdatePassword = (options = {}) => navigate('/update-password', options);
  const goToForgotPassword = (options = {}) => navigate('/forgot-password', options);
  const goToAdminPanel = (options = {}) => navigate('/admin', options);
  const goToDeveloperPanel = (options = {}) => navigate('/developer', options);
  const goToAccountPage = (options = {}) => navigate('/account', options);

  return {
    goToHome,
    goToRegister,
    goToUploadPage,
    goToLoginPage,
    goToLibrary,
    goToFAQ,
    goToUpdatePassword,
    goToForgotPassword,
    goToAdminPanel,
    goToDeveloperPanel,
    goToAccountPage,
  };
};
