import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { Hero } from './Hero';
import { FAQ } from './FAQ';
import { Library } from '../Library/Library';

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        scroll.scrollTo(elem.offsetTop);
      }
    } else {
      scroll.scrollToTop();
    }
  }, [location]);
  return (
    <>
      <Hero />
      <Library />
      <FAQ />
    </>
  );
};
