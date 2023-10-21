import { createContext, ReactNode, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

export const MediaQueryContext = createContext({
  isDesktop: false,
  isDesktop768: false,
});

export const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 913px)');
  const isDesktop768 = useMediaQuery('(min-width: 768px)');

  const combinedValue = useMemo(
    () => ({
      isDesktop,
      isDesktop768,
    }),
    [isDesktop, isDesktop768],
  );

  return <MediaQueryContext.Provider value={combinedValue}>{children}</MediaQueryContext.Provider>;
};
