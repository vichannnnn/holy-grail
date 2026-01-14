"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { TabsProps } from "./types";
import { twMerge } from "tailwind-merge";

export function Tabs({
	tabs,
	defaultIndex,
	onChange,
	className,
	tabClassName,
	tabPanelClassName,
	tabListClassName,
}: Readonly<TabsProps>) {
	return (
		<TabGroup
			defaultIndex={defaultIndex}
			onChange={onChange}
			as="div"
			className={twMerge("w-full", className)}
		>
			<TabList className="flex space-x-1 px-3 py-1 overflow-x-auto">
				{tabs.map((tab) => (
					<Tab
						key={tab.name}
						className={({ selected }) =>
							twMerge(
								"rounded-lg px-4 py-2 text-base/6 font-semibold ",
								"focus:ring-1 cursor-pointer whitespace-nowrap",
								selected
									? "ring-1 text-pink-600 dark:text-pink-400 ring-pink-400/30"
									: "hover:bg-white/[0.12] dark:hover:bg-neutral-800/[0.12] hover:text-pink-700 dark:hover:text-pink-300 text-neutral-900 dark:text-neutral-100",
								tabClassName,
							)
						}
					>
						{tab.name}
					</Tab>
				))}
			</TabList>
			<TabPanels className={twMerge("mt-2", tabListClassName)}>
				{tabs.map((tab) => (
					<TabPanel key={tab.name} className={twMerge("rounded-xl p-3", tabPanelClassName)}>
						{tab.content}
					</TabPanel>
				))}
			</TabPanels>
		</TabGroup>
	);
}
