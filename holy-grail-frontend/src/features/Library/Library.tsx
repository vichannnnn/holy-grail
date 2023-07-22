import { useNavigation } from '@utils';
import { NotesApplication } from './NotesApplication';

export const Library = () => {
  const { goToUploadPage } = useNavigation();

  return (
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
      <NotesApplication />
    </section>
  );
};
