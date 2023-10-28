import { useContext } from 'react';
import { MediaQueryContext } from '@providers';
import { useNavigation } from '@utils';
import './Hero.css';

export const Hero = () => {
  const { goToLibrary, goToRegister } = useNavigation();
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <div className='outer-hero-container'>
      <div className='inner-hero-container'>
        {!isDesktop && (
          <div className='right-hero'>
            <img
              src='https://document.grail.moe/grail-chan-studying.png'
              alt='Studying'
              width='450'
            />
          </div>
        )}
        <div className='left-hero'>
          <div>
            <h1>Access your notes you need in just a click.</h1>
            <p>
              A completely free-to-access web library aimed at Singaporean students that houses all
              the relevant summary notes and practice papers for GCE 'O' Levels, GCE 'A' Levels and
              International Baccalaureate.
            </p>
            <button className='try-btn' onClick={goToLibrary}>
              Click here to access the library!
            </button>
          </div>
        </div>
        {isDesktop && (
          <div className='right-hero'>
            <img
              src='https://document.grail.moe/grail-chan-studying.png'
              alt='Studying'
              width='450'
            />
          </div>
        )}
      </div>
      <div className='inner-hero-container'>
        <div className='left-hero'>
          <img
            src='https://document.grail.moe/grail-chan-sparkling.png'
            alt='Sparkling'
            width='450'
          />
        </div>
        <div className='right-hero'>
          <div>
            <h1>Want to contribute?</h1>
            <p>
              Accessing notes is free for everyone, even for those without an account, but if you
              want to contribute revision materials into the repository, you can log in or sign up
              for an account below to start contributing!
            </p>
            <button className='signup-btn' onClick={goToRegister}>
              Click here to sign up!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
