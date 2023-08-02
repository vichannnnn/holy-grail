import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerticalNav, VerticalNavProps, AlertProps } from '@components';
import { AccountDetails, ChangePassword, UpdateEmail } from '@features';
import { AuthContext, MediaQueryContext } from '@providers';
import { AccountBox as AccountBoxIcon, Password as PasswordIcon, Email } from '@mui/icons-material';
import './account.css';
import { Divider } from '@mui/material';

export const AccountPage = () => {
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
      label: 'Account Details',
      onClick: () => {
        setTitle('Account Details');
        setSubtitle('View your account details here!');
        setRenderMenuType(<AccountDetails changeEmailClick={changeEmailClick} />);
        setActiveElem([true, false, false]);
      },
      active: activeElem[0],
    },
    {
      icon: PasswordIcon,
      label: 'Change Password',
      onClick: () => {
        setTitle('Change Password');
        setSubtitle('Change your password here!');
        setRenderMenuType(<ChangePassword />);
        setActiveElem([false, true, false]);
      },
      active: activeElem[1],
    },
    {
      icon: Email,
      label: 'Update Email',
      onClick: () => {
        setTitle('Update Email');
        setSubtitle('Update your email here!');
        setRenderMenuType(<UpdateEmail />);
        setActiveElem([false, false, true]);
      },
      active: activeElem[2],
    },
  ];

  return (
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
            <UpdateEmail />
            <hr className='account__divider' />
            <ChangePassword />
          </>
        )}
      </div>
    </section>
  );
};
