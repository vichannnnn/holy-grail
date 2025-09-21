import { NAV_LINKS } from "./constants";
import { HeaderLink } from "./HeaderLink";

export function HeaderMiddle() {
	return (
		<div className="hidden sm:flex gap-6">
			{Object.entries(NAV_LINKS).map(([key, { label, href }]) => (
				<HeaderLink key={key} label={label} href={href} />
			))}
		</div>
	);
}
