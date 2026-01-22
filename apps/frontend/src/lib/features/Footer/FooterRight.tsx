import { FooterLink } from "./FooterLink";

export function FooterRight() {
	return (
		<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-semibold uppercase tracking-wider text-navy-deep dark:text-cream">
					Information
				</h3>
				<div className="flex flex-col gap-2">
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
			</div>
			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-semibold uppercase tracking-wider text-navy-deep dark:text-cream">
					Legal
				</h3>
				<div className="flex flex-col gap-2">
					<FooterLink href="/privacy" label="Privacy Policy" />
					<FooterLink href="/terms-of-service" label="Terms of Service" />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-semibold uppercase tracking-wider text-navy-deep dark:text-cream">
					Contribute
				</h3>
				<div className="flex flex-col gap-2">
					<FooterLink href="/upload" label="Upload" />
					<FooterLink href="/leaderboard" label="Leaderboard" />
				</div>
			</div>
		</div>
	);
}
