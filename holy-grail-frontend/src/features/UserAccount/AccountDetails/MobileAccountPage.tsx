import { AccountDetails, UpdatePassword, UpdateEmail } from '@features';
import './AccountDetails.css';

export const MobileAccountPage = () => {
  return (
    <div className='account-details-container'>
      <div className='account-details-main'>
        <div className='section__title'>Edit Account</div>
        <div className='section__subtitle'>View, edit and update your account here!</div>
        <hr className='account-divider-mobile' />
        <AccountDetails />
        <UpdateEmail />
        <hr className='account-divider-mobile' />
        <UpdatePassword />
      </div>
    </div>
  );
};
