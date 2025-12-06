import { FooterLink } from "./FooterLink";
import { Title } from "@shared/ui/components";

/**
 * Render the right portion of the site footer with three labeled link groups: Information, Legal, and Contribute.
 *
 * The component arranges navigational links into titled sections and applies responsive layout classes for small and medium screens.
 *
 * @returns A JSX element containing the footer's right-side section with three titled groups of navigation links.
 */
export function FooterRight() {
	//TODO: Need to turn this into 2x2 grid when in mobile
	return (
		<div className="flex flex-col md:mx-5">
			<div className="md:flex grid grid-cols-2 gap-4 md:flex-row md:gap-12">
				<div className="flex flex-col gap-2">
					<Title order={3}>Information</Title>
					<FooterLink href="/" label="Home" />
					<FooterLink href="/library" label="Library" />
					<FooterLink href="/faq" label="FAQ" />
					<FooterLink
						href="https://drive.google.com/drive/u/0/folders/1gC6GQLgcuoHzwDXtEGzTwvzCz0YsYuwg"
						label="Google Drive"
						prefetch={false}
						target="_blank"
					/>
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