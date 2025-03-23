import { AuthenticationLayout } from '@layouts/Authentication/AuthenticationLayout';

import { AccountLogin } from '@components/Authentication';

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
