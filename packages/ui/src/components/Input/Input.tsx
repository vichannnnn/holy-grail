import { Field, Label, Input as HeadlessInput, Description } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import type { InputProps } from "./types";

const baseInput =
	"block w-full rounded-sm border-none bg-slate-950/5 dark:bg-white/5 px-3 py-1.5 text-sm/6 dark:text-white text-black";
const focusInput = "focus:outline-2 focus:outline-blue-500";

/**
 * Renders a styled form input with optional label, description, trailing icon, info button, and error message.
 *
 * @param label - Visible label text or element associated with the input
 * @param description - Supplemental description rendered under the label
 * @param error - Error message displayed below the input when present
 * @param id - HTML id used to link the label to the input
 * @param className - Additional class names applied to the input element
 * @param containerClassName - Additional class names applied to the outer container
 * @param icon - Element rendered inside the input on the right (non-interactive)
 * @param infoButton - Element rendered adjacent to the label (e.g., a help/info button)
 * @returns The rendered input component as a JSX element
 */
export function Input({
	label,
	description,
	error,
	id,
	className,
	containerClassName,
	icon,
    infoButton,
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
                            <div className="flex gap-x-0.5">
                                {label}
                                {infoButton}
                            </div>
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