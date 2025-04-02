import { Typography, TypographyProps } from '@mui/material';

export const Title = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      fontWeight='bold'
      fontSize={['xl', '3xl', '5xl', '7xl']}
      color='black'
      lineHeight='1'
      {...props}
    >
      {children}
    </Typography>
  );
};
