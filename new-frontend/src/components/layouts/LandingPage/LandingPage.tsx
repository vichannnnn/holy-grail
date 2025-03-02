'use client';

import { DesktopHero, MobileHero } from '@layouts/LandingPage/Hero';
import { useContext } from 'react';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

export const LandingPage = () => {
  const { isMedium } = useContext(MediaQueryContext);

  return <>{isMedium ? <DesktopHero /> : <MobileHero />}</>;
};
