import { useNavigation } from '@utils';
import { NotesApplication } from './NotesApplication';
import { Hero } from './Hero';
import { TextLink } from '@components';

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
    <div>
      <Hero />
      <section className='library section container' id='library'>
        <div>
          <div className='sub-section__title'>Library</div>
          <div className='section__subtitle'>
            View materials or contribute{' '}
            <a onClick={goToUploadPage} className='text__link'>
              here
            </a>{' '}
            after you have logged in (subjected to approval of administrators).
          </div>
        </div>
        <div className='section__subtitle'>
          <p>
            Check these out on Telegram! Weekly Kahoot (with prizes) based on O/N-Level, A-Level
            syllabus:{' '}
            <a className='text__link' onClick={goToStudentsKahoot}>
              @studentskahoot
            </a>
            <br></br>
            Chat or study together with other students:{' '}
            <a className='text__link' onClick={goToJCBot}>
              @JuniorCollegeBot
            </a>{' '}
            /{' '}
            <a className='text__link' onClick={goToJCChatBot}>
              @JCchatbot
            </a>{' '}
            /{' '}
            <a className='text__link' onClick={goToSecondarySchoolBot}>
              @SecondarySchoolBot
            </a>
            <br></br>
            Student Discounts:{' '}
            <a className='text__link' onClick={goToThisCounted}>
              @ThisCounted
            </a>
          </p>
        </div>
        <NotesApplication />
      </section>
    </div>
  );
};
