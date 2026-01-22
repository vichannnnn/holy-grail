import type { AccountSectionProps } from "./types";

export function AccountSection({
	title,
	icon,
	children,
}: Readonly<AccountSectionProps>) {
	return (
		<div className="rounded-2xl border border-navy/5 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-cream/5 dark:bg-navy/40">
			<div className="mb-4 flex items-center gap-2">
				<span className="text-amber">{icon}</span>
				<h2 className="text-lg font-semibold text-navy-deep dark:text-cream">{title}</h2>
			</div>
			{children}
		</div>
	);
}
