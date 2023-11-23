import { useNavigation } from '@utils';
import { NotesApplication } from './NotesApplication';
import { Hero } from './Hero';

export const Library = () => {
  const { goToUploadPage } = useNavigation();

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
            syllabus: @studentskahoot
            <br></br>
            Chat or study together with other students: @JuniorCollegeBot / @JCchatbot /
            @SecondarySchoolBot
            <br></br>
            Student Discounts: @ThisCounted
          </p>
        </div>
        <NotesApplication />
      </section>
    </div>
  );
};
