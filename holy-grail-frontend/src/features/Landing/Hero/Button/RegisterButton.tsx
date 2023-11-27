import { Button } from '@components';
import { useNavigation } from '@utils';

export const RegisterButton = () => {
  const { goToRegister } = useNavigation();

  return <Button onClick={goToRegister}>Click here to sign up!</Button>;
};
