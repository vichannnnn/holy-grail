import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = (options = {}) => navigate('/', options);
  const goToRegister = (options = {}) => navigate('/register', options);
  const goToUploadPage = (options = {}) => navigate('/upload', options);
  const goToLoginPage = (options = {}) => navigate('/login', options);
  const goToLibrary = (options = {}) => navigate('/library', options);
  const goToFAQ = (options = {}) => navigate('/#faq', options);
  const goToUpdatePassword = (options = {}) => navigate('/update-password', options);
  const goToForgotPassword = (options = {}) => navigate('/forgot-password', options);
  const goToAdminPanel = (options = {}) => navigate('/admin', options);
  const goToDeveloperPanel = (options = {}) => navigate('/developer', options);
  const goToAccountPage = (options = {}) => navigate('/account', options);

  const goToGP = () => window.open('https://GP.sg', '_blank');
  const goToStudentsKahoot = () => window.open('https://t.me/studentskahoot', '_blank');
  const goToJCBot = () => window.open('https://t.me/juniorcollegebot', '_blank');
  const goToJCChatBot = () => window.open('https://t.me/JCchatbot', '_blank');
  const goToSecondarySchoolBot = () => window.open('https://t.me/SecondarySchoolBot', '_blank');
  const goToThisCounted = () => window.open('https://t.me/ThisCounted', '_blank');

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
    goToGP,
    goToStudentsKahoot,
    goToJCBot,
    goToJCChatBot,
    goToSecondarySchoolBot,
    goToThisCounted,
  };
};
