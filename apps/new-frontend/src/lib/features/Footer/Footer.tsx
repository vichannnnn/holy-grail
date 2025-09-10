import { Divider } from "@shared/ui/components";
import { FooterLeft } from "./FooterLeft";
import { FooterRight } from "./FooterRight";
import { Text } from "@shared/ui/components";
import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="mt-8">
			{/*<Showcase />*/}
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
							href="mailto:allthingsholygrail@gmail.com"
							className="underline hover:text-blue-500 transition-colors"
              prefetch={false}
              target="_blank"
						>
							allthingsholygrail@gmail.com
						</Link>
						, or join our{" "}
						<Link
							href="https://t.me/+FlxeSKjMXIk2ZjA1"
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
		</div>
	);
}
