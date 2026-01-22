import { NAV_LINKS } from "./constants";
import { HeaderLink } from "./HeaderLink";

export function HeaderMiddle() {
	return (
		<nav className="hidden md:flex gap-4" aria-label="Main navigation">
			{Object.entries(NAV_LINKS).map(([key, { label, href }]) => (
				<HeaderLink key={key} label={label} href={href} />
			))}
		</nav>
	);
}
