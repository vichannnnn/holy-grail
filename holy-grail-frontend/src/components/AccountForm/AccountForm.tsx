import { Box, BoxProps } from '@mui/material';

export const AccountForm = ({ children }: BoxProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '75%',
          margin: '5% auto 5% auto',
        }}
      >
        <Box>{children}</Box>
      </Box>
    </>
  );
};
