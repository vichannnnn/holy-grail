export const autocompleteComponents = (isDarkMode: boolean) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: { fontFamily: '"Poppins", sans-serif' },
        inputRoot: {
          '&[class*="MuiOutlinedInput-root"]': {
            fontFamily: '"Poppins", sans-serif',
          },
        },
        popper: {
          backgroundColor: isDarkMode ? '#2d2d2d' : '#e4e5f1',
        },
      },
    },
  };
};
