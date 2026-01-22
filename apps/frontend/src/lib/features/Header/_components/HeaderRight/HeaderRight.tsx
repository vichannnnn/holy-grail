"use client";
import type { HeaderRightProps } from "./types";
import { AUTH_LINKS, AUTHED_DROPDOWN_INFO, NEEDS_AUTH_DROPDOWN_INFO } from "./constants";
import Link from "next/link";
import { Button, Text } from "@shared/ui/components";
import { ClientContext } from "@shared/ui/providers";
import { useContext } from "react";
import { Dropdown } from "@shared/ui/components";
import { MobileDrawer } from "../MobileDrawer";

export function HeaderRight({ user }: HeaderRightProps) {
	const { isMobile } = useContext(ClientContext);

	const authContent = (
		<div className="flex flex-col gap-1">
			{Object.entries(AUTH_LINKS).map(([key, { label, href }]) => (
				<Link
					key={key}
					href={href}
					className="block px-4 py-3 rounded-lg text-navy/80 dark:text-cream/80 hover:text-navy dark:hover:text-cream hover:bg-cream-dark dark:hover:bg-navy font-medium transition-colors text-center"
				>
					{label}
				</Link>
			))}
		</div>
	);

	const userContent = (
		<div className="flex flex-col gap-1">
			{Object.entries(AUTHED_DROPDOWN_INFO).map(
				([key, { render, needsRole }]) =>
					(!needsRole || (user && user.role >= needsRole)) && <div key={key}>{render()}</div>,
			)}
		</div>
	);

	if (isMobile) {
		return <MobileDrawer user={user} authContent={authContent} userContent={userContent} />;
	}

	if (!user) {
		return (
			<div className="gap-1 items-center flex">
				{Object.entries(AUTH_LINKS).map(([key, { label, href }]) => (
					<Link key={key} href={href}>
						<Button
							variant="ghost"
							className="text-navy/70 hover:text-navy hover:bg-cream-dark dark:text-cream/70 dark:hover:text-cream dark:hover:bg-navy"
						>
							{label}
						</Button>
					</Link>
				))}
			</div>
		);
	}

	return (
		<Dropdown
			header={
				<Text className="text-navy/80 hover:text-navy hover:bg-cream-dark dark:text-cream/80 dark:hover:text-cream dark:hover:bg-navy inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
					{user.username}
				</Text>
			}
			content={Object.entries(AUTHED_DROPDOWN_INFO).map(
				([key, { render, needsRole }]) =>
					(!needsRole || (user && user.role >= needsRole)) && <div key={key}>{render()}</div>,
			)}
		/>
	);
}
