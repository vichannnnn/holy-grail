import { Divider } from "@shared/ui/components";
import { FooterLeft } from "./FooterLeft";
import { FooterRight } from "./FooterRight";
import { Text } from "@shared/ui/components";

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
						© 2023 - {currentYear} Holy Grail Team • Questions? Contact us at allthingsholygrail@gmail.com
					</Text>
				</div>
			</footer>
		</div>
	);
}
