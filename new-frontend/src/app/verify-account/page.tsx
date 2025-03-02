import { VerifyEmail } from '@features/TokenVerification';

export async function generateMetadata() {
  return {
    title: 'Hima Boilerplate - Verify Your Account',
    description: 'Verify your account on Hima Boilerplate.',
    openGraph: {
      title: 'Hima Boilerplate - Account Verification',
      description:
        'Complete your account verification on Hima Boilerplate to explore. Verify your email and unlock access to our platform.',
      images: [
        {
          url: '',
        },
      ],
    },
  };
}

const AccountVerifyPage = () => {
  return (
    <>
      <VerifyEmail />
    </>
  );
};

export default AccountVerifyPage;
