import { Field, Label, Input as HeadlessInput, Description } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { InputProps } from "./types";

const baseInput =
	"block w-full rounded-lg border border-navy/10 bg-white/50 dark:border-cream/10 dark:bg-navy/30 px-3 py-2 text-sm/6 text-navy dark:text-cream placeholder:text-navy/40 dark:placeholder:text-cream/40";
const focusInput = "focus:ring-2 focus:ring-amber/50 focus:border-amber focus:outline-none";

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
				<div className="flex flex-col gap-1">
					{label && (
						<Label
							as="label"
							htmlFor={id}
							className="text-sm/6 font-medium text-navy-deep dark:text-cream"
						>
							{label}
						</Label>
					)}
					{description && (
						<Description className="text-navy/60 dark:text-cream/50 text-sm">
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
