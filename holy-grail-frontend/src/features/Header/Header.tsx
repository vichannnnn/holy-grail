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
      <nav className='nav container grid'>
        <RouterLink className='nav__logo' to='/'>
          <img
            className='nav__logo__image'
            src='https://document.grail.moe/grail-chan-happy.png'
            alt=''
          />
        </RouterLink>
        {isDesktop ? (
          <div className='nav__menu'>
            <ul className='nav__list grid'>
              <li className='nav__item'>
                <HashLink
                  to='/'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => {
                    setActiveNav('#home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <a className={activeNav === '#home' ? 'nav__link active-link' : 'nav__link'}>
                    Home
                  </a>
                </HashLink>
              </li>
              <li className='nav__item'>
                <HashLink
                  to='/library'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => setActiveNav('#library')}
                >
                  <a className={activeNav === '#library' ? 'nav__link active-link' : 'nav__link'}>
                    Library
                  </a>
                </HashLink>
              </li>
              <li className='nav__item'>
                <HashLink
                  to='/#faq'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => setActiveNav('#faq')}
                >
                  <a className={activeNav === '#faq' ? 'nav__link active-link' : 'nav__link'}>
                    FAQ
                  </a>
                </HashLink>
              </li>
              <li className='nav__item'>
                <RouterLink
                  to='/upload'
                  onClick={() => setActiveNav(user?.verified ? '#upload' : '#home')}
                >
                  <a className={activeNav === '#upload' ? 'nav__link active-link' : 'nav__link'}>
                    Contribute
                  </a>
                </RouterLink>
              </li>
            </ul>
          </div>
        ) : null}
        <div className='right-section' style={{ display: 'flex', gap: '30px' }}>
          <ButtonView />
        </div>
      </nav>
    </header>
  );
};
