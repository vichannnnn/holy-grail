import { Button } from '@components';
import { useNavigation } from '@utils';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const LibraryButton = () => {
  const { goToLibrary } = useNavigation();

  return (
    <Button onClick={goToLibrary}>
      Head to the Library <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
    </Button>
  );
};
