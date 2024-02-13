import { createContext, ReactNode, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

export const MediaQueryContext = createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  const combinedValue = useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
    }),
    [isMobile, isTablet, isDesktop],
  );

  return <MediaQueryContext.Provider value={combinedValue}>{children}</MediaQueryContext.Provider>;
};
