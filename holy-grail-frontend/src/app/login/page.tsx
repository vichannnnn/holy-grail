import { AuthenticationLayout } from '@layouts/Authentication/AuthenticationLayout';

import { AccountLogin } from '@components/Authentication';

import { generateLoginMetadata } from '@utils/metadata';

export const generateMetadata = generateLoginMetadata;

const AccountLoginPage = () => {
  return (
    <>
      <AuthenticationLayout>
        <AccountLogin />
      </AuthenticationLayout>
    </>
  );
};

export default AccountLoginPage;
