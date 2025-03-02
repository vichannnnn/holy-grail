export const listComponents = (isDarkMode: boolean) => {
  return {
    MuiList: {
      styleOverrides: {
        root: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
    },

    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: '"PlusJakartaSans", sans-serif',
          backgroundColor: isDarkMode ? '#2d2d2d' : '#e4e5f1',
          color: isDarkMode ? '#e4e5f1' : '#2d2d2d',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingBottom: 8,
          paddingTop: 0,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: '"PlusJakartaSans", sans-serif',
          color: isDarkMode ? '#e4e5f1' : '#2d2d2d',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
    },
  };
};
