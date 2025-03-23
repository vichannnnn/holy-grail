import Link from 'next/link';

import { Button } from '@components/Button';

// TODO: Reuse this component
export async function generateMetadata() {
  return {
    title: 'Page Not Found - Holy Grail',
    description:
      'The page you are looking for could not be found. Please check the URL or return to the homepage of Holy Grail.',
    openGraph: {
      title: '404 - Page Not Found',
      description:
        'Oops! The page you are looking for does not exist. Return to the Holy Grail homepage.',
      images: [
        {
          url: 'https://bucket.tori.sg/TORI+LOGO+SECONDARY+FULL+COLOR+BLUE+TEXT%405x.png',
        },
      ],
    },
  };
}

const ReturnToHomeButton = () => {
  return (
    <Link href='/' passHref>
      <Button
        className='flex justify-center mx-auto'
        sx={{
          color: 'black',
          backgroundColor: '#FFA5A5',
          '&:hover': {
            backgroundColor: '#cc8484',
            border: 'none',
          },
        }}
      >
        Return to Home
      </Button>
    </Link>
  );
};

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center text-center mt-16'>
      <span className='text-6xl'>404</span>
      <h1 className='text-4xl font-bold mt-4 mb-4 text-white'>Oops! Page Not Found</h1>
      <p className='max-w-md mb-8 text-gray-400'>
        Looks like we&apos;re still cooking up this page. The content you&apos;re looking for might
        be simmering somewhere else.
      </p>

      <ReturnToHomeButton />
    </div>
  );
};

export default NotFound;
