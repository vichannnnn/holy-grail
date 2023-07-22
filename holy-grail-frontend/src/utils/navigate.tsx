import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToRegister = () => navigate('/register');
  const goToForgotPassword = () => navigate('/forgot-password');

  return { goToHome, goToRegister, goToForgotPassword };
};
