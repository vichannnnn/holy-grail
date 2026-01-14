import { Analytics, Hero } from "./_components";
import { Showcase } from "@lib/features/client";

export default async function Home() {
	return (
		<main className="p-8">
			<Showcase
				imageUrl="https://image.himaa.me/TURIS_2026_1.png"
				altText="Turis VPN"
				redirectUrl="https://clickalytics.turisvpn.com/invite?url_id=holygrail"
			/>
			<Hero />
			<Analytics />
		</main>
	);
}
