export const inputComponents = (isDarkMode: boolean) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: { fontFamily: '"PlusJakartaSans", sans-serif' },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: { fontFamily: '"PlusJakartaSans", sans-serif' },
        inputRoot: {
          '&[class*="MuiOutlinedInput-root"]': {
            fontFamily: '"PlusJakartaSans", sans-serif',
          },
        },
        popper: {
          backgroundColor: isDarkMode ? '#2d2d2d' : '#e4e5f1',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontFamily: '"PlusJakartaSans", sans-serif' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontFamily: '"PlusJakartaSans", sans-serif' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontFamily: '"PlusJakartaSans", sans-serif' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { fontSize: '18px' },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          fontFamily: '"PlusJakartaSans", sans-serif',
          fontSize: '18px',
          color: '#949494',
        },
      },
    },
  };
};
