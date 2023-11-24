import { useNavigation } from '@utils';
import { WelcomeBackHeader, TextLink } from '@components';
import { NotesApplication } from './NotesApplication';
import './Library.css';

export const Library = () => {
  const {
    goToUploadPage,
    goToStudentsKahoot,
    goToSecondarySchoolBot,
    goToJCBot,
    goToJCChatBot,
    goToThisCounted,
  } = useNavigation();

  return (
    <>
      <div className='library-container' id='library'>
        <WelcomeBackHeader />
        <div className='library-title'>Library</div>
        <div className='library-subtitle'>
          View materials or contribute <TextLink onClick={goToUploadPage}>here</TextLink> after you
          have logged in (subjected to approval of administrators).
          <p>
            Check these out on Telegram! Weekly Kahoot (with prizes) based on O/N-Level, A-Level
            syllabus: <TextLink onClick={goToStudentsKahoot}>@studentskahoot</TextLink>
            <br></br>
            Chat or study together with other students:{' '}
            <TextLink onClick={goToJCBot}>@JuniorCollegeBot</TextLink> /{' '}
            <TextLink onClick={goToJCChatBot}>@JCchatbot</TextLink> /{' '}
            <TextLink onClick={goToSecondarySchoolBot}>@SecondarySchoolBot</TextLink>
            <br></br>
            Student Discounts: <TextLink onClick={goToThisCounted}>@ThisCounted</TextLink>
          </p>
        </div>
        <NotesApplication />
      </div>
    </>
  );
};
