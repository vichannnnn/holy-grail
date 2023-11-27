import { Sparkling, Studying } from './Image';
import { LibraryButton, RegisterButton } from './Button';
import { FirstSection, SecondSection } from './Text';
import './MobileHero.css';

export const MobileHero = () => {
  return (
    <div className='mobile-hero-container'>
      <div>
        <Studying />
        <FirstSection />
        <div className='hero-button-container'>
          <LibraryButton />
        </div>
      </div>
      <div>
        <Sparkling />
        <SecondSection />
        <div className='hero-button-container'>
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};
