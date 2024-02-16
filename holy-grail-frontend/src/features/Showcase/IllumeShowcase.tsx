import { useContext, useRef, useEffect } from 'react';
import { adClick, adImpression } from '@api/analytics';
import { MediaQueryContext } from '@providers';
import { useNavigation } from '@utils';
import { InfoButton } from '@features';
import './IllumeShowcase.css';

const ADS_IMAGE_URL = 'https://document.grail.moe/holy-grail-x-illume-banner.gif';

export const IllumeShowcase = () => {
  const { isMobile } = useContext(MediaQueryContext);
  const { goToIllume } = useNavigation();
  const showcaseRef = useRef(null);

  const handleShowcaseClick = async () => {
    try {
      await adClick();
    } finally {
      goToIllume();
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
    <div
      className='illume-container'
      ref={showcaseRef}
      style={{ width: isMobile ? '100%' : '60%' }}
    >
      <div className='illume-showcase-image'>
        <a onClick={handleShowcaseClick} style={{ cursor: 'pointer' }}>
          <img alt='Illume Showcase here!' src={ADS_IMAGE_URL} width='100%'></img>
        </a>
        <InfoButton isMobile={isMobile} />
      </div>
    </div>
  );
};
