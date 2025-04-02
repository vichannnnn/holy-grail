import Image from 'next/image';
import { useContext } from 'react';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

export const Illustration = () => {
  const { isMedium } = useContext(MediaQueryContext);

  return (
    <div className='flex items-center justify-center md:h-screen bg-[#eff3fd] dark:bg-[#484b6a]'>
      {isMedium && (
        <Image src='/trimmy-grail-chan-studying.webp' alt='Logo' width={400} height={400} />
      )}
    </div>
  );
};
