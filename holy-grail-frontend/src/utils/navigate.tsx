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
  const goToScoreboard = (options = {}) => navigate('/scoreboard', options);

  const goToGP = () => (window.location.href = 'https://GP.sg');
  const goToInstagram = () => (window.location.href = 'https://instagram.com/generalpaper');
  const goToJCBot = () => (window.location.href = 'https://t.me/juniorcollegebot');
  const goToJCChatBot = () => (window.location.href = 'https://t.me/JCchatbot');
  const goToSecondarySchoolBot = () => (window.location.href = 'https://t.me/SecondarySchoolBot');
  const goToThisCounted = () => (window.location.href = 'https://t.me/ThisCounted');

  const goToIllume = () => window.open('https://illum.education/', '_blank');

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
    goToInstagram,
    goToJCBot,
    goToJCChatBot,
    goToSecondarySchoolBot,
    goToThisCounted,
    goToScoreboard,
    goToIllume,
  };
};
