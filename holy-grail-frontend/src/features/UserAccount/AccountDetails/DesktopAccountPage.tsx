import { useState } from 'react';
import { VerticalNav, VerticalNavProps } from '@components';
import { AccountDetails, UpdatePassword, UpdateEmail } from '@features';
import { AccountBox as AccountBoxIcon, Password as PasswordIcon, Email } from '@mui/icons-material';
import './Account.css';

export const DesktopAccountPage = () => {
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
        setRenderMenuType(<UpdatePassword />);
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
      <VerticalNav props={navProps} />
      <div className='account__main'>
        <div className='section__title'>{title}</div>
        <div className='section__subtitle'>{subtitle}</div>
        <hr className='account__divider' />
        <>{renderMenuType}</>
      </div>
    </section>
  );
};
