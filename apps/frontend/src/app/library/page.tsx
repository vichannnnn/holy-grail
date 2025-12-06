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
import { PAGE_MAX_SIZE } from "./constants";
import { LibrarySearch, LibraryContent } from "./_components";
import type { Metadata } from "next";
import { getUserFavourites } from "@lib/features/Favourite/actions.ts";

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

export const revalidate = 60; /**
 * Render the Library page with search controls and note listings based on provided search parameters.
 *
 * @param searchParams - A promise that resolves to query parameters used to fetch notes, categories, document types, and subjects.
 * @returns The page's React element containing the hero/info section, a LibrarySearch component populated with fetched filters, and a LibraryContent component populated with fetched notes and the current user's favourites.
 */

export default async function LibraryPage({
	searchParams,
}: {
	searchParams: Promise<NotesSearchParams>;
}) {
	const query = await searchParams;
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
	const user = await getUser();

    let userFavouriteList: number[] | null;

    if (user?.role){
        const result = await getUserFavourites();
        if (result.ok){
            userFavouriteList = result.FavouriteFileList;
        }
        else{
            userFavouriteList = [];
        }
    }
    else{
        userFavouriteList = null;
    }

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
						href="https://t.me/+FlxeSKjMXIk2ZjA1"
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
			<LibrarySearch
				query={query}
				allCategories={categories}
				allDocumentTypes={documentTypes}
				allSubjects={subjects}
                adminPanel={false}
			/>
			<LibraryContent {...notesResponse} isAdmin={!!user?.role && user.role >= RoleEnum.ADMIN} favouriteList={userFavouriteList} />
		</main>
	);
}