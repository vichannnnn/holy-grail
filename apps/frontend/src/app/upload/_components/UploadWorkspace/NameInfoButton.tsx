"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IconButton } from "@shared/ui/components";

/**
 * Renders an info button that opens a popover explaining the required naming convention.
 *
 * The trigger button prevents click event propagation so parent click handlers are not invoked.
 *
 * @returns A React element: an IconButton-triggered Popover containing a short text guiding the naming scheme (`[school] [year] [chapter title/paper component]`).
 */
export function NameInfoButton() {
    return (
        <Popover className="relative">
            <PopoverButton
                as={IconButton}
                size="sm"
                className="text-black dark:text-white "
                aria-label="Naming Convention"
                onClick={(e) => e.stopPropagation()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                </svg>
            </PopoverButton>

            <PopoverPanel className="absolute z-20 mb-1 md:mb-2 w-80 px-4 mt-3 transform bottom-full left-1/2 -translate-x-1/2 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <div className="relative bg-white p-6 dark:bg-neutral-900">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Try to adhere to the naming scheme: [school] [year] [chapter title/paper component].
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}