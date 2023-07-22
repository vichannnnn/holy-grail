import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@providers';
import './landing.css';

export const FAQ = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUploadButtonClick = () => {
    if (user) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className='faq section container' id='faq'>
      <div className='sub-section__title'>Frequently Asked Questions</div>
      <div className='section__subtitle'>
        Quick answers to questions you may have. Can't find what you're looking for? Send the
        administrators a message through the relevant channels.
      </div>
      <div className='faq__container container grid'>
        <div>
          <div className='faq__qn'>What is the Holy Grail?</div>
          <p className='faq__ans'>
            Holy Grail is a collaborative initiative undertaken by students to compile a repository
            of notes and practice papers to support fellow students in their academic journey.
          </p>
        </div>
        <div>
          <div className='faq__qn'>How did the Holy Grail come about?</div>
          <p className='faq__ans'>
            The project was initiated due to the absence of a suitable platform to store and access
            these educational resources.
          </p>
        </div>
        <div>
          <div className='faq__qn'>How do I use the Holy Grail?</div>
          <p className='faq__ans'>
            You can access the resources uploaded at the{' '}
            <RouterLink to='/#library' className='text__link'>
              Library
            </RouterLink>{' '}
            above this section. Anyone is able to freely access these resources even without having
            an account.
          </p>
        </div>
        <div>
          <div className='faq__qn'>How can I contribute my materials?</div>
          <p className='faq__ans'>
            You can upload the notes that you want to share over{' '}
            <a onClick={handleUploadButtonClick} className='text__link'>
              here
            </a>
            . Do note that you can only upload PDF files and you will need an account to start
            uploading your notes. They will only be available to the public after approval.
          </p>
        </div>
        <div>
          <div className='faq__qn'>Will the Holy Grail always be free?</div>
          <p className='faq__ans'>
            Yes. The entire project and application is done out of initiative and will always be
            free.
          </p>
        </div>
      </div>
    </section>
  );
};
