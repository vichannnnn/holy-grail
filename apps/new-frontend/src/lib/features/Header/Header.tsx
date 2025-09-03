import Image from "next/image";
import { DarkModeButton } from "./DarkModeButton";
import { HeaderLink } from "./HeaderLink";
import { NAV_LINKS } from "./constants";
import { HeaderDropdown } from "./HeaderDropdown";
import { AuthButtons } from "./AuthButtons";

export function Header() {
	return (
		<header className="flex justify-between gap-6 py-4 px-8 items-center">
			<div className="relative w-18 h-18 shrink">
				<Image
					src="/grail-chan-happy-v1.webp"
					alt="Grail-chan"
					fill
					className="object-contain"
					priority
				/>
			</div>
			<div className="hidden sm:flex gap-6">
				{Object.entries(NAV_LINKS).map(([key, { label, href }]) => (
					<HeaderLink key={key} label={label} href={href} />
				))}
			</div>
			<div className="flex gap-1 items-center">
				<div className="lg:hidden">
					<HeaderDropdown />
				</div>
				<div className="hidden lg:block">
					<AuthButtons />
				</div>
				<DarkModeButton />
			</div>
		</header>
	);
}
