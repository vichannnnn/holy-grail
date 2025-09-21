import { Title, Text } from "@shared/ui/components";
import { unauthorized } from "next/navigation";
import { getUser } from "@lib/auth";
import { fetchAllCategories, fetchAllDocumentTypes } from "@/app/library/actions";
import Image from "next/image";
import type { Metadata } from "next";
import { UploadWorkspace, UploadGuidelines } from "./_components";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Upload - Holy Grail",
	description:
		"Upload and share resources to the Holy Grail library. Contribute to our growing collection of educational materials and tools.",
	openGraph: {
		title: "Contribute Resources | Holy Grail",
		description:
			"Share your knowledge with the Holy Grail community. Upload educational resources, documents, and materials to help others and enhance our collaborative platform.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default async function UploadPage() {
	const user = await getUser();

	if (!user) {
		unauthorized();
	}

	if (!user.verified) {
		return (
			<main className="flex flex-col items-center w-5/6 mx-auto">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					Account Not Verified
				</Title>
				<Text>
					You need to verify your account before you can upload materials. Please check your email
					for the verification link, or go to{" "}
					<Link href="/account" className="underline hover:text-blue-500 transition-colors">
						Account Settings
					</Link>{" "}
					to resend the verification email.
				</Text>
			</main>
		);
	}

	const [categories, documentTypes] = await Promise.all([
		fetchAllCategories(),
		fetchAllDocumentTypes(),
	]);

	if (!categories.ok || !documentTypes.ok || !categories.data || !documentTypes.data) {
		return (
			<main className="flex flex-col items-center w-5/6 mx-auto">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					We ran into an issue :(
				</Title>
				<Text>We were unable to fetch some essential data for this page.</Text>
				<div className="mt-4">
					{categories.err && <Text>Categories: {categories.err}</Text>}
					{documentTypes.err && <Text>Document Types: {documentTypes.err}</Text>}
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col items-center mx-auto lg:w-3/4 w-11/12">
			<div className="flex flex-col items-center gap-2 mb-8">
				<Title order={1} className="font-bold text-center text-2xl">
					Upload Materials
				</Title>
				<Title order={2} className="text-center text-lg font-normal">
					Thanks for contributing to Holy Grail! Please review our{" "}
					<UploadGuidelines>uploading guidelines</UploadGuidelines> before uploading your documents.
				</Title>
			</div>

			<UploadWorkspace categories={categories.data} documentTypes={documentTypes.data} />
		</main>
	);
}
