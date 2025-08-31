export const paperComponents = (isDarkMode: boolean) => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#2d2d2d' : '#fcfbf8',
        },
      },
    },
  };
};
