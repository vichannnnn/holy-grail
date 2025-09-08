import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import type { AccordionProps } from "./types";

export function Accordion({
	label,
	children,
	className,
	buttonClassName,
	additionalButtons,
	panelClassName,
	iconClassName,
	defaultOpen = false,
}: AccordionProps) {
	return (
		<Disclosure
			as="div"
			className={twMerge("rounded-sm bg-gray-50 dark:bg-zinc-800/80", className)}
			defaultOpen={defaultOpen}
		>
			<DisclosureButton
				className={twMerge(
					"group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-100",
					buttonClassName,
				)}
			>
				<span className="select-none font-semibold">{label}</span>
				<div className="flex items-center gap-2">
					{additionalButtons}
					<ChevronDownIcon
						className={twMerge(
							"size-5 stroke-2 stroke-gray-700 dark:stroke-gray-300 transition-transform duration-200 group-data-[open]:rotate-180 cursor-pointer",
							iconClassName,
						)}
					/>
				</div>
			</DisclosureButton>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-150 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<DisclosurePanel
					className={twMerge("px-4 py-3 text-sm text-gray-700 dark:text-gray-300 ", panelClassName)}
				>
					{children}
				</DisclosurePanel>
			</Transition>
		</Disclosure>
	);
}
