import { AuthenticationLayout } from '@layouts/Authentication/AuthenticationLayout';

import { ForgotPassword } from '@components/Authentication';

const ForgotPasswordPage = () => {
  return (
    <>
      <AuthenticationLayout>
        <ForgotPassword />
      </AuthenticationLayout>
    </>
  );
};

export default ForgotPasswordPage;
