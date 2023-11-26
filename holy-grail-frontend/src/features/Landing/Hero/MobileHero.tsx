import { Button } from '@components';
import { useNavigation } from '@utils';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './MobileHero.css';

export const MobileHero = () => {
  const { goToLibrary, goToRegister } = useNavigation();

  return (
    <div className='mobile-hero-container'>
      <div>
        <img src='https://document.grail.moe/grail-chan-studying.png' alt='Studying' />
        <h1>Access your notes you need in just a click.</h1>
        <p>
          Holy Grail is a completely free-to-access web library aimed at Singaporean students that
          houses all the summary notes and practice papers for GCE 'O' Levels, GCE 'A' Levels and
          International Baccalaureate.
        </p>
        <div className='hero-button-container'>
          <Button onClick={goToLibrary}>
            Head to the Library <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
          </Button>
        </div>
      </div>
      <div>
        <img src='https://document.grail.moe/grail-chan-sparkling.png' alt='Sparkling' />
        <h1>Want to contribute?</h1>
        <p>
          Accessing notes is free for everyone in Holy Grail, even for those without an account, but
          if you want to contribute revision materials into the repository, you can log in or sign
          up for an account below to start contributing!
        </p>
        <div className='hero-button-container'>
          <Button onClick={goToRegister}>Click here to sign up!</Button>
        </div>
      </div>
    </div>
  );
};
