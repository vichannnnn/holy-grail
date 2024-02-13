import { useContext, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext, MediaQueryContext } from '@providers';
import { ButtonView } from './Button';
import './Header.css';

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const [activeNav, setActiveNav] = useState('#home');

  return (
    <header className='header'>
      <div className='header-container'>
        <RouterLink to='/'>
          <img
            className='header-logo'
            src='https://image.himaa.me/trimmy-illume-grail-chan-happy-v2.png'
            alt=''
          />
        </RouterLink>
        {isDesktop ? (
          <div>
            <ul className='header-items-section'>
              <li>
                <HashLink
                  to='/'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => {
                    setActiveNav('#home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <a
                    className={activeNav === '#home' ? 'header-links active-link' : 'header-links'}
                  >
                    Home
                  </a>
                </HashLink>
              </li>
              <li>
                <HashLink
                  to='/library'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => setActiveNav('#library')}
                >
                  <a
                    className={
                      activeNav === '#library' ? 'header-links active-link' : 'header-links'
                    }
                  >
                    Library
                  </a>
                </HashLink>
              </li>
              <li>
                <HashLink
                  to='/#faq'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => setActiveNav('#faq')}
                >
                  <a className={activeNav === '#faq' ? 'header-links active-link' : 'header-links'}>
                    FAQ
                  </a>
                </HashLink>
              </li>
              <li>
                <RouterLink
                  to='/upload'
                  onClick={() => setActiveNav(user?.verified ? '#upload' : '#home')}
                >
                  <a
                    className={
                      activeNav === '#upload' ? 'header-links active-link' : 'header-links'
                    }
                  >
                    Contribute
                  </a>
                </RouterLink>
              </li>
              <li>
                <RouterLink to='/scoreboard' onClick={() => setActiveNav('#scoreboard')}>
                  <a
                    className={
                      activeNav === '#scoreboard' ? 'header-links active-link' : 'header-links'
                    }
                  >
                    Leaderboard
                  </a>
                </RouterLink>
              </li>
            </ul>
          </div>
        ) : null}
        <div className='right-section' style={{ display: 'flex', gap: '30px' }}>
          <ButtonView />
        </div>
      </div>
    </header>
  );
};
