import Image from "next/image";
import { HeaderMiddle, HeaderRight, HeaderSearch, DarkModeButton } from "./_components";
import { getUser } from "@lib/auth";
import Link from "next/link";

export async function Header() {
	const user = await getUser();
	return (
		<div className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
			<header className="mx-auto max-w-7xl flex items-center gap-2 px-3 py-2 md:gap-4 md:px-6 md:py-3 bg-cream/80 dark:bg-navy-deep/80 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg shadow-navy/10 dark:shadow-black/20 border border-navy/5 dark:border-cream/5">
				<Link
					className="relative w-12 h-12 shrink-0 rounded-full transition-shadow hover:ring-2 hover:ring-amber/50"
					href="/"
				>
					<Image
						src="/grail-chan-happy-v1.webp"
						alt="Grail-chan"
						fill
						className="object-contain"
						priority
					/>
				</Link>
				<HeaderMiddle />
				<div className="flex-1 flex justify-end">
					<HeaderSearch />
				</div>
				<div className="flex gap-1 items-center">
					<HeaderRight user={user} />
					<DarkModeButton />
				</div>
			</header>
		</div>
	);
}
