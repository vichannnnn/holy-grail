import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import type { Metadata } from "next";
import { Text, Title } from "@shared/ui/components";
import { LibrarySearch } from "@/app/library/_components";
import type { NotesSearchParams } from "@/app/library/types";

export const metadata: Metadata = {
	title: "Administrator Panel - Holy Grail",
};

export default async function AdminPage({
	searchParams,
}: {
	searchParams: Promise<NotesSearchParams>;
}) {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}
	if (user.role < RoleEnum.ADMIN) {
		forbidden();
	}
	return (
		<main>
			<div className="flex flex-col m-auto w-5/6 sm:w-3/4 gap-2 my-8">
				<Title className="font-bold text-2xl">Administrator Panel</Title>
				<Text>
					This is a list of unapproved notes for your review, you can approve or delete them
					accordingly.
				</Text>
			</div>
		</main>
	);
}
