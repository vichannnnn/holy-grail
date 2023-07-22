import { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { MediaQueryContext } from '@providers';
import debounce from 'lodash/debounce';

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (newPage: number) => void;
  styles?: { mt: string };
}

export const Pagination = ({ pageInfo, handlePageChange, styles }: PaginationProps) => {
  const debouncedHandlePageChange = debounce(handlePageChange, 100);
  const buttonStyles = {
    borderColor: 'transparent',
    backgroundColor: 'rgb(237, 242, 247)',
    textTransform: 'capitalize',
    color: 'black',
    fontWeight: 'bold',
    aspectRatio: 1.618,
    borderRadius: '10%',
  };

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
        sx={buttonStyles}
      >
        Prev
      </Button>
      <Typography display='flex' alignItems='center'>
        Page {pageInfo.page} of {pageInfo.pages > 0 ? pageInfo.pages : 1}
      </Typography>
      <Button
        onClick={() => debouncedHandlePageChange(pageInfo.page + 1)}
        disabled={pageInfo.page === pageInfo.pages || pageInfo.pages === 0}
        variant='outlined'
        sx={buttonStyles}
      >
        Next
      </Button>
    </Stack>
  );
};
