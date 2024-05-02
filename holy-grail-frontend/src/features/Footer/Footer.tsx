import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FooterShowcase } from '../Showcase';
import { AuthContext } from '@providers';
import './Footer.css';

export const Footer = () => {
  const { user } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();

  return (
    <div className='footer-with-showcase'>
      <FooterShowcase />
      <footer className='footer'>
        <div className='footer-logo-section'>
          <img
            className='footer-logo-image'
            src='https://image.himaa.me/trimmy-illume-grail-chan-happy-v2.png'
            alt=''
          />
        </div>
        <div className='footer-container'>
          <div>
            <div className='footer-title'>Information</div>
            <div className='footer-content'>
              <RouterLink to='/#home'>Home</RouterLink>
            </div>
            <div className='footer-content'>
              <RouterLink to='/library'>Library</RouterLink>
            </div>
            <div className='footer-content'>
              <RouterLink to='/#FAQ'>FAQ</RouterLink>
            </div>
          </div>
          <div>
            <div className='footer-title'>Contribute</div>
            <div className='footer-content'>
              <RouterLink to='/upload'>Upload</RouterLink>
            </div>
          </div>
          <div>
            <div className='footer-title'>Account</div>
            <div className='footer-content' style={user ? { display: 'none' } : undefined}>
              <RouterLink to='/login'>Log In</RouterLink>
            </div>
            <div className='footer-content' style={user ? { display: 'none' } : undefined}>
              <RouterLink to='/register'>Register</RouterLink>
            </div>
            <div className='footer-content' style={user ? undefined : { display: 'none' }}>
              <RouterLink to='/account'>Account Settings</RouterLink>
            </div>
          </div>
        </div>
        <div className='footer-copyright-section'>
          &#169; 2023 - {currentYear} Holy Grail Team • Questions? Contact us at grail@himaa.me
        </div>
      </footer>
    </div>
  );
};
