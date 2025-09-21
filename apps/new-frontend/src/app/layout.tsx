import type { Metadata } from "next";
import "./globals.css";
import { ClientProvider } from "@shared/ui/providers";
import { twMerge } from "tailwind-merge";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header, Footer } from "@lib/features/server";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const Showcase = dynamic(
	() => import("@lib/features/client").then((mod) => ({ default: mod.Showcase })),
	{
		loading: () => (
			<div className="w-3/4 md:w-1/2 mx-auto mt-4">
				<div className="animate-pulse">
					<div className="w-full h-[100px] bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
				</div>
			</div>
		),
	},
);

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"], // Correspond to: normal 400, medium 500, semibold 600, bold 700
	style: ["normal"],
	variable: "--font-plus-jakarta",
	preload: true,
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
				url: "/grail-chan-happy-v1.webp",
				width: 1200,
				height: 630,
				alt: "Holy Grail - Educational Resources Platform",
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
		images: ["/grail-chan-happy-v1.webp"],
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
					<Showcase />
					<Footer />
					<Toaster
						position="bottom-right"
						toastOptions={{
							className: "!bg-zinc-100 !text-zinc-900 dark:!bg-zinc-900 dark:!text-white",
						}}
					/>
				</ClientProvider>
			</body>
		</html>
	);
}
