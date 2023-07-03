<<<<<<< HEAD
import { Link as RouterLink } from 'react-router-dom';
import { HomeButton } from '../../components/HomeButton/HomeButton';
import './notFound.css';

const NotFound = () => {
  return (
    <div className='notFound section container' id='notFound'>
      <div className='section__title'>Oops!</div>
      <div className='section__title'>404 - Page Not Found</div>
      <div className='notFound__content'>
        Looks like our electrons got tangled in a cosmic dance-off and lost their way. But don't
        worry, we'll have our astrophysicists recalibrate the coordinates to bring you back on
        track.
        <br />
        <br />
        Meanwhile, here are a few theories about the missing page:
        <br />
        <br />
        <ul className='notFound__list'>
          <li className='notFound__listItems'>
            Quantum Entanglement: The page might have become entangled with a mischievous particle,
            taking it to a parallel digital universe. Please standby while we decipher the complex
            quantum algorithms to retrieve it.
          </li>
          <li className='notFound__listItems'>
            Alien Abduction: Our extraterrestrial friends might have taken a keen interest in the
            page you sought, whisking it away to conduct advanced research on intergalactic
            information retrieval. We're negotiating with them for a prompt return.
          </li>
          <li className='notFound__listItems'>
            Wormhole Distortion: A temporal rift must have momentarily disrupted the space-time
            continuum, causing the page to slip through a wormhole. Our temporal engineers are
            working hard to reset the timeline and retrieve it for you.
          </li>
          <li className='notFound__listItems'>
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
        <HomeButton children='Back to home' />
=======
import React from "react";
import { Flex } from "@chakra-ui/react";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { Link as RouterLink } from "react-router-dom";
import { HomeButton } from "../../components/HomeButton/HomeButton";
import "./notFound.css"

const NotFound = () => {
  return (
    <div className="notFound section container" id="notFound">
        <div className="section__title">
          Oops!
        </div>
        <div className="section__title">404 - Page Not Found</div>
        <div className="notFound__content">
          Looks like our electrons got tangled in a cosmic dance-off and lost
          their way. But don't worry, we'll have our astrophysicists recalibrate
          the coordinates to bring you back on track.
          <br />
          <br />
          Meanwhile, here are a few theories about the missing page:
          <br />
          <br />
          <ul className="notFound__list">
            <li className="notFound__listItems">
              Quantum Entanglement: The page might have become entangled with a
              mischievous particle, taking it to a parallel digital universe. Please
              standby while we decipher the complex quantum algorithms to retrieve
              it.
            </li>
            <li className="notFound__listItems">
              Alien Abduction: Our extraterrestrial friends might have taken a keen
              interest in the page you sought, whisking it away to conduct advanced
              research on intergalactic information retrieval. We're negotiating
              with them for a prompt return.
            </li>
            <li className="notFound__listItems">
              Wormhole Distortion: A temporal rift must have momentarily disrupted
              the space-time continuum, causing the page to slip through a wormhole.
              Our temporal engineers are working hard to reset the timeline and
              retrieve it for you.
            </li>
            <li className="notFound__listItems">
              The Elusive Page Monster: Legends tell of a mysterious creature that
              roams the vast expanse of cyberspace, devouring unsuspecting webpages.
              Rest assured, we've dispatched our elite pixel hunters to track it
              down and bring back your missing page.
            </li>

          </ul>
          <br />
          In the meantime, feel free to explore our other stellar corners of the
          website or bask in the captivating void of this cosmic intermission.
          We apologize for the inconvenience and promise to return you to the
          digital cosmos as soon as possible.
          <br />
          <br />
          Remember, in the vastness of the internet, even lost pages can become
          legends. Hang tight, and we'll navigate this uncharted digital space
          together.
        </div>
      <br />
      <RouterLink to="/">
        <HomeButton children="Back to home" />
>>>>>>> bbe493b (new FE (desktop))
      </RouterLink>
    </div>
  );
};

export default NotFound;
