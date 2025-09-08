import { Title, Text } from "@shared/ui/components";
import { unauthorized } from "next/navigation";
import { getUser } from "@lib/auth";
import { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects } from "@/app/library/actions";
import Image from "next/image";
import type { Metadata } from "next";
import { UploadWorkspace } from "./_components";

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
	const [categories, documentTypes] = await Promise.all([
		fetchAllCategories(),
		fetchAllDocumentTypes(),
	]);

	if (!categories.ok || !documentTypes.ok || !categories.data || !documentTypes.data) {
		return (
			<main className="flex flex-col items-center">
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
		<main className="flex flex-col items-center mx-auto lg:w-2/3 w-11/12">
			<div className="flex flex-col items-center gap-2 mb-8">
				<Title order={1} className="font-bold text-center text-2xl">
					Upload Materials
				</Title>
				<Title order={2} className="text-center text-lg font-normal">
					Thanks for contributing to Holy Grail! Note that all uploads will be reviewed by the admin
					team before being published.
				</Title>
			</div>
			<UploadWorkspace
				fetchSubjects={fetchAllSubjects}
				categories={categories.data}
				documentTypes={documentTypes.data}
			/>
		</main>
	);
}
