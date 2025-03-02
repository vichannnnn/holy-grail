'use client';

import { DesktopButton, MobileDropdown } from '@layouts/GeneralHeader';
import Image from 'next/image';
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
          <Image
            src='/flower.png'
            alt='GeneralHeader Logo'
            height='256'
            width='256'
            className='w-full h-auto'
            priority={true}
          />
        </Link>
      </div>
      {isMedium ? <DesktopButton /> : <MobileDropdown />}
    </header>
  );
};
