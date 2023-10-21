import { createContext, ReactNode, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

export const MediaQueryContext = createContext({ isDesktop: false });

export const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const value = useMemo(() => ({ isDesktop }), [isDesktop]);

  return <MediaQueryContext.Provider value={value}>{children}</MediaQueryContext.Provider>;
};
