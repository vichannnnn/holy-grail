import { VerifyEmail } from '@features/TokenVerification';

export async function generateMetadata() {
  return {
    title: 'Holy Grail - Verify Your Account',
    description: 'Verify your account on Holy Grail.',
    openGraph: {
      title: 'Holy Grail - Account Verification',
      description:
        'Complete your account verification on Holy Grail to explore. Verify your email and unlock access to our platform.',
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
