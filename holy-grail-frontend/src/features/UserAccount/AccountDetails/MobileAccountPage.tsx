import { AccountDetails, UpdatePassword, UpdateEmail } from '@features';
import './Account.css';

export const MobileAccountPage = () => {
  return (
    <section className='section container account__page'>
      <div className='account__main'>
        <div className='section__title'>Edit Account</div>
        <div className='section__subtitle'>View, edit and update your account here!</div>
        <hr className='account__divider__mobile' />
        <AccountDetails />
        <UpdateEmail />
        <hr className='account__divider__mobile' />
        <UpdatePassword />
      </div>
    </section>
  );
};
