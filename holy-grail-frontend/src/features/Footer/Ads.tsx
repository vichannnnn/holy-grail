import { useContext } from 'react';
import { MediaQueryContext } from '@providers';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './Ads.css';

const ADS_IMAGE_URL = 'https://document.grail.moe/General+Paper+Ad.png';
const ADS_HYPERLINK_URL = 'https://GP.sg';

interface InfoButtonProps {
  isDesktop: boolean;
}

const InfoButton = ({ isDesktop }: InfoButtonProps) => {
  const iconButtonTop = isDesktop ? '12px' : '4px';
  return (
    <Tooltip
      title={
        <div>
          <div className='info_button_header'>
            <p>Why am I seeing this ad?</p>
          </div>
          <div className='info_button_description'>
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

export const Ads = () => {
  const { isDesktop } = useContext(MediaQueryContext);
  const openPopup = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <a
        href={ADS_HYPERLINK_URL}
        onClick={(e) => {
          e.preventDefault();
          openPopup(ADS_HYPERLINK_URL);
        }}
      >
        <img alt='GP Ads here!' src={ADS_IMAGE_URL} width={isDesktop ? '468' : '320'}></img>
      </a>
      <InfoButton isDesktop={isDesktop} />
    </div>
  );
};
