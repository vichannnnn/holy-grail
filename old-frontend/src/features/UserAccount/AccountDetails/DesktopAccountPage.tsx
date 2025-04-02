import { useState } from 'react';
import { VerticalNav, VerticalNavProps } from '@components';
import { AccountDetails, UpdatePassword, UpdateEmail } from '@features';
import { AccountBox as AccountBoxIcon, Password as PasswordIcon, Email } from '@mui/icons-material';
import './AccountDetails.css';
import '../UserAccountForm.css';

export const DesktopAccountPage = () => {
  const [title, setTitle] = useState('Account Details');
  const [subtitle, setSubtitle] = useState('Change and update your account details here');
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
    <div className='account-details-container'>
      <VerticalNav props={navProps} />
      <div className='account-details-main'>
        <div className='account-form-title'>{title}</div>
        <div className='account-form-subtitle'>{subtitle}</div>
        <hr className='account-divider' />
        <>{renderMenuType}</>
      </div>
    </div>
  );
};
