import { TextLink } from '@components';
import { useNavigation } from '@utils';

export const TextAds = () => {
  const { goToStudentsKahoot, goToSecondarySchoolBot, goToJCBot, goToJCChatBot, goToThisCounted } =
    useNavigation();

  return (
    <p>
      Check these out on Telegram! Weekly Kahoot (with prizes) based on O/N-Level, A-Level syllabus:{' '}
      <TextLink onClick={goToStudentsKahoot}>@studentskahoot</TextLink>
      <br></br>
      Chat or study together with other students:{' '}
      <TextLink onClick={goToJCBot}>@JuniorCollegeBot</TextLink> /{' '}
      <TextLink onClick={goToJCChatBot}>@JCchatbot</TextLink> /{' '}
      <TextLink onClick={goToSecondarySchoolBot}>@SecondarySchoolBot</TextLink>
      <br></br>
      Student Discounts: <TextLink onClick={goToThisCounted}>@ThisCounted</TextLink>
    </p>
  );
};
