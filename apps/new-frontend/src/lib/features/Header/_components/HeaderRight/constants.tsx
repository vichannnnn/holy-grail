import {
	HomeIcon,
	QuestionMarkCircleIcon,
	ArrowUpTrayIcon,
	UserPlusIcon,
	TrophyIcon,
	ArrowRightEndOnRectangleIcon,
	DocumentTextIcon,
	UserCircleIcon,
	AdjustmentsHorizontalIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { DropdownButton } from "./DropdownButton";
import type { NavInfo } from "./types";

export const NAV_DROPDOWN_INFO: Record<string, NavInfo> = {
	home: {
		render: () => (
			<Link href="/" className="block lg:hidden">
				<DropdownButton label="Home" icon={<HomeIcon className="size-6" />} />
			</Link>
		),
	},
	library: {
		render: () => (
			<Link href="/library" className="block lg:hidden">
				<DropdownButton label="Library" icon={<DocumentTextIcon className="size-6" />} />
			</Link>
		),
	},
	faq: {
		render: () => (
			<Link href="/faq" className="block lg:hidden">
				<DropdownButton label="FAQ" icon={<QuestionMarkCircleIcon className="size-6" />} />
			</Link>
		),
	},
	contribute: {
		render: () => (
			<Link href="/contribute" className="block lg:hidden">
				<DropdownButton label="Contribute" icon={<ArrowUpTrayIcon className="size-6" />} />
			</Link>
		),
		needsRole: 1,
	},
	leaderboard: {
		render: () => (
			<Link href="/leaderboard" className="block lg:hidden">
				<DropdownButton label="Leaderboard" icon={<TrophyIcon className="size-6" />} />
			</Link>
		),
	},
};

export const NEEDS_AUTH_DROPDOWN_INFO: Record<string, NavInfo> = {
	signIn: {
		render: () => (
			<Link href="/auth/signin" className="block lg:hidden">
				<DropdownButton
					label="Sign In"
					icon={<ArrowRightEndOnRectangleIcon className="size-6" />}
				/>
			</Link>
		),
	},
	register: {
		render: () => (
			<Link href="/auth/register" className="block lg:hidden">
				<DropdownButton label="Register" icon={<UserPlusIcon className="size-6" />} />
			</Link>
		),
	},
};

export const AUTHED_DROPDOWN_INFO: Record<string, NavInfo> = {
	profile: {
		render: () => (
			<Link href="/profile" className="block lg:hidden">
				<DropdownButton label="Profile" icon={<UserCircleIcon className="size-6" />} />
			</Link>
		),
		needsRole: 1,
	},
	signOut: {
		render: () => (
			<DropdownButton
				label="Sign Out"
				icon={<ArrowRightEndOnRectangleIcon className="size-6" />}
				onClick={() => console.log("sign out")}
			/>
		),
	},
	admin: {
		render: () => (
			<Link href="/admin" className="block lg:hidden">
				<DropdownButton label="Admin" icon={<AdjustmentsHorizontalIcon className="size-6" />} />
			</Link>
		),
		needsRole: 2,
	},
	developer: {
		render: () => (
			<Link href="/developer" className="block lg:hidden">
				<DropdownButton label="Developer" icon={<ExclamationTriangleIcon className="size-6" />} />
			</Link>
		),
		needsRole: 3,
	},
};

export const AUTH_LINKS = {
	signIn: { label: "Sign In", href: "/auth/signin" },
	register: { label: "Register", href: "/auth/register" },
} as const;
