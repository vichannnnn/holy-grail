import { AccountDetails } from '@features';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VerticalNav, VerticalNavProps } from '@components';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DescriptionIcon from '@mui/icons-material/Description';

import './account.css';
export const AccountPage = () => {
  const muiTheme = createTheme();
  const [title, setTitle] = useState('Account details');
  const [subtitle, setSubtitle] = useState('Change and update your account details here!');

  const [renderMenuType, setRenderMenuType] = useState<JSX.Element>(<AccountDetails />);

  const navProps: VerticalNavProps[] = [
    {
      icon: AccountBoxIcon,
      label: 'Account details',
      onClick: () => {
        setTitle('Account details');
        setSubtitle('Change and update your account details here!');
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

          {renderMenuType}
        </div>
      </section>
    </ThemeProvider>
  );
};
