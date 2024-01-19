import { MouseEventHandler } from 'react';
import { TextLink } from '@components';
import { useNavigation } from '@utils';
import { adClick } from '@api/analytics';

export const TextShowcase = () => {
  const { goToStudentsKahoot, goToSecondarySchoolBot, goToJCBot, goToJCChatBot, goToThisCounted } =
    useNavigation();

  const handleShowcaseClick = async (navigate: () => void) => {
    try {
      await adClick();
    } finally {
      navigate();
    }
  };

  const handleClick = (navigate: () => void): MouseEventHandler<HTMLAnchorElement> => {
    return (event) => {
      event.preventDefault();
      handleShowcaseClick(navigate);
    };
  };

  return (
    <p>
      Check these out on Telegram! Weekly Kahoot (with prizes) based on O/N-Level, A-Level syllabus:{' '}
      <TextLink onClick={handleClick(goToStudentsKahoot)}>@studentskahoot</TextLink>
      <br></br>
      Chat or study together with other students:{' '}
      <TextLink onClick={handleClick(goToJCBot)}>@JuniorCollegeBot</TextLink> /{' '}
      <TextLink onClick={handleClick(goToJCChatBot)}>@JCchatbot</TextLink> /{' '}
      <TextLink onClick={handleClick(goToSecondarySchoolBot)}>@SecondarySchoolBot</TextLink>
      <br></br>
      Student Discounts: <TextLink onClick={handleClick(goToThisCounted)}>@ThisCounted</TextLink>
    </p>
  );
};
