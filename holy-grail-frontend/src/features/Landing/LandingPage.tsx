import Hero from "./Hero";
import Features from "./Features";
import About from "./About";
import FAQ from "./FAQ";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

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
      <About />
      <Features />
      <FAQ />
    </>
  );
};

export default LandingPage;
