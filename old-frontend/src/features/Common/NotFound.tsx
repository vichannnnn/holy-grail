import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@components';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className='not-found section container' id='not-found'>
      <div className='section-title'>Oops!</div>
      <div className='section-title'>404 - Page Not Found</div>
      <div className='not-found-content'>
        Looks like our electrons got tangled in a cosmic dance-off and lost their way. But don't
        worry, we'll have our astrophysicists recalibrate the coordinates to bring you back on
        track.
        <br />
        <br />
        Meanwhile, here are a few theories about the missing page:
        <br />
        <br />
        <ul className='not-found-list'>
          <li className='not-found-listItems'>
            Quantum Entanglement: The page might have become entangled with a mischievous particle,
            taking it to a parallel digital universe. Please standby while we decipher the complex
            quantum algorithms to retrieve it.
          </li>
          <li className='not-found-listItems'>
            Alien Abduction: Our extraterrestrial friends might have taken a keen interest in the
            page you sought, whisking it away to conduct advanced research on intergalactic
            information retrieval. We're negotiating with them for a prompt return.
          </li>
          <li className='not-found-listItems'>
            Wormhole Distortion: A temporal rift must have momentarily disrupted the space-time
            continuum, causing the page to slip through a wormhole. Our temporal engineers are
            working hard to reset the timeline and retrieve it for you.
          </li>
          <li className='not-found-listItems'>
            The Elusive Page Monster: Legends tell of a mysterious creature that roams the vast
            expanse of cyberspace, devouring unsuspecting webpages. Rest assured, we've dispatched
            our elite pixel hunters to track it down and bring back your missing page.
          </li>
        </ul>
        <br />
        In the meantime, feel free to explore our other stellar corners of the website or bask in
        the captivating void of this cosmic intermission. We apologize for the inconvenience and
        promise to return you to the digital cosmos as soon as possible.
        <br />
        <br />
        Remember, in the vastness of the internet, even lost pages can become legends. Hang tight,
        and we'll navigate this uncharted digital space together.
      </div>
      <br />
      <RouterLink to='/'>
        <Button children='Back to home' />
      </RouterLink>
    </div>
  );
};
