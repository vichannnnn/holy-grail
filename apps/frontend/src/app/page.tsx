import { Analytics, ContributeCTA, Hero, SubjectCoverage } from "./_components";
import { Showcase } from "@lib/features/client";

export default async function Home() {
	return (
		<main>
			<div className="pt-4">
				<Showcase
					imageUrl="https://image.himaa.me/TURIS_2026_2.png"
					altText="Turis VPN"
					redirectUrl="https://clickalytics.turisvpn.com/invite?url_id=holygrail"
				/>
			</div>
			<Hero />
			<Analytics />
			<SubjectCoverage />
			<ContributeCTA />
		</main>
	);
}
