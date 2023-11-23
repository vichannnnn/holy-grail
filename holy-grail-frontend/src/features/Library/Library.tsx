import { useNavigation } from '@utils';
import { WelcomeBackHeader, TextLink } from '@components';
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
        </div>

        <div className='library-subtitle'>
          <p>
            Check these out on Telegram! Weekly Kahoot (with prizes) based on O/N-Level, A-Level
            syllabus: @studentskahoot
            <br></br>
            Chat or study together with other students: @JuniorCollegeBot / @JCchatbot /
            @SecondarySchoolBot
            <br></br>
            Student Discounts: @ThisCounted
          </p>
        </div>
        <NotesApplication />
      </div>
      <NotesApplication />
    </>
  );
};
