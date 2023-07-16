import { Typography, TypographyProps } from '@mui/material';

type TextLinkProps = TypographyProps & {
  children: string;
};

export const TextLink = ({ children, ...props }: TextLinkProps) => {
  return (
    <Typography sx={{ cursor: 'pointer' }} {...props}>
      {children}
    </Typography>
  );
};
