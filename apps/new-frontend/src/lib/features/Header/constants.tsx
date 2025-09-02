import type { LinkData } from "./types";
import {
	HomeIcon,
	QuestionMarkCircleIcon,
	ArrowUpTrayIcon,
	UserPlusIcon,
	TrophyIcon,
	ArrowRightEndOnRectangleIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const NAV_LINKS: Record<string, LinkData> = {
	home: { label: "Home", href: "/", icon: <HomeIcon className="size-6" /> },
	library: { label: "Library", href: "/library", icon: <DocumentTextIcon className="size-6" /> },
	faq: { label: "FAQ", href: "/faq", icon: <QuestionMarkCircleIcon className="size-6" /> },
	contribute: {
		label: "Contribute",
		href: "/contribute",
		icon: <ArrowUpTrayIcon className="size-6" />,
	},
	leaderboard: {
		label: "Leaderboard",
		href: "/leaderboard",
		icon: <TrophyIcon className="size-6" />,
	},
};

export const AUTH_LINKS: Record<string, LinkData> = {
	signIn: {
		label: "Sign In",
		href: "/auth/signin",
		icon: <ArrowRightEndOnRectangleIcon className="size-6" />,
	},
	register: {
		label: "Register",
		href: "/auth/register",
		icon: <UserPlusIcon className="size-6" />,
	},
};
