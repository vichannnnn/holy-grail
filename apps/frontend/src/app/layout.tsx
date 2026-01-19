import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

import "./globals.css";
import { ClientProvider } from "@shared/ui/providers";
import { twMerge } from "tailwind-merge";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header, Footer } from "@lib/features/server";
import { TTFB, Showcase } from "@lib/features/client";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	style: ["normal", "italic"],
	variable: "--font-plus-jakarta",
	display: "swap",
});

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

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3197570153783512"
				crossOrigin="anonymous"
				strategy="lazyOnload"
			/>
			<body
				className={twMerge(
					"min-h-screen dark:bg-zinc-800 bg-zinc-100 transition-all",
					plusJakarta.variable,
				)}
			>
				<ClientProvider>
					<Header />

					{children}

					<Showcase
						imageUrl="https://image.himaa.me/TURIS_2026_1.png"
						altText="Turis VPN"
						redirectUrl="https://clickalytics.turisvpn.com/invite?url_id=holygrail"
					/>
					<Footer />
					<Toaster
						position="bottom-right"
						toastOptions={{
							className: "!bg-zinc-100 !text-zinc-900 dark:!bg-zinc-900 dark:!text-white",
						}}
					/>
				</ClientProvider>
				{process.env.PERF && <TTFB />}
			</body>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
		</html>
	);
}
