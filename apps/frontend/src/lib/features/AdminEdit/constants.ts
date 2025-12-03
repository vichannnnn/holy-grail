const YEAR_RANGE = [2008, new Date().getFullYear() + 1];

export const MAPPED_YEAR_RANGE = Array.from(
	{ length: YEAR_RANGE[1] - YEAR_RANGE[0] + 1 },
	(_, i) => YEAR_RANGE[1] - i,
).map((year) => ({ id: year, name: String(year) }));
