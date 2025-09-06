"use client";
import {
	Combobox as HeadlessCombobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Label,
	Description,
	Field,
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { useState, useRef } from "react";
import type { Item, ComboboxProps } from "./types";

const baseInput =
	"block w-full rounded-sm border-none bg-slate-950/5 dark:bg-white/5 px-3 py-1.5 text-sm/6 dark:text-white text-black";
const focusInput = "focus:outline-2 focus:outline-blue-500";

export function Combobox<T extends Item>({
	id,
	label,
	description,
	items,
	error,
	onValueChange,
	defaultValue,
	className,
	containerClassName,
	placeholder,
	disabled,
}: ComboboxProps<T>) {
	const [query, setQuery] = useState("");
  const comboboxRef = useRef<HTMLElement | null>(null);
	const inputClass = twMerge(
		baseInput,
		focusInput,
		error ? "outline-red-500 outline-1" : "",
		disabled ? "opacity-50 cursor-not-allowed" : "",
		className,
	);
	const filteredItems =
		query === ""
			? items
			: items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

	return (
		<HeadlessCombobox<T>
			defaultValue={defaultValue}
			onChange={(selectedItem: T | null) => {
				onValueChange(selectedItem);
				setQuery("");
			}}
      onClose={() => setQuery("")}
      immediate
      ref={comboboxRef}
		>
			<Field className={twMerge("flex flex-col gap-1", containerClassName)}>
				<div className="flex flex-col gap-0.5">
					{label && (
						<Label
							as="label"
							htmlFor={id}
							className="text-sm/6 font-medium text-black dark:text-zinc-200"
						>
							{label}
						</Label>
					)}
					{description && (
						<Description className="text-gray-600 dark:text-gray-400 text-sm">
							{description}
						</Description>
					)}
				</div>

				<div className="relative">
					<ComboboxInput
            onClick={() => comboboxRef.current?.focus()}
						id={id}
						as="input"
						className={inputClass}
						displayValue={(item: T | null) => (!defaultValue ? "" : item?.name || "")}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={placeholder}
						disabled={disabled}
					/>
					<ComboboxButton
						disabled={disabled}
						className="m-0.5 size-8 absolute inset-y-0 right-1 flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-gray-300 dark:hover:bg-zinc-700 focus-visible:ring-blue-500 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition cursor-pointer"
					>
						<ChevronDownIcon
							className="size-3 stroke-3 stroke-black dark:stroke-white"
							aria-hidden="true"
						/>
					</ComboboxButton>
				</div>
				<ComboboxOptions
					anchor="bottom"
					className="w-(--input-width) absolute right-0 origin-top-right rounded-md border bg-white p-1 text-sm/6 text-gray-900 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 border-gray-200 dark:border-white/5 dark:bg-zinc-700 dark:text-white z-50"
				>
					{filteredItems.length !== 0 ? (
						filteredItems.map((item) => (
							<ComboboxOption
								key={item.id}
								value={item}
								className="group w-full px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-zinc-600 flex items-center gap-2"
							>
								<CheckIcon className="invisible size-4 stroke-2 stroke-black dark:stroke-white group-data-selected:visible" />
								{item.name}
							</ComboboxOption>
						))
					) : (
						<span className="block p-2 text-gray-500">No results found.</span>
					)}
				</ComboboxOptions>

				{error && <Description className="text-red-500 text-xs">{error}</Description>}
			</Field>
		</HeadlessCombobox>
	);
}
