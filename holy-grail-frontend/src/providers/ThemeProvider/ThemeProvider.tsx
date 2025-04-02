'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import {
  appBarComponents,
  autocompleteComponents,
  buttonComponents,
  chipComponents,
  iconButtonComponents,
  inputComponents,
  linkComponents,
  listComponents,
  menuComponents,
  paperComponents,
  tabComponents,
  textFieldComponents,
} from '@themes/components';
import { palette } from '@themes/palette';
import { typography, typographyComponents } from '@themes/typography';
import { ReactNode, useContext, useMemo } from 'react';

import { DarkModeContext } from '@providers/DarkModeProvider';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: typography(),
        palette: palette(isDarkMode),
        components: {
          ...typographyComponents(),
          ...appBarComponents(),
          ...autocompleteComponents(isDarkMode),
          ...buttonComponents(),
          ...chipComponents(),
          ...iconButtonComponents(isDarkMode),
          ...inputComponents(isDarkMode),
          ...linkComponents(),
          ...listComponents(isDarkMode),
          ...menuComponents(isDarkMode),
          ...paperComponents(isDarkMode),
          ...tabComponents(isDarkMode),
          ...textFieldComponents(),
        },
      }),
    [isDarkMode],
  );

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};
