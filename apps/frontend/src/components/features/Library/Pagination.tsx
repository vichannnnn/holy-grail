import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack } from '@mui/material';
import debounce from 'lodash/debounce';
import { useContext } from 'react';

import { Button } from '@components/Button';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (newPage: number) => void;
  styles?: { mt: string };
}

export const Pagination = ({ pageInfo, handlePageChange, styles }: PaginationProps) => {
  const debouncedHandlePageChange = debounce(handlePageChange, 100);
  const { isMedium } = useContext(MediaQueryContext);
  const responsiveMt = isMedium ? '4%' : '20%';

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
        variant='text'
        className={`${pageInfo.page === 1 ? 'cursor-not-allowed' : ''}`}
      >
        <p className={`${pageInfo.page === 1 ? 'text-gray-300' : ''}`}>
          <FontAwesomeIcon icon={faChevronLeft} /> Prev
        </p>
      </Button>

      <p className='flex items-center justify-center w-[120px]'>
        Page {pageInfo.page} of {pageInfo.pages > 0 ? pageInfo.pages : 1}
      </p>

      <Button
        onClick={() => debouncedHandlePageChange(pageInfo.page + 1)}
        disabled={pageInfo.page === pageInfo.pages || pageInfo.pages === 0}
        variant='text'
      >
        <p
          className={`${pageInfo.page === pageInfo.pages || pageInfo.pages === 0 ? 'text-gray-300' : ''}`}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </p>
      </Button>
    </Stack>
  );
};
