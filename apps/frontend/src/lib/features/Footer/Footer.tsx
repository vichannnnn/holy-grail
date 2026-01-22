"use cache";
import { FooterLeft } from "./FooterLeft";
import { FooterRight } from "./FooterRight";
import Link from "next/link";
import { EMAIL_ADDRESS, TELEGRAM_LINK } from "./constants";

export async function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-16 border-t border-navy/10 bg-white/30 backdrop-blur-sm dark:border-cream/5 dark:bg-navy/20">
			<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-10 md:flex-row md:justify-between">
					<FooterLeft />
					<FooterRight />
				</div>

				<div className="mt-10 border-t border-navy/10 pt-6 dark:border-cream/10">
					<p className="text-sm text-navy/60 dark:text-cream/50">
						© 2023 - {currentYear} Holy Grail Team • Questions? Contact us at{" "}
						<Link
							href={`mailto:${EMAIL_ADDRESS}`}
							className="text-amber hover:underline transition-colors"
							prefetch={false}
							target="_blank"
						>
							{EMAIL_ADDRESS}
						</Link>
						, or join our{" "}
						<Link
							href={TELEGRAM_LINK}
							className="text-amber hover:underline transition-colors"
							prefetch={false}
							target="_blank"
						>
							Telegram channel
						</Link>
						!
					</p>
				</div>
			</div>
		</footer>
	);
}
