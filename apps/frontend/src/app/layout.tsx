import type { Metadata } from "next";
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
						imageUrl="https://image.himaa.me/PALLO_1.png"
						altText="Pallo.ai"
						redirectUrl="https://pallo.ai/?utm_source=grail&utm_content=b1"
					/>
					<Showcase
						imageUrl="https://image.himaa.me/PALLO_2.png"
						altText="Pallo.ai"
						redirectUrl="https://pallo.ai/?utm_source=grail&utm_content=b2"
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
		</html>
	);
}
