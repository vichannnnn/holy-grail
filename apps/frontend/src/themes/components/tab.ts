export const tabComponents = (isDarkMode: boolean) => {
	return {
		MuiTab: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					color: "#9c9c9c",
					textTransform: "none",
					fontFamily: '"Poppins", sans-serif',
					"&.Mui-selected": { color: "#FFA5A5" },
					"&:hover": { backgroundColor: isDarkMode ? "#2d2d2d" : "#e4e5f1" },
					variants: [],
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					backgroundColor: "#FFA5A5",
					height: "4px",
				},
			},
		},
	};
};
