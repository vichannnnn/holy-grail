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
import { deleteUser } from "@lib/auth/deleteUser";
import toast from "react-hot-toast";
import { RoleEnum } from "@lib/auth/constants";

export const NAV_DROPDOWN_INFO: Record<string, NavInfo> = {
	home: {
		render: () => (
			<Link href="/">
				<DropdownButton label="Home" icon={<HomeIcon className="size-6" />} />
			</Link>
		),
	},
	library: {
		render: () => (
			<Link href="/library">
				<DropdownButton label="Library" icon={<DocumentTextIcon className="size-6" />} />
			</Link>
		),
	},
	faq: {
		render: () => (
			<Link href="/faq">
				<DropdownButton label="FAQ" icon={<QuestionMarkCircleIcon className="size-6" />} />
			</Link>
		),
	},
	contribute: {
		render: () => (
			<Link href="/upload">
				<DropdownButton label="Contribute" icon={<ArrowUpTrayIcon className="size-6" />} />
			</Link>
		),
		needsRole: 1,
	},
	leaderboard: {
		render: () => (
			<Link href="/leaderboard">
				<DropdownButton label="Leaderboard" icon={<TrophyIcon className="size-6" />} />
			</Link>
		),
	},
};

export const NEEDS_AUTH_DROPDOWN_INFO: Record<string, NavInfo> = {
	signIn: {
		render: () => (
			<Link href="/auth/signin">
				<DropdownButton
					label="Sign In"
					icon={<ArrowRightEndOnRectangleIcon className="size-6" />}
				/>
			</Link>
		),
	},
	register: {
		render: () => (
			<Link href="/auth/register">
				<DropdownButton label="Register" icon={<UserPlusIcon className="size-6" />} />
			</Link>
		),
	},
};

export const AUTHED_DROPDOWN_INFO: Record<string, NavInfo> = {
	profile: {
		render: () => (
			<Link href="/profile">
				<DropdownButton label="Profile" icon={<UserCircleIcon className="size-6" />} />
			</Link>
		),
		needsRole: RoleEnum.USER,
	},
	signOut: {
		render: () => (
			<DropdownButton
				label="Sign Out"
				icon={<ArrowRightEndOnRectangleIcon className="size-6" />}
				onClick={async () => {
					await deleteUser();
					toast.success("Signed out successfully");
				}}
			/>
		),
	},
	admin: {
		render: () => (
			<Link href="/admin">
				<DropdownButton label="Admin" icon={<AdjustmentsHorizontalIcon className="size-6" />} />
			</Link>
		),
		needsRole: RoleEnum.ADMIN,
	},
	developer: {
		render: () => (
			<Link href="/developer">
				<DropdownButton label="Developer" icon={<ExclamationTriangleIcon className="size-6" />} />
			</Link>
		),
		needsRole: RoleEnum.DEVELOPER,
	},
};

export const AUTH_LINKS = {
	signIn: { label: "Sign In", href: "/auth/signin" },
	register: { label: "Register", href: "/auth/register" },
} as const;
