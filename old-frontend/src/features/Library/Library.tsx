import { useNavigation } from '@utils';
import { WelcomeBackHeader, TextLink } from '@components';
// import { TextShowcase } from '@features';
import { FooterShowcase } from '@features';
import { NotesApplication } from './NotesApplication';
import './Library.css';

export const Library = () => {
  const { goToUploadPage } = useNavigation();

  return (
    <>
      <div className='library-container' id='library'>
        <WelcomeBackHeader />
        <div className='library-title'>Library</div>
        <div className='library-subtitle'>
          View materials or contribute <TextLink onClick={goToUploadPage}>here</TextLink> after you
          have logged in (subjected to approval of administrators).
          <p>
            Are you a tuition centre or freelance tutor looking to expand your reach?
            <br/>
            We have one of the largest student-focused audiences in Singapore.
            <br/>
            Interested sponsors and advertisers, please contact us at <strong>grail@himaa.me</strong> to explore partnership opportunities.
          </p>

          <div className='library-showcase'>
            <FooterShowcase />
          </div>
        </div>
        <NotesApplication />
      </div>
    </>
  );
};
