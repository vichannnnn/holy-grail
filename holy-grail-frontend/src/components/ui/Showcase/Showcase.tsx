'use client';

import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useRef } from 'react';

import { adClick, adImpression } from '@api/analytics';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

const ADS_IMAGE_URL = 'https://image.himaa.me/tori-soup-banner-v1.png';

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

export const Showcase = () => {
  const { isMedium } = useContext(MediaQueryContext);

  const showcaseRef = useRef(null);

  const handleShowcaseClick = async () => {
    try {
      await adClick();
    } finally {
      window.open('https://tori.sg', '_blank', 'noopener,noreferrer');
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

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, [showcaseRef]);

  return (
    <div className='flex flex-col justify-center items-center gap-4' ref={showcaseRef}>
      <div className='w-1/2 relative flex'>
        <a onClick={handleShowcaseClick} className='cursor-pointer'>
          <img alt='Tori Soup' src={ADS_IMAGE_URL} className='w-full' />
        </a>
        <InfoButton isMobile={isMedium} />
      </div>
    </div>
  );
};
