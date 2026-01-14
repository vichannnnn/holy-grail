import { getUser, RoleEnum } from "@lib/auth";
import Link from "next/link";
import { Title, Text, Divider } from "@shared/ui/components";
import type { NotesSearchParams } from "./types";
import {
	fetchApprovedNotes,
	fetchAllCategories,
	fetchAllDocumentTypes,
	fetchAllSubjects,
} from "./actions";
import { PAGE_MAX_SIZE, TELEGRAM_LINK } from "./constants";
import { LibrarySearch, LibraryContent } from "./_components";
import { Showcase } from "@lib/features/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Library - Holy Grail",
	description:
		"Browse Holy Grail's comprehensive resource library. Access educational materials, guides, and resources organized by category and subject.",
	openGraph: {
		title: "Resource Library | Holy Grail",
		description:
			"Discover a wealth of knowledge in Holy Grail's library. Find curated educational resources, learning materials, and guides to enhance your experience.",
		images: [
			{
				url: "",
			},
		],
	},
};

async function getContent({ query }: { query: NotesSearchParams }) {
	"use cache: private";
	const notesResponse = await fetchApprovedNotes({ ...query, size: PAGE_MAX_SIZE });
	const categories = await fetchAllCategories();
	const [documentTypes, subjects] = await Promise.all([
		fetchAllDocumentTypes(),
		fetchAllSubjects(
			query.category
				? Number(categories.data?.find((t) => t.name === query.category)?.id)
				: undefined,
		),
	]);

	return { notesResponse, categories, documentTypes, subjects };
}

export default async function LibraryPage({
	searchParams,
}: {
	searchParams: Promise<NotesSearchParams>;
}) {
	const query = await searchParams;
	const { notesResponse, categories, documentTypes, subjects } = await getContent({ query });
	const user = await getUser();
	return (
		<main className="flex flex-col gap-8">
			<div className="flex flex-col gap-2 mx-6 md:mx-12 my-4">
				<Title order={1} className="font-bold text-3xl">
					Hello
					{user
						? ` ${user.username}, welcome back to the Holy Grail`
						: ", welcome to the Holy Grail"}
				</Title>
				<Title order={2} className="font-normal text-lg">
					A central repository for your revision materials, consolidated into a library.
				</Title>
				<Divider className="mx-1" />
				<Title order={2} className="font-bold">
					Library
				</Title>
				<Text>
					View materials or contribute{" "}
					<Link href="/upload" className="underline hover:text-blue-500 transition-colors">
						here
					</Link>{" "}
					after you have logged in (subjected to approval of administrators).
				</Text>
				<Text>
					Join our Telegram channel{" "}
					<Link
						href={TELEGRAM_LINK}
						className="underline hover:text-blue-500 transition-colors"
						prefetch={false}
						target="_blank"
					>
						{" "}
						here
					</Link>{" "}
					for the latest updates!
				</Text>
				<div className="flex flex-col">
					<Text>Are you a tuition centre or freelance tutor looking to expand your reach?</Text>
					<Text>We have one of the largest student-focused audiences in Singapore.</Text>
					<Text>
						Interested sponsors and advertisers, please contact us at{" "}
						<Link className="hover:underline" href="mailto:allthingsholygrail@gmail.com">
							allthingsholygrail@gmail.com
						</Link>{" "}
						to explore partnership opportunities.
					</Text>
				</div>
			</div>
			<Showcase
				imageUrl="https://image.himaa.me/TURIS_2026_1.png"
				altText="Turis VPN"
				redirectUrl="https://clickalytics.turisvpn.com/invite?url_id=holygrail"
			/>
			<LibrarySearch
				query={query}
				allCategories={categories}
				allDocumentTypes={documentTypes}
				allSubjects={subjects}
			/>
			<LibraryContent {...notesResponse} isAdmin={!!user?.role && user.role >= RoleEnum.ADMIN} />
		</main>
	);
}
