import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FadeIn from 'react-fade-in';

import { Button } from '@components/Button';

export const DesktopHero = () => {
  // TODO: Probably need to have a template for this pink styled button so we don't have to
  // TODO: keep redefining the same style

  return (
    <div className='flex flex-col w-4/5 m-auto gap-8'>
      <div className='flex flex-row gap-16'>
        <div className='m-auto'>
          <FadeIn>
            <h1 className='mb-4 text-3xl font-bold'>Access your notes you need in just a click.</h1>
            <p className='mb-4'>
              Holy Grail is a completely free-to-access web library aimed at Singaporean students
              that houses all the summary notes and practice papers for GCE &#39;O&#39; Levels, GCE
              &#39;A&#39; Levels and International Baccalaureate.
            </p>
          </FadeIn>
          <Button
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
            <p>
              Head to the Library <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
            </p>
          </Button>
        </div>
        <img src='/trimmy-grail-chan-studying.webp' alt='Studying' width='300' />
      </div>
      <div className='flex flex-row gap-16'>
        <img src='/trimmy-grail-chan-sparkling.webp' alt='Sparkling' width='300' />
        <div className='m-auto gap-4'>
          <FadeIn>
            <h1 className='mb-4 text-3xl font-bold'>Want to contribute?</h1>
            <p className='mb-4'>
              Accessing notes is free for everyone in Holy Grail, even for those without an account,
              but if you want to contribute revision materials into the repository, you can log in
              or sign up for an account below to start contributing!
            </p>
          </FadeIn>
          <Button
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
            <p>Click here to sign up!</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
