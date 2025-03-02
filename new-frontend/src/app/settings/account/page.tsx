import { AccountSettingsLayout } from '@layouts/Account';

export async function generateMetadata() {
  return {
    title: 'FastAPI Boilerplate - Account Settings',
    description:
      'Manage your account settings on FastAPI Boilerplate. Update personal details, notification preferences, and privacy settings to keep your account secure and up-to-date.',
    openGraph: {
      title: 'FastAPI Boilerplate - Account Settings',
      description:
        'Modify your personal details, notifications, and privacy preferences to enhance your experience on FastAPI Boilerplate.',
      images: [
        {
          url: 'https://bucket.tori.sg/TORI+LOGO+SECONDARY+FULL+COLOR+BLUE+TEXT%405x.png',
        },
      ],
    },
  };
}

const AccountSettingsPage = () => {
  return (
    <div className='min-h-screen w-full justify-center flex flex-row mb-32 mt-12'>
      <AccountSettingsLayout />
    </div>
  );
};

export default AccountSettingsPage;
