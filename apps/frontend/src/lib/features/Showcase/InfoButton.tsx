"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IconButton } from "@shared/ui/components";
import { Info } from "@phosphor-icons/react";

export function InfoButton() {
	return (
		<Popover className="absolute -top-1 -left-1 md:top-0.5 md:left-0">
			<PopoverButton
				as={IconButton}
				size="sm"
				className="bg-black/20 text-white hover:bg-black/30 dark:bg-white/20 dark:text-black dark:hover:bg-white/30"
				aria-label="Why am I seeing this ad?"
				onClick={(e) => e.stopPropagation()}
			>
				<Info className="size-4" />
			</PopoverButton>

			<PopoverPanel className="absolute z-10 w-80 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
				<div className="overflow-hidden rounded-lg shadow-lg">
					<div className="relative bg-white p-6 dark:bg-neutral-900">
						<div className="text-base font-medium text-gray-900 dark:text-white">
							Why am I seeing this ad?
						</div>
						<div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
							This is an advertisement from our sponsor to help with our hosting and infrastructure
							cost in keeping this project alive.
						</div>
					</div>
				</div>
			</PopoverPanel>
		</Popover>
	);
}
