import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '@providers';
import { Ads } from './Ads';
import './Footer.css';

export const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Ads />
      <footer className='footer'>
        <div className='footer-container'>
          <div className='footer-logo-section'>
            <img
              className='footer-logo-image'
              src='https://document.grail.moe/grail-chan-happy.png'
              alt=''
            />
          </div>
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
        {/*<div className='footer-copyright-section'>*/}
        {/*  &#169; 2023 Holy Grail Team • Questions? Contact us at grail@himaa.me*/}
        {/*</div>*/}
      </footer>
    </>
  );
};
