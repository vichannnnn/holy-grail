import Logo from '../../assets/placeholder.svg';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import './footer.css';

export const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <img className='footer__logoImg' src={Logo} alt='' />
        <div className='footer__sectionContainer container grid'>
          <div className='footer__section'>
            <div className='footer__title'>Information</div>
            <div className='footer__content'>
              <RouterLink to='/#home'>Home</RouterLink>
            </div>
            <div className='footer__content'>
              <RouterLink to='/#library'>Library</RouterLink>
            </div>
            <div className='footer__content'>
              <RouterLink to='/#FAQ'>FAQ</RouterLink>
            </div>
          </div>
          <div className='footer__section'>
            <div className='footer__title'>Account</div>
            <div className='footer__content' style={user ? { display: 'none' } : undefined}>
              <RouterLink to='/login'>Log In</RouterLink>
            </div>
            <div className='footer__content' style={user ? { display: 'none' } : undefined}>
              <RouterLink to='/register'>Register</RouterLink>
            </div>
            <div className='footer__content' style={user ? undefined : { display: 'none' }}>
              <RouterLink to='/update-password'>Change Password</RouterLink>
            </div>
          </div>
        </div>
        <span className='footer__copy'>&#169; 2023 Holy Grail Team</span>
      </div>
    </footer>
  );
};
