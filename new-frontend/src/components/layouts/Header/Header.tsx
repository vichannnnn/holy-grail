'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { DesktopButton, MobileDropdown } from 'src/components/layouts/Header';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

export const Header = () => {
  const pathname = usePathname();
  const hideHeaderRoutes = ['/login', '/register', '/forgot-password'];
  const shouldHide = hideHeaderRoutes.some((route) => pathname === route);

  return shouldHide ? null : <HeaderLayout />;
};

const HeaderLayout = () => {
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
      {isMedium ? (
        <>
          <div className='flex flex-row gap-8 font-bold'>
            <Link href='/' passHref>
              <p>Home</p>
            </Link>
            <Link href='/library' passHref>
              <p>Library</p>
            </Link>
            <Link href='/faq' passHref>
              <p>FAQ</p>
            </Link>
            <Link href='/upload' passHref>
              <p>Contribute</p>
            </Link>
            <Link href='/leaderboard' passHref>
              <p>Leaderboard</p>
            </Link>
          </div>
          <DesktopButton />
        </>
      ) : (
        <MobileDropdown />
      )}
    </header>
  );
};
