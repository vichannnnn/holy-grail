import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import './TextLink.css';

interface TextLinkProps extends TypographyProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TextLink = ({ children, className, ...props }: TextLinkProps) => {
  const combinedClassName = `text-link ${className || ''}`.trim();
  return (
    <Typography component='a' className={combinedClassName} {...props}>
      {children}
    </Typography>
  );
};
