import Link from "next/link";
import Image from "next/image";

export function FooterLeft() {
	return (
		<div className="flex flex-col gap-4 max-w-sm">
			<Link href="/" className="group inline-block">
				<div className="relative size-20">
					<div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber/20 to-coral/20 blur-lg opacity-0 transition-opacity group-hover:opacity-100" />
					<Image
						src="/grail-chan-happy-v1.webp"
						alt="Grail-chan"
						fill
						className="relative object-contain transition-transform group-hover:scale-105"
					/>
				</div>
			</Link>
			<p className="text-sm text-navy/70 dark:text-cream/60 leading-relaxed">
				Holy Grail is a completely free-to-access web library aimed at Singaporean students
				that houses all the summary notes and practice papers for GCE 'O' Levels, GCE 'A'
				Levels and International Baccalaureate.
			</p>
		</div>
	);
}
