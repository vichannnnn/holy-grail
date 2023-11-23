import { useContext } from 'react';
import { AuthContext } from '@providers';
import './WelcomeBackHeader.css';

export const WelcomeBackHeader = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className='title'>
        <span>Hello, </span>
        <span>
          {user ? `${user.username}, welcome back to the Holy Grail` : 'welcome to the Holy Grail'}
        </span>
      </div>
      <div className='subtitle'>
        A central repository for your revision materials, consolidated into a library.
      </div>
      <hr className='horizontal-divider' />
    </div>
  );
};
