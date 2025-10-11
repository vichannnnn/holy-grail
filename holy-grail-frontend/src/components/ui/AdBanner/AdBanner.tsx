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
      slotProps={{
        popper: {
          sx: {
            zIndex: 9999,
          },
        },
        tooltip: {
          sx: {
            pointerEvents: 'auto',
          },
        },
      }}
      componentsProps={{
        tooltip: {
          sx: {
            pointerEvents: 'auto',
          },
        },
      }}
      sx={{
        pointerEvents: 'none',
      }}
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
          zIndex: 50,
          pointerEvents: 'auto',
          '&:focus': { outline: 'none' },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple
        onClick={(e) => e.stopPropagation()}
      >
        <InfoIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export const AdBanner = ({ imageUrl, linkUrl, altText }: AdBannerProps) => {
  const { isMedium } = useContext(MediaQueryContext);

  const bannerRef = useRef(null);

  const handleBannerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    adClick();
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
      <div className='w-full md:w-1/2 relative' style={{ pointerEvents: 'auto' }}>
        <a
          href={linkUrl}
          target='_blank'
          rel='noopener noreferrer'
          onClick={handleBannerClick}
          className='cursor-pointer block w-full'
          style={{
            touchAction: 'manipulation',
            WebkitTouchCallout: 'default',
            WebkitUserSelect: 'none',
          }}
        >
          <img alt={altText} src={imageUrl} className='w-full block' />
        </a>
        <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '40px', height: '40px' }}>
          <InfoButton isMobile={isMedium} />
        </div>
      </div>
    </div>
  );
};
