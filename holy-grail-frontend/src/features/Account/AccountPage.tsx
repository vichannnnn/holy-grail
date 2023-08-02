import { AccountDetails, ChangePassword, UpdateEmail } from '@features';
import { useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VerticalNav, VerticalNavProps } from '@components';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import Email from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { AlertProps } from '@components';
import { AuthContext, MediaQueryContext } from '@providers';

import './account.css';

export const AccountPage = () => {
  const muiTheme = createTheme();
  const [title, setTitle] = useState('Account details');
  const [subtitle, setSubtitle] = useState('Change and update your account details here!');
  const [activeElem, setActiveElem] = useState<Array<boolean>>([true, false, false]);
  const changeEmailClick = () => {
    setActiveElem([false, false, true]);
    setTitle('Update email');
    setSubtitle('Update your email here!');
    setRenderMenuType(<UpdateEmail />);
  };

  const [renderMenuType, setRenderMenuType] = useState<JSX.Element>(
    <AccountDetails changeEmailClick={changeEmailClick} />,
  );

  const { user, isLoading } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'Please login.',
          description: 'You need to be logged in to edit your account details.',
          severity: 'error',
        };
        navigate('/login', { state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (!isDesktop) {
      setTitle('Edit Account');
      setSubtitle('View, edit and update your account here!');
    } else {
      setTitle('Account details');
      setSubtitle('View your account details here!');
      setRenderMenuType(<AccountDetails changeEmailClick={changeEmailClick} />);
    }
  }, [isDesktop]);

  const navProps: VerticalNavProps[] = [
    {
      icon: AccountBoxIcon,
      label: 'Account details',
      onClick: () => {
        setTitle('Account details');
        setSubtitle('View your account details here!');
        setRenderMenuType(<AccountDetails changeEmailClick={changeEmailClick} />);
        setActiveElem([true, false, false]);
      },
      active: activeElem[0],
    },
    {
      icon: PasswordIcon,
      label: 'Change password',
      onClick: () => {
        setTitle('Change password');
        setSubtitle('Change your password here!');
        setRenderMenuType(<ChangePassword />);
        setActiveElem([false, true, false]);
      },
      active: activeElem[1],
    },
    {
      icon: Email,
      label: 'Update email',
      onClick: () => {
        setTitle('Update email');
        setSubtitle('Update your email here!');
        setRenderMenuType(<UpdateEmail />);
        setActiveElem([false, false, true]);
      },
      active: activeElem[2],
    },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <section className='section container account__page'>
        {isDesktop ? <VerticalNav props={navProps} /> : null}

        <div className='account__main'>
          <div className='section__title'>{title}</div>
          <div className='section__subtitle'>{subtitle}</div>
          <hr className='account__divider' />

          {isDesktop ? (
            <>{renderMenuType}</>
          ) : (
            <>
              <AccountDetails />
              <hr className='account__divider' />
              <ChangePassword />
              <hr className='account__divider' />
              <UpdateEmail />
            </>
          )}
        </div>
      </section>
    </ThemeProvider>
  );
};
