import type { DropdownButtonProps } from "./types";

export function DropdownButton({ label, icon, ...rest }: DropdownButtonProps) {
	return (
		<button
			aria-label="Dropdown Button"
			className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-navy/80 hover:text-navy hover:bg-navy/5 dark:text-cream/80 dark:hover:text-cream dark:hover:bg-cream/5 text-left cursor-pointer transition-colors"
			tabIndex={0}
			{...rest}
		>
			<span className="text-navy/50 dark:text-cream/50">{icon}</span>
			<span className="font-medium">{label}</span>
		</button>
	);
}
