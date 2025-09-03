import type { DropdownButtonProps } from "./types";

export function DropdownButton({ label, icon, ...rest }: DropdownButtonProps) {
	return (
		<div
			role="button"
			className="block w-full px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-zinc-600"
			{...rest}
		>
			<span className="inline-block mr-2 align-middle">{icon}</span>
			<span className="align-middle">{label}</span>
		</div>
	);
}
