import { createContext, ReactNode } from 'react';
import { useMediaQuery } from '@mui/material';

export const MediaQueryContext = createContext({ isDesktop: false });

export const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 600px)');

  return <MediaQueryContext.Provider value={{ isDesktop }}>{children}</MediaQueryContext.Provider>;
};
