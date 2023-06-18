import Hero from "./Hero";
import Library from "../Library/Library"
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
      <Library />
      <FAQ />
    </>
  );
};

export default LandingPage;
