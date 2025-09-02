import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { DropdownProps } from "./types";

export default function Dropdown({ header, content }: DropdownProps) {
	return (
		<Menu>
			<MenuButton
				className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white
          bg-white text-gray-900 shadow-black/10 data-hover:bg-gray-100 data-open:bg-gray-100
          dark:bg-gray-800 dark:text-white dark:shadow-white/10 dark:data-hover:bg-gray-700 dark:data-open:bg-gray-700"
			>
				{header}
			</MenuButton>

			<MenuItems
				transition
				anchor="bottom end"
				className="w-52 origin-top-right rounded-xl border bg-white p-1 text-sm/6 text-gray-900 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0
            border-gray-200 dark:border-white/5 dark:bg-white/5 dark:text-white"
			>
				{content.map((item, idx) => (
					<MenuItem key={`${item?.valueOf()}-${idx}`}>
						{({ active }: { active: boolean }) => (
							<div
								className={[
									"block w-full px-3 py-2 rounded-md text-left text-sm/6",
									active
										? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
										: "text-gray-900 dark:text-white",
								].join(" ")}
							>
								{item}
							</div>
						)}
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
}
