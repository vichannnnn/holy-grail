import { useContext } from 'react';
import { AuthContext, MediaQueryContext } from '@providers';
import { DesktopLogInButton } from './DesktopLogInButton';
import { DesktopUserButton } from './DesktopUserButton';
import { MobileHamburger } from './MobileHamburger';

export const ButtonView = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <>
      {isDesktop && (
        <>
          {!user && <DesktopLogInButton user={user} />}
          {user && <DesktopUserButton user={user} isDesktop={isDesktop} logout={logout} />}
        </>
      )}
      {!isDesktop && <MobileHamburger user={user} isDesktop={isDesktop} logout={logout} />}
    </>
  );
};
