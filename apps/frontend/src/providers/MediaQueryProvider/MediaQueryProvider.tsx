'use client';

import { createContext, ReactNode, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

export const MediaQueryContext = createContext({
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isXLarge: false,
  is2XLarge: false,
});

export const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
  const isSmall = useMediaQuery('(min-width: 640px)');
  const isMedium = useMediaQuery('(min-width: 768px)');
  const isLarge = useMediaQuery('(min-width: 1024px)');
  const isXLarge = useMediaQuery('(min-width: 1280px)');
  const is2XLarge = useMediaQuery('(min-width: 1536px)');

  const combinedValue = useMemo(
    () => ({
      isSmall,
      isMedium,
      isLarge,
      isXLarge,
      is2XLarge,
    }),
    [isSmall, isMedium, isLarge, isXLarge, is2XLarge],
  );

  return <MediaQueryContext.Provider value={combinedValue}>{children}</MediaQueryContext.Provider>;
};
