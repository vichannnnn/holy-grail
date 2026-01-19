import {
	Analytics,
	Hero,
	Features,
	MascotInterlude,
	ContributionCTA,
} from "./_components";
import { Showcase } from "@lib/features/client";

export default async function Home() {
	return (
		<main className="overflow-hidden">
			<Showcase
				imageUrl="https://image.himaa.me/TURIS_2026_1.png"
				altText="Turis VPN"
				redirectUrl="https://clickalytics.turisvpn.com/invite?url_id=holygrail"
			/>
			<Hero />
			<Features />
			<MascotInterlude />
			<Analytics />
			<ContributionCTA />
		</main>
	);
}
