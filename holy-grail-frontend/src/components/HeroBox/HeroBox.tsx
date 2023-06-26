import { Box, BoxProps } from '@mui/material';

export const HeroBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box sx={{ width: '30%' }} {...props}>
      {children}
    </Box>
  );
};
