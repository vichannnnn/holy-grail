import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { DropdownProps } from "./types";

export function Dropdown({ header, content }: DropdownProps) {
	return (
		<Menu>
			<MenuButton className="inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-gray-200 dark:hover:bg-zinc-700 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer">
				{header}
			</MenuButton>

			<MenuItems
				transition
				anchor="bottom end"
				className="absolute right-0 mt-2 w-52 origin-top-right rounded-md border bg-white p-1 text-sm/6 text-gray-900 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 border-gray-200 dark:border-white/5 dark:bg-zinc-700 dark:text-white z-50"

			>
				{content.map((item, idx) => (
					<MenuItem key={`${item?.valueOf()}-${idx}`}>{item}</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
}
