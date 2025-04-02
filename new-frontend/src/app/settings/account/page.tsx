import { AccountSettingsLayout } from '@layouts/Account';

import { generateAccountSettingsMetadata } from '@utils/metadata';

export const generateMetadata = generateAccountSettingsMetadata;

const AccountSettingsPage = () => {
  return (
    <div className='min-h-screen w-full justify-center flex flex-row mb-32 mt-12'>
      <AccountSettingsLayout />
    </div>
  );
};

export default AccountSettingsPage;
