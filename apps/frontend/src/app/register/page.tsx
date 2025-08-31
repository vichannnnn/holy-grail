import { AuthenticationLayout } from '@layouts/Authentication/AuthenticationLayout';

import { AccountRegister } from '@components/Authentication';

import { generateRegisterMetadata } from '@utils/metadata';

export const generateMetadata = generateRegisterMetadata;

const RegisterAccountPage = () => {
  return (
    <>
      <AuthenticationLayout>
        <AccountRegister />
      </AuthenticationLayout>
    </>
  );
};

export default RegisterAccountPage;
