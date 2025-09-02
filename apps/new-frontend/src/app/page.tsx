import type { Metadata } from "next";
import { Analytics, Hero } from "./_components";

export const metadata: Metadata = {
	title: "Holy Grail",
	description: "Holy Grail - The platform for educational resources and community learning.",
	openGraph: {
		title: "Holy Grail",
		description:
			"Join Holy Grail to discover and share educational resources in our collaborative learning platform.",
		images: [
			{
				url: "",
			},
		],
		siteName: "Holy Grail",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Holy Grail",
		description:
			"Join Holy Grail to discover and share educational resources in our collaborative learning platform.",
		images: ["/images/twitter-card.jpg"],
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
	},
	metadataBase: new URL("https://grail.moe"),
	robots: {
		index: true,
		follow: true,
	},
};

export default function Home() {
	return (
		<main className="p-8">
			<Hero />
			<Analytics />
		</main>
	);
}
