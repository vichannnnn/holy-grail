import { Divider } from "@shared/ui/components";
import { FooterLeft } from "./FooterLeft";
import { FooterRight } from "./FooterRight";
import { Text } from "@shared/ui/components";
import Link from "next/link";
import { Showcase } from "@lib/features/Showcase";

/**
 * Render the website footer including a showcase banner, left and right footer sections, a divider, and contact links.
 *
 * @returns The footer JSX element containing the showcase, FooterLeft and FooterRight components, a divider, and contact links with the current year.
 */
export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="mt-8">
			<Showcase
				imageUrl="https://image.himaa.me/PALLO_2.png"
				altText="Pallo.ai"
				redirectUrl="https://pallo.ai/?utm_source=grail&utm_content=b2"
			/>
			<footer className="flex flex-col mx-auto items-center mb-16 mt-12 w-5/7">
				<div className="flex flex-col md:flex-row gap-8 md:gap-2 w-full justify-between items-center">
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