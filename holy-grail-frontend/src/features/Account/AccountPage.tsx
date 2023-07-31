import { AccountDetails, ChangePassword, UpdateEmail } from '@features';
import { useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VerticalNav, VerticalNavProps } from '@components';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DescriptionIcon from '@mui/icons-material/Description';
import PasswordIcon from '@mui/icons-material/Password';
import Email from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { AlertProps, AlertToast } from '@components';
import { AuthContext } from '@providers';

import './account.css';

export const AccountPage = () => {
  const muiTheme = createTheme();
  const [title, setTitle] = useState('Account details');
  const [subtitle, setSubtitle] = useState('Change and update your account details here!');

  const [renderMenuType, setRenderMenuType] = useState<JSX.Element>(<AccountDetails />);

  const { user, isLoading } = useContext(AuthContext);
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

  const navProps: VerticalNavProps[] = [
    {
      icon: AccountBoxIcon,
      label: 'Account details',
      onClick: () => {
        setTitle('Account details');
        setSubtitle('Change and update your account details here!');
        setRenderMenuType(<AccountDetails />);
      },
    },
    {
      icon: PasswordIcon,
      label: 'Change password',
      onClick: () => {
        setTitle('Change password');
        setSubtitle('Change your password here!');
        setRenderMenuType(<ChangePassword />);
      },
    },
    {
      icon: Email,
      label: 'Update email',
      onClick: () => {
        setTitle('Update email');
        setSubtitle('Update your email here!');
        setRenderMenuType(<UpdateEmail />);
      },
    },
    {
      icon: DescriptionIcon,
      label: 'Your Uploads',
      onClick: () => {
        setTitle('Uploads');
        setSubtitle('View the approval stats of your uploaded documents here!');
      },
    },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <section className='section container account__page'>
        <VerticalNav props={navProps} />
        <div className='account__main'>
          <div className='section__title'>{title}</div>
          <div className='section__subtitle'>{subtitle}</div>
          <hr className='account__divider' />

          {renderMenuType}
        </div>
      </section>
    </ThemeProvider>
  );
};
