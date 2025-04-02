import { Button } from '@components';
import { User } from '@providers';
import { useNavigation } from '@utils';

interface DesktopLogInButtonProps {
  user: User | null;
}

export const DesktopLogInButton = ({ user }: DesktopLogInButtonProps) => {
  const { goToLoginPage } = useNavigation();

  const handleLoginRedirect = () => {
    if (!user) {
      goToLoginPage();
    }
  };

  return (
    <>
      <Button onClick={handleLoginRedirect} sx={{ width: 'fit-content' }}>
        Log in
      </Button>
    </>
  );
};
