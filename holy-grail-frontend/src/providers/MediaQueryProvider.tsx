import React, { createContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

const MediaQueryContext = createContext({ isDesktop: false });

export const MediaQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 600px)');

  return <MediaQueryContext.Provider value={{ isDesktop }}>{children}</MediaQueryContext.Provider>;
};

export default MediaQueryContext;
