import { ResetPassword } from '@features/TokenVerification';

export async function generateMetadata() {
  return {
    title: 'Hima Boilerplate - Reset Password',
    description:
      'Reset your Hima Boilerplate account password securely. Follow the steps to regain access to your account and ensure your personal information stays protected.',
    openGraph: {
      title: 'Hima Boilerplate - Reset Password',
      description:
        'Forgot your Hima Boilerplate account password? No worries! Reset it securely and regain access in just a few simple steps.',
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
