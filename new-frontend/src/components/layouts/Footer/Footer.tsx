import { Divider } from '@mui/material';
import Link from 'next/link';

const LeftSection = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Link href='/' passHref>
        <img
          src='/HimariLogoPrimaryLilac.png'
          alt='Footer Logo'
          className='w-40 h-auto md:w-60 md:h-auto lg:w-72 lg:h-auto'
        />
      </Link>
      <div className='w-full max-w-md mt-4'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a turpis nunc. In
          ultrices malesuada ante, et porta augue mollis porttitor. Vestibulum sed lorem vel elit
          porttitor dignissim. Maecenas vitae mauris risus.
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
        <div className='flex flex-col gap-3'>
          <h3 className='font-bold text-hima-dark dark:text-hima-white'>Company</h3>
          <Link href='/privacy' passHref>
            <p>Privacy Policy</p>
          </Link>
          <Link href='/terms-of-service' passHref>
            <p>Terms of Service</p>
          </Link>
        </div>
        <div className='flex flex-col gap-3'>
          <h3 className='font-bold text-hima-dark dark:text-hima-white'>Product</h3>
          <Link href='/subscription' passHref>
            <p>Pricing</p>
          </Link>
        </div>
        <div className='flex flex-col gap-3'>
          <h3 className='font-bold text-hima-dark dark:text-hima-white'>Support</h3>
          <Link href='mailto:violet@himari.sg' passHref>
            <p>Email</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className='w-4/5 flex flex-col mx-auto items-center mb-16 mt-16'>
      <div className='flex flex-col md:flex-row gap-16 md:gap-0 w-full justify-between items-start'>
        <LeftSection />
        <RightSection />
      </div>
      <div className='w-full'>
        <Divider className='w-full border-t-2 border-t-gray-600 mt-4 mb-2' />
        <p>
          © 2025 Hima Boilerplate - All rights reserved. • Questions or business enquiries? Send an
          email to violet@himari.sg
        </p>
      </div>
    </footer>
  );
};
