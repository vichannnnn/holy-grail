import { MouseEventHandler } from 'react';
import { TextLink } from '@components';
import { adClick } from '@api/analytics';
import { useNavigation } from '@utils';

export const TextShowcase = () => {
  const {
    goToInstagram,
    goToSecondarySchoolBot,
    goToJCBot,
    goToJCChatBot,
    goToThisCounted,
    goToGP,
  } = useNavigation();

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
      General Paper resources / tuition sign-up:{' '}
      <TextLink onClick={handleClick(goToGP)}>GP.sg</TextLink> |{' '}
      <TextLink onClick={handleClick(goToInstagram)}>instagram.com/generalpaper</TextLink>
      <br></br>
      Chat or study together with other students (Random/Anon on Telegram):{' '}
      <TextLink onClick={handleClick(goToJCBot)}>@JuniorCollegeBot</TextLink> /{' '}
      <TextLink onClick={handleClick(goToJCChatBot)}>@JCchatbot</TextLink> /{' '}
      <TextLink onClick={handleClick(goToSecondarySchoolBot)}>@SecondarySchoolBot</TextLink>
      <br></br>
      Student Discounts: <TextLink onClick={handleClick(goToThisCounted)}>@ThisCounted</TextLink>
    </p>
  );
};
