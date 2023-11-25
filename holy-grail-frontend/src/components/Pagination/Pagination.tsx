import { useContext } from 'react';
import { Button } from '../Button';
import { Stack, Typography } from '@mui/material';
import { MediaQueryContext } from '@providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import debounce from 'lodash/debounce';

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (newPage: number) => void;
  styles?: { mt: string };
}

export const Pagination = ({ pageInfo, handlePageChange, styles }: PaginationProps) => {
  const debouncedHandlePageChange = debounce(handlePageChange, 100);
  const { isDesktop } = useContext(MediaQueryContext);
  const responsiveMt = isDesktop ? '4%' : '20%';

  return (
    <Stack
      spacing={2}
      direction='row'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: styles?.mt ? styles.mt : responsiveMt,
      }}
    >
      <Button
        onClick={() => debouncedHandlePageChange(pageInfo.page - 1)}
        disabled={pageInfo.page === 1}
        variant='outlined'
      >
        <FontAwesomeIcon icon={faChevronLeft} /> Prev
      </Button>
      <Typography display='flex' alignItems='center'>
        Page {pageInfo.page} of {pageInfo.pages > 0 ? pageInfo.pages : 1}
      </Typography>
      <Button
        onClick={() => debouncedHandlePageChange(pageInfo.page + 1)}
        disabled={pageInfo.page === pageInfo.pages || pageInfo.pages === 0}
        variant='outlined'
      >
        Next <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </Stack>
  );
};
