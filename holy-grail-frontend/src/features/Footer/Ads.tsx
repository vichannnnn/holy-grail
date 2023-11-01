const ADS_IMAGE_URL = 'https://document.grail.moe/General+Paper+Ad.png';
const ADS_HYPERLINK_URL = 'https://GP.sg';

export const Ads = () => {
  return (
    <>
      <a href={ADS_HYPERLINK_URL}>
        <img alt='' src={ADS_IMAGE_URL} width='480' height='60'></img>
      </a>
    </>
  );
};
