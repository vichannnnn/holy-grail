import { AnchorHTMLAttributes, ReactNode } from 'react';
import './TextLink.css';

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
}

export const TextLink = ({ children, className, ...props }: TextLinkProps) => {
  const combinedClassName = `text-link ${className || ''}`.trim();
  return (
    <a className={combinedClassName} {...props}>
      {children}
    </a>
  );
};
