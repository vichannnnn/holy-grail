import { Button } from '@components';
import { useNavigation } from '@utils';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './DesktopHero.css';

export const DesktopHero = () => {
  const { goToLibrary, goToRegister } = useNavigation();

  return (
    <div className='desktop-outer-hero-container'>
      <div className='desktop-inner-hero-container'>
        <div className='desktop-left-hero'>
          <div>
            <h1>Access your notes you need in just a click.</h1>
            <p>
              Holy Grail is a completely free-to-access web library aimed at Singaporean students
              that houses all the summary notes and practice papers for GCE 'O' Levels, GCE 'A'
              Levels and International Baccalaureate.
            </p>
            <Button onClick={goToLibrary}>
              Head to the Library <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
            </Button>
          </div>
        </div>
        <div className='desktop-right-hero'>
          <img
            src='https://document.grail.moe/grail-chan-studying.png'
            alt='Studying'
            width='450'
          />
        </div>
      </div>
      <div className='desktop-inner-hero-container'>
        <div className='desktop-left-hero'>
          <img
            src='https://document.grail.moe/grail-chan-sparkling.png'
            alt='Sparkling'
            width='450'
          />
        </div>
        <div className='desktop-right-hero'>
          <div>
            <h1>Want to contribute?</h1>
            <p>
              Accessing notes is free for everyone in Holy Grail, even for those without an account,
              but if you want to contribute revision materials into the repository, you can log in
              or sign up for an account below to start contributing!
            </p>
            <Button onClick={goToRegister}>Click here to sign up!</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
