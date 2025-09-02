"use client";
import { Dropdown } from "@shared/ui/components";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ClientContext } from "@shared/ui/providers";
import { NAV_LINKS, AUTH_LINKS } from "./constants";
import Link from "next/link";

export function HeaderDropdown() {
	const { isMobile } = useContext(ClientContext);

	const links = isMobile ? { ...NAV_LINKS, ...AUTH_LINKS } : AUTH_LINKS;

	return (
		<Dropdown
			header={<Bars3Icon className="size-6 m-1 dark:stroke-white" />}
			content={Object.entries(links).map(([key, { label, href, icon }]) => (
				<Link
					key={key}
					href={href}
					className="block w-full px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-zinc-600"
				>
					{icon && <span className="inline-block mr-2 align-middle">{icon}</span>}
					<span className="align-middle">{label}</span>
				</Link>
			))}
		/>
	);
}
