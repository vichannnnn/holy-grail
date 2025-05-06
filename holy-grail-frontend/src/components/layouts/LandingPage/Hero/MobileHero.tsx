import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FadeIn from 'react-fade-in';

import { Button } from '@components/Button';

import { useNavigate } from '@utils/navigation';

export const MobileHero = () => {
  // TODO: Need to have a component for the landing text and image so that we do not redefine
  // TODO: for mobile and desktop, thoughts?
  const router = useNavigate();

  const handleRedirectToLibrary = () => {
    router.navigateTo('/library');
  };

  const handleRedirectToLogin = () => {
    router.navigateTo('/login');
  };

  return (
    <div className='flex flex-col w-4/5 m-auto gap-4 items-center text-center'>
      <img src='/trimmy-grail-chan-studying.webp' alt='Studying' width='300' />
      <FadeIn>
        <h1 className='mb-4 text-3xl font-bold'>Access your notes you need in just a click.</h1>
        <p className='mb-4'>
          Holy Grail is a completely free-to-access web library aimed at Singaporean students that
          houses all the summary notes and practice papers for GCE &#39;O&#39; Levels, GCE
          &#39;A&#39; Levels and International Baccalaureate.
        </p>
      </FadeIn>
      <Button
        onClick={handleRedirectToLibrary}
        variant='contained'
        sx={{
          '& p, & span': { color: '#484b6a' },
          backgroundColor: '#FFA5A5',
          '&:hover': {
            backgroundColor: '#cc8484',
            border: 'none',
          },
        }}
      >
        Head to the Library <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
      </Button>
      <img src='/trimmy-grail-chan-sparkling.webp' alt='Sparkling' width='300' />
      <FadeIn>
        <h1 className='mb-4 text-3xl font-bold'>Want to contribute?</h1>
        <p className='mb-4'>
          Accessing notes is free for everyone in Holy Grail, even for those without an account, but
          if you want to contribute revision materials into the repository, you can log in or sign
          up for an account below to start contributing!
        </p>
      </FadeIn>
      <Button
        onClick={handleRedirectToLogin}
        variant='contained'
        sx={{
          '& p, & span': { color: '#484b6a' },
          backgroundColor: '#FFA5A5',
          '&:hover': {
            backgroundColor: '#cc8484',
            border: 'none',
          },
        }}
      >
        Click here to sign up!
      </Button>
    </div>
  );
};
