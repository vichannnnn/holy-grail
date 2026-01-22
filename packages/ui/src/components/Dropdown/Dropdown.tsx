import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { DropdownProps } from "./types";

export function Dropdown({ header, content, ...rest }: Readonly<DropdownProps>) {
	return (
		<Menu>
			<MenuButton
				className="inline-flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber hover:bg-cream-dark dark:hover:bg-navy disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
				{...rest}
			>
				{header}
			</MenuButton>

			<MenuItems
				transition
				anchor="bottom end"
				className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border bg-cream/95 backdrop-blur-md p-2 text-sm transition duration-150 ease-out [--anchor-gap:--spacing(2)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 border-navy/10 shadow-xl shadow-navy/10 dark:border-cream/10 dark:bg-navy-deep/95 dark:shadow-black/20 z-50"
			>
				{content.map((item, idx) => (
					<MenuItem key={`${item?.valueOf()}-${idx}`} as="div">
						{item}
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
}
