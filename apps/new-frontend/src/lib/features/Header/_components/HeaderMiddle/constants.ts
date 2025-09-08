import type { HeaderLinkProps } from "./types";

export const NAV_LINKS: Record<string, HeaderLinkProps> = {
	home: { label: "Home", href: "/" },
	library: { label: "Library", href: "/library" },
	faq: { label: "FAQ", href: "/faq" },
	contribute: {
		label: "Contribute",
		href: "/upload",
	},
	leaderboard: {
		label: "Leaderboard",
		href: "/leaderboard",
	},
};
