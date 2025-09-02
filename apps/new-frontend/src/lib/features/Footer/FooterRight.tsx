import { FooterLink } from "./FooterLink";
import { Text, Title } from "@shared/ui/components";

export function FooterRight() {
	//TODO: Need to turn this into 2x2 grid when in mobile
	return (
		<div className="flex flex-col md:mx-auto">
			<div className="md:flex grid grid-cols-2 gap-4 md:flex-row md:gap-12">
				<div className="flex flex-col gap-2">
					<Title order={3}>Information</Title>
					<FooterLink href="/" label="Home" />
					<FooterLink href="/library" label="Library" />
					<FooterLink href="/faq" label="FAQ" />
				</div>
				<div className="flex flex-col gap-2">
					<Title order={3}>Legal</Title>
					<FooterLink href="/privacy" label="Privacy Policy" />
					<FooterLink href="/terms-of-service" label="Terms of Service" />
				</div>
				<div className="flex flex-col gap-2">
					<Title order={3}>Contribute</Title>
					<FooterLink href="/upload" label="Upload" />
				</div>
			</div>
		</div>
	);
}
