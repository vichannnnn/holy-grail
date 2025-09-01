import { Footer } from "@layouts/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { ReactNode, Suspense } from "react";
import { Header } from "src/components/layouts/Header";

import "./globals.css";
import Loading from "./loading";

import { Providers } from "@providers/Providers";

const inter = Inter({ subsets: ["latin"] });

const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const metadata = {
	title: "Holy Grail",
	description:
		"Holy Grail is an online open-content collaborative depository for students from Singapore to share notes.",
	openGraph: {
		type: "website",
		url: "https://grail.moe",
		title: "Holy Grail",
		description:
			"Holy Grail is an online open-content collaborative depository for students from Singapore to share notes.",
		images: ["https://image.himaa.me/grail-chan-studying-v1.webp"],
	},
	themeColor: "#ffffff",
	viewport: "width=device-width, initial-scale=1.0",
	other: {
		"msapplication-TileColor": "#ffffff",
		"msapplication-TileImage": "/ms-icon-144x144.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<head>
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3197570153783512"
					crossOrigin="anonymous"
				></script>
				<title>Holy Grail</title>
			</head>
			<body className={inter.className}>
				<GoogleAnalytics gaId={NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
				<Providers>
					<Header />
					<Suspense fallback={<Loading />}>{children}</Suspense>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
