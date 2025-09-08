import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import type { AccordionProps } from "./types";

export function Accordion({
	label,
	children,
	className,
	buttonClassName,
	panelClassName,
	iconClassName,
	defaultOpen = false,
}: AccordionProps) {
	return (
		<Disclosure
			as="div"
			className={twMerge("rounded-lg bg-gray-50 dark:bg-gray-800", className)}
			defaultOpen={defaultOpen}
		>
			<DisclosureButton
				className={twMerge(
					"group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-100",
					buttonClassName,
				)}
			>
				<span className="select-none">{label}</span>
				<ChevronDownIcon
					className={twMerge(
						"h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[open]:rotate-180",
						iconClassName,
					)}
				/>
			</DisclosureButton>
			<DisclosurePanel
				className={twMerge("px-4 py-3 text-sm text-gray-700 dark:text-gray-300 ", panelClassName)}
			>
				{children}
			</DisclosurePanel>
		</Disclosure>
	);
}
