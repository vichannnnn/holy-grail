import { AuthenticationLayout } from '@layouts/Authentication/AuthenticationLayout';

import { AccountRegister } from '@components/Authentication';

const CreateAccountPage = () => {
  return (
    <>
      <AuthenticationLayout>
        <AccountRegister />
      </AuthenticationLayout>
    </>
  );
};

export default CreateAccountPage;
