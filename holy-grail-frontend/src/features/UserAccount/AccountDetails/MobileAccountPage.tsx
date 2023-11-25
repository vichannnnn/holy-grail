import { AccountDetails, UpdatePassword, UpdateEmail } from '@features';
import './AccountDetails.css';
import '../UserAccountForm.css';

export const MobileAccountPage = () => {
  return (
    <div className='account-details-container'>
      <div className='account-details-main'>
        <div className='account-form-title'>Edit Account</div>
        <div className='account-form-subtitle'>View, edit and update your account here!</div>
        <hr className='account-divider-mobile' />
        <AccountDetails />
        <UpdateEmail />
        <hr className='account-divider-mobile' />
        <UpdatePassword />
      </div>
    </div>
  );
};
