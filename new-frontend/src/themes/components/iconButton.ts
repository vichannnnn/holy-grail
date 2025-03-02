export const iconButtonComponents = (isDarkMode: boolean) => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#e4e5f1',
            border: 'none',
          },
          '&:focus': {
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  };
};
