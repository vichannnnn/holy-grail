export const menuComponents = (isDarkMode: boolean) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"PlusJakartaSans", sans-serif',
          '& .MuiPaper-root': {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
          },
        },
      },
    },
  };
};
