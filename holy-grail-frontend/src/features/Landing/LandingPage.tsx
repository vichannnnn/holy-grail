<<<<<<< HEAD
import Hero from './Hero';
import Library from '../Library/Library';
import FAQ from './FAQ';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
=======
import Hero from "./Hero";
import Features from "./Features";
import About from "./About";
import LibraryNew from "../Library/LibraryNew"
import FAQ from "./FAQ";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
>>>>>>> bbe493b (new FE (desktop))

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
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
<<<<<<< HEAD
      <Library />
=======
      {/*<About />*/}
      <LibraryNew />
      {/*<Features />*/}
>>>>>>> bbe493b (new FE (desktop))
      <FAQ />
    </>
  );
};

export default LandingPage;
