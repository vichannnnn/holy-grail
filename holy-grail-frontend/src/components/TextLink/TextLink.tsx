import { Typography, TypographyProps } from '@mui/material';

type TextLinkProps = TypographyProps & {
  children: string;
};

export const TextLink = ({ children, ...props }: TextLinkProps) => {
  return (
    <Typography className='text__link' sx={{ cursor: 'pointer', display: 'inline' }} {...props}>
      {children}
    </Typography>
  );
};
