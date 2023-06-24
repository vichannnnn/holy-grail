import { Box, BoxProps } from '@mui/material';

export const AccountForm = ({ children }: BoxProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          minHeight: '85vh',
          margin: '10% auto 10% auto',
        }}
      >
        <Box sx={{ textAlign: 'left' }}>{children}</Box>
      </Box>
    </>
  );
};
