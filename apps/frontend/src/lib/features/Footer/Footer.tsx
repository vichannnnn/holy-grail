"use cache";
import { Divider } from "@shared/ui/components";
import { FooterLeft } from "./FooterLeft";
import { FooterRight } from "./FooterRight";
import { Text } from "@shared/ui/components";
import Link from "next/link";
import { EMAIL_ADDRESS, TELEGRAM_LINK } from "./constants";

export async function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-5/6 flex flex-col mx-auto items-center mb-16 mt-8">
			<div className="flex flex-col md:flex-row gap-8 md:gap-2 w-full justify-between items-start">
				<FooterLeft />
				<FooterRight />
			</div>
			<div className="w-full mt-3">
				<Divider />
				<Text>
					© 2023 - {currentYear} Holy Grail Team • Questions? Contact us at{" "}
					<Link
						href={`mailto:${EMAIL_ADDRESS}`}
						className="underline hover:text-blue-500 transition-colors"
						prefetch={false}
						target="_blank"
					>
						{EMAIL_ADDRESS}
					</Link>
					, or join our{" "}
					<Link
						href={TELEGRAM_LINK}
						className="underline hover:text-blue-500 transition-colors"
						prefetch={false}
						target="_blank"
					>
						Telegram channel
					</Link>
					!
				</Text>
			</div>
		</footer>
	);
}
