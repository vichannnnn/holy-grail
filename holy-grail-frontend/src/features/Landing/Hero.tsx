import { useContext } from 'react';
import { AuthContext } from '@providers';
import './landing.css';

export const Hero = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <section className='home section container' id='home'>
      <div className='section__title'>
        <span>Hello</span>
        {user ? (
          <span> {user.username}, welcome back to the Holy Grail</span>
        ) : (
          <span>, welcome to the Holy Grail</span>
        )}
      </div>
      <div className='section__subtitle'>
        A central repository for your revision materials, consolidated into a library.
      </div>
      <hr className='horizontal-divider' />
      {/*  option to add a recently viewed section here right below the divider */}
    </section>
  );
};
