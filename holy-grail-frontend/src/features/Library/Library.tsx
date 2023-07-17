import { NotesApplication } from './NotesApplication';
import { useNavigate } from 'react-router-dom';

export const Library = () => {
  const navigate = useNavigate();

  return (
    <section className='library section container' id='library'>
      <div>
        <div className='sub-section__title'>Library</div>
        <div className='section__subtitle'>
          View materials or contribute{' '}
          <a onClick={() => navigate('/upload')} className='text__link'>
            here
          </a>{' '}
          after you have logged in (subjected to approval of administrators).
        </div>
      </div>
      <NotesApplication />
    </section>
  );
};
