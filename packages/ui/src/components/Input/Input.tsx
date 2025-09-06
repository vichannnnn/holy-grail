import { Field, Label, Input as HeadlessInput, Description } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { InputProps } from "./types";

const baseInput = "block w-full rounded-sm border-none bg-slate-950/5 dark:bg-white/5 px-3 py-1.5 text-sm/6 dark:text-white text-black";
const focusInput =
	"focus:outline-2 focus:outline-blue-500";

export function Input({
	label,
	description,
	error,
	id,
	className,
	containerClassName,
	icon,
	...rest
}: InputProps) {
	const inputClass = twMerge(
		baseInput,
		focusInput,
		error ? "outline-red-500 outline-1" : "",
		icon ? "pr-8" : "",
		className,
	);

	return (
		<div className={containerClassName}>
			<Field className="flex flex-col gap-1">
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
					<HeadlessInput id={id} as="input" className={inputClass} {...rest} />
					{icon && (
						<span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
							{icon}
						</span>
					)}
				</div>

				{error && <Description className="text-red-500 text-xs">{error}</Description>}
			</Field>
		</div>
	);
}
