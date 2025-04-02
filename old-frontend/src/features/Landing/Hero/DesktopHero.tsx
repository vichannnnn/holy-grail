import { Sparkling, Studying } from './Image';
import { LibraryButton, RegisterButton } from './Button';
import { FirstSection, SecondSection } from './Text';
import './DesktopHero.css';

export const DesktopHero = () => {
  return (
    <div className='desktop-outer-hero-container'>
      <div className='desktop-inner-hero-container'>
        <div className='desktop-left-hero'>
          <div>
            <FirstSection />
            <LibraryButton />
          </div>
        </div>
        <div className='desktop-right-hero'>
          <Studying />
        </div>
      </div>
      <div className='desktop-inner-hero-container'>
        <div className='desktop-left-hero'>
          <Sparkling />
        </div>
        <div className='desktop-right-hero'>
          <div>
            <SecondSection />
            <RegisterButton />
          </div>
        </div>
      </div>
    </div>
  );
};
