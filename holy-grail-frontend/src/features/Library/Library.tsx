import { useNavigation } from '@utils';
import { WelcomeBackHeader, TextLink } from '@components';
import { TextShowcase } from '@features';
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
          {/*<IllumeShowcase />*/}
          <TextShowcase />
        </div>
        <NotesApplication />
      </div>
    </>
  );
};
