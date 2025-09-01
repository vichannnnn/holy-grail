export const typography = () => {
	return {
		fontFamily: '"PlusJakartaSans", sans-serif',
		h1: { fontFamily: '"PatrickHandSC", cursive' },
		h2: { fontFamily: '"PatrickHandSC", cursive' },
		h3: { fontFamily: '"PatrickHandSC", cursive' },
	};
};

export const typographyComponents = () => {
	return {
		MuiTypography: {
			styleOverrides: {
				root: { fontFamily: '"PlusJakartaSans", sans-serif' },
			},
		},
	};
};
