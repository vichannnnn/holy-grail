'use client';

import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useRef } from 'react';

import { adClick, adImpression } from '@api/analytics';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

interface AdBannerProps {
  imageUrl: string;
  linkUrl: string;
  altText: string;
}

interface InfoButtonProps {
  isMobile: boolean;
}

const InfoButton = ({ isMobile }: InfoButtonProps) => {
  return (
    <Tooltip
      enterTouchDelay={0}
      title={
        <div>
          <div className='text-base'>
            <p>Why am I seeing this ad?</p>
          </div>
          <div className='text-base mt-2'>
            <p>
              This is an advertisement from our sponsor to help with our hosting and infrastructure
              cost in keeping this project alive.
            </p>
          </div>
        </div>
      }
      arrow
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: isMobile ? '-4px' : '2px',
          left: isMobile ? '-4px' : 0,
          padding: '4px 4px',
          backgroundColor: 'transparent',
          opacity: 0.9,
          fontSize: '16px',
          '&:focus': { outline: 'none' },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple
      >
        <InfoIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export const AdBanner = ({ imageUrl, linkUrl, altText }: AdBannerProps) => {
  const { isMedium } = useContext(MediaQueryContext);

  const bannerRef = useRef(null);

  const handleBannerClick = async () => {
    try {
      await adClick();
    } finally {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await adImpression();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, [bannerRef]);

  return (
    <div className='flex flex-col justify-center items-center gap-4 my-8' ref={bannerRef}>
      <div className='w-full md:w-1/2 relative flex'>
        <a onClick={handleBannerClick} className='cursor-pointer'>
          <img alt={altText} src={imageUrl} className='w-full' />
        </a>
        <InfoButton isMobile={isMedium} />
      </div>
    </div>
  );
};
