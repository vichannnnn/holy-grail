export const appBarComponents = () => {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
      defaultProps: {
        color: 'transparent' as 'transparent',
        elevation: 0,
      },
    },
  };
};
