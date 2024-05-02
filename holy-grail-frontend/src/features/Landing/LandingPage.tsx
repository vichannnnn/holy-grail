import { Analytics } from './Analytics';
import { FAQ } from './FAQ';
import { Hero } from './Hero';
import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div className='landing-page'>
      <Hero />
      {/*<div className='illume-landing-page-showcase'>*/}
      {/*  <IllumeShowcase />*/}
      {/*</div>*/}
      <Analytics />
      <FAQ />
    </div>
  );
};
