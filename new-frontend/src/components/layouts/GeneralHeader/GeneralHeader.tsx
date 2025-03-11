'use client';

import { DesktopButton, MobileDropdown } from '@layouts/GeneralHeader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

export const Header = () => {
  const pathname = usePathname();
  const hideHeaderRoutes = ['/account-login', '/create-account', '/forgot-password'];
  const shouldHide = hideHeaderRoutes.some((route) => pathname === route);

  return shouldHide ? null : <GeneralHeader />;
};

const GeneralHeader = () => {
  const { isMedium } = useContext(MediaQueryContext);

  return (
    <header className='w-4/5 mx-auto bg-transparent flex justify-between items-center'>
      <div className='pt-6 pb-6 flex items-center'>
        <Link href='/' passHref>
          <img
            src='https://image.himaa.me/grail-chan-happy-v1.webp'
            alt='Holy Grail'
            height='96'
            width='96'
          />
        </Link>
      </div>
      {isMedium ? <DesktopButton /> : <MobileDropdown />}
    </header>
  );
};
