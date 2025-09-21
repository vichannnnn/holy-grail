import Image from "next/image";
import { HeaderMiddle, HeaderRight, DarkModeButton } from "./_components";
import { getUser } from "@lib/auth";
import Link from "next/link";

export async function Header() {
	const user = await getUser();
	return (
		<header className="flex justify-between gap-6 py-4 px-8 items-center">
			<Link className="relative w-18 h-18 shrink" href="/">
				<Image
					src="/grail-chan-happy-v1.webp"
					alt="Grail-chan"
					fill
					className="object-contain"
					priority
				/>
			</Link>
			<HeaderMiddle />
			<div className="flex gap-1 items-center">
				<HeaderRight user={user} />
				<DarkModeButton />
			</div>
		</header>
	);
}
