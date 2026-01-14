"use client";
import type { HeaderRightProps } from "./types";
import {
	AUTH_LINKS,
	NAV_DROPDOWN_INFO,
	AUTHED_DROPDOWN_INFO,
	NEEDS_AUTH_DROPDOWN_INFO,
} from "./constants";
import Link from "next/link";
import { Button, Text } from "@shared/ui/components";
import { ClientContext } from "@shared/ui/providers";
import { useContext } from "react";
import { Dropdown } from "@shared/ui/components";
import { List } from "@phosphor-icons/react";

export function HeaderRight({ user }: HeaderRightProps) {
	const { isMobile } = useContext(ClientContext);

	// Mobile view
	if (isMobile) {
		const toRender = user
			? { ...NAV_DROPDOWN_INFO, ...AUTHED_DROPDOWN_INFO }
			: { ...NAV_DROPDOWN_INFO, ...NEEDS_AUTH_DROPDOWN_INFO };
		return (
			<Dropdown
				header={<List className="size-6 m-1 dark:text-white" />}
				content={Object.entries(toRender).map(
					([key, { render, needsRole }]) =>
						(!needsRole || (user && user.role >= needsRole)) && <div key={key}>{render()}</div>,
				)}
			/>
		);
	}

	// Desktop view

	if (!user) {
		// render sign in / sign up buttons if screensize is large
		// otherwise render dropdown with sign in / sign up links
		return (
			<>
				<div className="gap-1 items-center hidden lg:flex">
					{Object.entries(AUTH_LINKS).map(([key, { label, href }]) => (
						<Link key={key} href={href}>
							<Button variant="ghost">{label}</Button>
						</Link>
					))}
				</div>
				<div className="lg:hidden">
					<Dropdown
						header={<List className="size-6 m-1 dark:text-white" />}
						content={Object.entries(NEEDS_AUTH_DROPDOWN_INFO).map(([key, { render }]) => (
							<div key={key}>{render()}</div>
						))}
					/>
				</div>
			</>
		);
	}
	// if screen is large show username dropdown, otherwise show hamburger menu with dropdown
	return (
		<Dropdown
			header={
				<>
					<div className="hidden lg:block">
						<Text className="text-pink-700 hover:bg-pink-100 focus-visible:ring-pink-500 dark:bg-transparent dark:text-pink-200 dark:hover:bg-zinc-700 dark:focus-visible:ring-pink-400 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-0 transition cursor-pointer">
							{user.username}
						</Text>
					</div>
					<div className="lg:hidden">
						<List className="size-6 m-1 dark:text-white" />
					</div>
				</>
			}
			content={Object.entries(AUTHED_DROPDOWN_INFO).map(
				([key, { render, needsRole }]) =>
					(!needsRole || (user && user.role >= needsRole)) && <div key={key}>{render()}</div>,
			)}
		/>
	);
}
