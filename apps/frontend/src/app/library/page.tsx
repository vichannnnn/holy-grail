import { cache } from "react";
import { getUser, RoleEnum } from "@lib/auth";
import Link from "next/link";
import { Title, Text, Button } from "@shared/ui/components";
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
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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

const getContent = cache(async ({ query }: { query: NotesSearchParams }) => {
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
});

export default async function LibraryPage({
	searchParams,
}: {
	searchParams: Promise<NotesSearchParams>;
}) {
	const query = await searchParams;
	const { notesResponse, categories, documentTypes, subjects } = await getContent({ query });
	const user = await getUser();
	return (
		<main className="flex flex-col">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-4">
				<Showcase
					imageUrl="https://image.himaa.me/TURIS_2026_2.png"
					altText="Turis VPN"
					redirectUrl="https://clickalytics.turisvpn.com/invite?url_id=holygrail"
				/>
			</div>

			<section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
				<div className="rounded-2xl border border-navy/5 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-cream/5 dark:bg-navy/30 md:p-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
						<Title order={2} className="text-xl font-bold text-navy-deep dark:text-cream">
							Library
						</Title>
						<div className="flex flex-wrap items-center gap-3">
							{user ? (
								<Link href="/upload">
									<Button variant="outline" className="text-sm">
										<span>Contribute</span>
										<ArrowRightIcon className="ml-1.5 size-4" />
									</Button>
								</Link>
							) : (
								<Link href="/auth/sign-in">
									<Button variant="outline" className="text-sm">
										<span>Sign in to Contribute</span>
									</Button>
								</Link>
							)}
							<Link
								href={TELEGRAM_LINK}
								target="_blank"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-amber dark:text-cream/50 dark:hover:text-amber transition-colors"
							>
								<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
									<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
								</svg>
								<span>Telegram</span>
							</Link>
						</div>
					</div>
					<LibrarySearch
						query={query}
						allCategories={categories}
						allDocumentTypes={documentTypes}
						allSubjects={subjects}
					/>
				</div>
			</section>

			<section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
				<LibraryContent {...notesResponse} isAdmin={!!user?.role && user.role >= RoleEnum.ADMIN} />
			</section>
		</main>
	);
}
