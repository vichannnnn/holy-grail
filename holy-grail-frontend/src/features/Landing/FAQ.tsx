import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '@providers';
import { useNavigation } from '@utils';
import './FAQ.css';

export const FAQ = () => {
  const { goToUploadPage, goToLoginPage } = useNavigation();
  const { user } = useContext(AuthContext);

  const handleUploadButtonClick = () => {
    if (user) {
      goToUploadPage();
    } else {
      goToLoginPage();
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
            Holy Grail is a collaborative initiative undertaken by a group of students in Singapore
            to compile a repository of notes and practice papers to support fellow students in their
            academic journey.
            <br></br>
            <br></br>
            The aim of this project is to reduce the gap in resources between students and level the
            playing field for everyone on a national scale.
          </p>
        </div>
        <div>
          <div className='faq__qn'>How did the Holy Grail come about?</div>
          <p className='faq__ans'>
            The project was initiated due to the absence of a suitable platform to store and access
            these educational resources.
            <br></br>
            <br></br>
            Initially stored in a collaborative Google Drive, a web application has since been
            developed to store and retrieve them much more conveniently and to make it more
            accessible, which is what you're seeing here now!
          </p>
        </div>
        <div>
          <div className='faq__qn'>How do I use the Holy Grail?</div>
          <p className='faq__ans'>
            You can access the resources uploaded at the{' '}
            <RouterLink to='/library' className='text__link'>
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
