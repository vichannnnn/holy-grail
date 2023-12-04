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
    <section className='faq-container' id='faq'>
      <div className='faq-title'>Frequently Asked Questions</div>
      <div className='faq-description'>
        Quick answers to questions you may have. Can't find what you're looking for? Send the
        administrators a message through the relevant channels.
      </div>
      <div className='faq-qna-section'>
        <div>
          <div className='faq-question'>What is the Holy Grail?</div>
          <p className='faq-answer'>
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
          <div className='faq-question'>How did the Holy Grail come about?</div>
          <p className='faq-answer'>
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
          <div className='faq-question'>How do I use the Holy Grail?</div>
          <p className='faq-answer'>
            You can access the resources uploaded at the{' '}
            <RouterLink to='/library' className='text-link'>
              Library
            </RouterLink>{' '}
            above this section. Anyone is able to freely access these resources even without having
            an account.
          </p>
        </div>
        <div>
          <div className='faq-question'>How can I contribute my materials?</div>
          <p className='faq-answer'>
            You can upload the notes that you want to share over{' '}
            <a onClick={handleUploadButtonClick} className='text-link'>
              here
            </a>
            . Do note that you can only upload PDF files and you will need an account to start
            uploading your notes. They will only be available to the public after approval.
          </p>
        </div>
        <div>
          <div className='faq-question'>Will the Holy Grail always be free?</div>
          <p className='faq-answer'>
            Yes. The entire project and application is done out of initiative and will always be
            free. This means that content and resources such as contributed notes and practice
            papers will never be behind a paywall.
          </p>
        </div>
        <div>
          <div className='faq-question'>How are you guys sustaining this project then?</div>
          <p className='faq-answer'>
            Aside from free time spent in development for this project, we are currently incurring
            monthly costs such as infrastructure and hosting that is being paid from our own pocket
            thus far.
            <br></br>
            <br></br>
            With that being said, as of November 2023, we are collaborating with sponsors that are
            helping us with the costs in exchange for displaying advertisements for their services.
            The remainders will go into development effort for more features in the near future
            (circa 2024).
          </p>
        </div>
      </div>
    </section>
  );
};
