import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import type { Metadata } from "next";
import { Text, Title } from "@shared/ui/components";
import { LibrarySearch } from "@/app/library/_components";
import type { NotesSearchParams } from "@/app/library/types";
import { fetchPendingApprovalNotes } from "./actions";
import { PAGE_MAX_SIZE } from "./constants";
import { AdminContent } from "./_components";
import { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects } from "@/app/library/actions";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
	title: "Administrator Panel - Holy Grail",
};

export default async function AdminPage({
	searchParams,
}: {
	searchParams: Readonly<Promise<NotesSearchParams>>;
}) {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}
	if (user.role < RoleEnum.ADMIN) {
		forbidden();
	}

	const query = { ...(await searchParams), size: PAGE_MAX_SIZE };
	const pendingNotesResponse = await fetchPendingApprovalNotes(query);
	const categories = await fetchAllCategories();
	const [documentTypes, subjects] = await Promise.all([
		fetchAllDocumentTypes(),
		fetchAllSubjects(
			query.category
				? Number(categories.data?.find((t) => t.name === query.category)?.id)
				: undefined,
		),
	]);
	return (
		<main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-2">
					<div className="p-2 rounded-xl bg-amber/10 dark:bg-amber/20">
						<ShieldCheckIcon className="size-6 text-amber" />
					</div>
					<Title className="font-bold text-2xl text-navy-deep dark:text-cream">
						Administrator Panel
					</Title>
				</div>
				<Text className="text-navy/70 dark:text-cream/60">
					Review and approve pending note submissions from contributors.
				</Text>
			</div>

			<div className="rounded-2xl border border-navy/5 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-cream/5 dark:bg-navy/30 md:p-6 mb-6">
				<Title order={3} className="mb-4 text-lg font-semibold text-navy-deep dark:text-cream">
					Filter Submissions
				</Title>
				<LibrarySearch
					query={query}
					allCategories={categories}
					allDocumentTypes={documentTypes}
					allSubjects={subjects}
				/>
			</div>

			<AdminContent {...pendingNotesResponse} />
		</main>
	);
}
