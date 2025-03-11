import { Divider } from '@mui/material';
import Link from 'next/link';

const LeftSection = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Link href='/' passHref>
        <img
          src='https://image.himaa.me/grail-chan-happy-v1.webp'
          alt='Holy Grail'
          height='96'
          width='96'
        />
      </Link>
      <div className='w-full max-w-md mt-4'>
        <p>
          Holy Grail is a completely free-to-access web library aimed at Singaporean students that
          houses all the summary notes and practice papers for GCE &apos;O&apos; Levels, GCE
          &apos;A&apos; Levels and International Baccalaureate.
        </p>
      </div>
    </div>
  );
};

const RightSection = () => {
  //TODO: Need to turn this into 2x2 grid when in mobile
  return (
    <div className='flex flex-col md:mx-auto'>
      <div className='flex flex-col gap-4 md:flex-row md:gap-12'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-bold text-hima-dark dark:text-hima-white'>Information</h3>
          <Link href='/' passHref>
            <p>Home</p>
          </Link>
          <Link href='/library' passHref>
            <p>Library</p>
          </Link>
          <Link href='/faq' passHref>
            <p>FAQ</p>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='font-bold text-hima-dark dark:text-hima-white'>Legal</h3>
          <Link href='/privacy' passHref>
            <p>Privacy Policy</p>
          </Link>
          <Link href='/terms-of-service' passHref>
            <p>Terms of Service</p>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='font-bold text-hima-dark dark:text-hima-white'>Contribute</h3>
          <Link href='/upload' passHref>
            <p>Upload</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-4/5 flex flex-col mx-auto items-center mb-16 mt-16'>
      <div className='flex flex-col md:flex-row gap-16 md:gap-0 w-full justify-between items-start'>
        <LeftSection />
        <RightSection />
      </div>
      <div className='w-full mt-3'>
        <Divider className='w-full border-t-2 border-t-gray-600 mt-4 mb-2' />
        <p>© 2023 - {currentYear} Holy Grail Team • Questions? Contact us at grail@himaa.me</p>
      </div>
    </footer>
  );
};
