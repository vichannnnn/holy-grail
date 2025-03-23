import { ResetPassword } from '@features/TokenVerification';

export async function generateMetadata() {
  return {
    title: 'Holy Grail - Reset Password',
    description:
      'Reset your Holy Grail account password securely. Follow the steps to regain access to your account and ensure your personal information stays protected.',
    openGraph: {
      title: 'Holy Grail - Reset Password',
      description:
        'Forgot your Holy Grail account password? No worries! Reset it securely and regain access in just a few simple steps.',
      images: [
        {
          url: '',
        },
      ],
    },
  };
}

const ResetPasswordPage = () => {
  return (
    <>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
