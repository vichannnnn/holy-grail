import { AspectRatio } from '@chakra-ui/react';
import { Stack, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import debounce from 'lodash/debounce';
import { useMediaQuery } from 'react-responsive';

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (newPage: number) => void;
  styles?: { mt: string };
}

export const Pagination = ({ pageInfo, handlePageChange, styles }: PaginationProps) => {
  const debouncedHandlePageChange = debounce(handlePageChange, 100);
  const muiTheme = createTheme();
  const buttonStyles = {
    borderColor: 'transparent',
    backgroundColor: 'rgb(237, 242, 247)',
    textTransform: 'capitalize',
    color: 'black',
    fontWeight: 'bold',
    aspectRatio: 1.618,
    borderRadius: '10%',
  };

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const responsiveMt = isMobile ? '20%' : '4%';

  return (
    <ThemeProvider theme={muiTheme}>
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
    </ThemeProvider>
  );
};
