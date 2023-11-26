import { useContext } from 'react';
import { MediaQueryContext } from '@providers';
import { DesktopHero } from '../DesktopHero';
import { MobileHero } from '../MobileHero';

export const Hero = () => {
  const { isDesktop } = useContext(MediaQueryContext);

  return <>{isDesktop ? <DesktopHero /> : <MobileHero />}</>;
};
