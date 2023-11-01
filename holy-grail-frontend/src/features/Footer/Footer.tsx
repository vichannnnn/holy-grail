import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '@providers';
import { Grid } from '@mui/material';
import './footer.css';
import { Ads } from './Ads';

export const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className='ads__container'>
        <Ads />
      </div>
      <footer className='footer'>
        <Grid container className='footer__container'>
          <Grid container item className='footer__section'>
            <Grid item className='footer__logo'>
              <img
                className='footer__logo__image'
                src='https://document.grail.moe/grail-chan-happy.png'
                alt=''
              />
            </Grid>
            <Grid item container xs={12} md={2} className='footer__column'>
              <Grid item className='footer__title'>
                Information
              </Grid>
              <Grid item className='footer__content'>
                <RouterLink to='/#home'>Home</RouterLink>
              </Grid>
              <Grid item className='footer__content'>
                <RouterLink to='/library'>Library</RouterLink>
              </Grid>
              <Grid item className='footer__content'>
                <RouterLink to='/#FAQ'>FAQ</RouterLink>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={2} className='footer__column'>
              <Grid item className='footer__title'>
                Contribute
              </Grid>
              <Grid item className='footer__content'>
                <RouterLink to='/upload'>Upload</RouterLink>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={2} className='footer__column'>
              <Grid item className='footer__title'>
                Account
              </Grid>
              <Grid item className='footer__content' style={user ? { display: 'none' } : undefined}>
                <RouterLink to='/login'>Log In</RouterLink>
              </Grid>
              <Grid item className='footer__content' style={user ? { display: 'none' } : undefined}>
                <RouterLink to='/register'>Register</RouterLink>
              </Grid>
              <Grid item className='footer__content' style={user ? undefined : { display: 'none' }}>
                <RouterLink to='/account'>Account Settings</RouterLink>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className='footer__copyright'>
            &#169; 2023 Holy Grail Team • Questions? Contact us at grail@himaa.me
          </Grid>
        </Grid>
      </footer>
    </>
  );
};
