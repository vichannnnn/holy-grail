import { useNavigation } from '@utils';
import { WelcomeBackHeader, TextLink } from '@components';
// import { TextShowcase } from '@features';
import { FooterShowcase } from '@features';
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
          {/*<TextShowcase />*/}
          <p>
            General Paper December Crash Course / Resources:{' '}
            <a href="https://gp.sg/tuition" target="_blank" rel="noopener noreferrer">GP.sg/tuition</a> |{' '}
            <a href="https://instagram.com/generalpaper" target="_blank"
               rel="noopener noreferrer">instagram.com/generalpaper</a><br />
            Chat or study together with other students (Random/Anon on Telegram):{' '}
            <a href="https://t.me/juniorcollegebot" target="_blank" rel="noopener noreferrer">@JuniorCollegeBot</a> /
            <a href="https://t.me/jcchatbot" target="_blank" rel="noopener noreferrer">@JCchatbot</a> /
            <a href="https://t.me/SecondarySchoolBot" target="_blank"
               rel="noopener noreferrer">@SecondarySchoolBot</a><br />
            Student Discounts:{' '}
            <a href="https://t.me/ThisCounted" target="_blank" rel="noopener noreferrer">@ThisCounted</a>
          </p>

          <div className='library-showcase'>
            <FooterShowcase />
          </div>
        </div>
        <NotesApplication />
      </div>
    </>
  );
};
