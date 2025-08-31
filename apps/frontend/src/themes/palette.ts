import { PaletteOptions } from '@mui/material';

export const palette = (isDarkMode: boolean): PaletteOptions => {
  return {
    mode: isDarkMode ? 'dark' : 'light',
    text: {
      primary: isDarkMode ? '#949494' : '#2d2d2d',
    },
  };
};
