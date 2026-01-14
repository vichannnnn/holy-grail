import Link from "next/link";
import { Text } from "@shared/ui/components";
import Image from "next/image";

export function FooterLeft() {
	return (
		<div className="flex flex-col gap-4">
			<Link href="/" passHref>
				<div className="relative w-24 h-24 shrink">
					<Image
						src="/grail-chan-happy-v1.webp"
						alt="Grail-chan"
						fill
						className="object-contain"
						priority
					/>
				</div>
			</Link>
			<div className="w-full max-w-md mt-4">
				<Text>
					Holy Grail is a completely free-to-access web library aimed at Singaporean students that
					houses all the summary notes and practice papers for GCE &apos;O&apos; Levels, GCE
					&apos;A&apos; Levels and International Baccalaureate.
				</Text>
			</div>
		</div>
	);
}
