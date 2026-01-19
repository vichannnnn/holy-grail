import {
	House,
	Question,
	UploadSimple,
	UserPlus,
	Trophy,
	SignOut,
	FileText,
	UserCircle,
	SlidersHorizontal,
	Terminal,
} from "@phosphor-icons/react";
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
				<DropdownButton label="Home" icon={<House className="size-6" />} />
			</Link>
		),
	},
	library: {
		render: () => (
			<Link href="/library">
				<DropdownButton label="Library" icon={<FileText className="size-6" />} />
			</Link>
		),
	},
	faq: {
		render: () => (
			<Link href="/faq">
				<DropdownButton label="FAQ" icon={<Question className="size-6" />} />
			</Link>
		),
	},
	contribute: {
		render: () => (
			<Link href="/upload">
				<DropdownButton label="Contribute" icon={<UploadSimple className="size-6" />} />
			</Link>
		),
		needsRole: 1,
	},
	leaderboard: {
		render: () => (
			<Link href="/leaderboard">
				<DropdownButton label="Leaderboard" icon={<Trophy className="size-6" />} />
			</Link>
		),
	},
};

export const AUTH_LINKS = {
	signIn: { label: "Sign In", href: "/auth/sign-in" },
	register: { label: "Register", href: "/auth/register" },
} as const;

export const NEEDS_AUTH_DROPDOWN_INFO: Record<string, NavInfo> = {
	signIn: {
		render: () => (
			<Link href={AUTH_LINKS.signIn.href}>
				<DropdownButton
					label={AUTH_LINKS.signIn.label}
					icon={<SignOut className="size-6" />}
				/>
			</Link>
		),
	},
	register: {
		render: () => (
			<Link href={AUTH_LINKS.register.href}>
				<DropdownButton
					label={AUTH_LINKS.register.label}
					icon={<UserPlus className="size-6" />}
				/>
			</Link>
		),
	},
};

export const AUTHED_DROPDOWN_INFO: Record<string, NavInfo> = {
	profile: {
		render: () => (
			<Link href="/account">
				<DropdownButton label="Profile" icon={<UserCircle className="size-6" />} />
			</Link>
		),
		needsRole: RoleEnum.USER,
	},
	signOut: {
		render: () => (
			<DropdownButton
				label="Sign Out"
				icon={<SignOut className="size-6" />}
				onClick={async () => {
					await deleteUser();
					toast.success("Signed out successfully");
					window.location.href = "/";
				}}
			/>
		),
	},
	admin: {
		render: () => (
			<Link href="/admin">
				<DropdownButton label="Admin" icon={<SlidersHorizontal className="size-6" />} />
			</Link>
		),
		needsRole: RoleEnum.ADMIN,
	},
	developer: {
		render: () => (
			<Link href="/developer">
				<DropdownButton label="Developer" icon={<Terminal className="size-6" />} />
			</Link>
		),
		needsRole: RoleEnum.DEVELOPER,
	},
};
