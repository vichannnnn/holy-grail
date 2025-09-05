import { getUser } from "@lib/auth";
import Link from "next/link";
import { Title, Text, Divider } from "@shared/ui/components";
import { LibraryContent } from "./_components/LibraryContent/LibraryContent";
import type { NotesSearchParams } from "./types";
import { fetchApprovedNotes } from "./actions";

export default async function LibraryPage({
	searchParams,
}: {
	searchParams: Promise<NotesSearchParams>;
}) {
	const query = await searchParams;
	const response = await fetchApprovedNotes(query);

	const user = await getUser();
	return (
		<main className="flex flex-col gap-12">
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
					<Link href="/upload" className="font-bold">
						here
					</Link>{" "}
					after you have logged in (subjected to approval of administrators).
				</Text>
				<div className="flex flex-col">
					<Text>Are you a tuition centre or freelance tutor looking to expand your reach?</Text>
					<Text>We have one of the largest student-focused audiences in Singapore.</Text>
					<Text>
						Interested sponsors and advertisers, please contact us at{" "}
						<span className="font-bold">grail@himaa.me</span> to explore partnership opportunities.
					</Text>
				</div>
			</div>
			<LibraryContent {...response} />
		</main>
	);
}
