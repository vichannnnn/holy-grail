import { useContext } from 'react';
import { MediaQueryContext } from '@providers';
import { useNavigation } from '@utils';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './FooterAds.css';

const ADS_IMAGE_URL = 'https://document.grail.moe/General+Paper+Ad.png';

interface InfoButtonProps {
  isDesktop: boolean;
}

const InfoButton = ({ isDesktop }: InfoButtonProps) => {
  const iconButtonTop = isDesktop ? '12px' : '4px';

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
          top: iconButtonTop,
          left: 0,
          padding: '8px 4px 4px 4px',
          backgroundColor: 'transparent',
          opacity: 0.9,
          '&:focus': { outline: 'none' },
        }}
        disableRipple
      >
        <InfoIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export const FooterAds = () => {
  const { isDesktop } = useContext(MediaQueryContext);
  const { goToGP } = useNavigation();

  return (
    <div className='ads-container'>
      <div className='ads-image'>
        <a onClick={goToGP} style={{ cursor: 'pointer' }}>
          <img alt='GP Ads here!' src={ADS_IMAGE_URL} width={isDesktop ? '468' : '320'}></img>
        </a>
        <InfoButton isDesktop={isDesktop} />
      </div>
    </div>
  );
};
