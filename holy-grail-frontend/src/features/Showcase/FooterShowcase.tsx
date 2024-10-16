import { useContext, useRef, useEffect } from 'react';
import { adClick, adImpression } from '@api/analytics';
import { MediaQueryContext } from '@providers';
import { useNavigation } from '@utils';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './FooterShowcase.css';

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
          <div className='info-button-header'>
            <p>Why am I seeing this ad?</p>
          </div>
          <div className='info-button-description'>
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

export const FooterShowcase = () => {
  const { isMobile } = useContext(MediaQueryContext);
  const { goToToriSoup } = useNavigation();
  const showcaseRef = useRef(null);

  const handleShowcaseClick = async () => {
    try {
      await adClick();
    } finally {
      goToToriSoup();
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
    <div className='showcase-container' ref={showcaseRef}>
      <div className='showcase-image'>
        <a onClick={handleShowcaseClick} style={{ cursor: 'pointer' }}>
          <img alt='Tori Soup' src={ADS_IMAGE_URL} width='100%' />
        </a>
        <InfoButton isMobile={isMobile} />
      </div>
    </div>
  );
};
