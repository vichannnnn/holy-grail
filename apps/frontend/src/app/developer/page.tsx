import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import { Text, Title } from "@shared/ui/components";
import type { Metadata } from "next";
import { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects } from "@/app/library/actions";
import { DeveloperContent } from "./_components/DeveloperContent";
import { CommandLineIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
	title: "Developer Panel - Holy Grail",
};

export default async function DeveloperPage() {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}
	if (user.role < RoleEnum.DEVELOPER) {
		forbidden();
	}

	const [categories, documentTypes, subjects] = await Promise.all([
		fetchAllCategories(),
		fetchAllDocumentTypes(),
		fetchAllSubjects(),
	]);

	return (
		<main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-2">
					<div className="p-2 rounded-xl bg-coral/10 dark:bg-coral/20">
						<CommandLineIcon className="size-6 text-coral" />
					</div>
					<Title className="font-bold text-2xl text-navy-deep dark:text-cream">
						Developer Panel
					</Title>
				</div>
				<Text className="text-navy/70 dark:text-cream/60">
					Manage categories, subjects, document types, and user permissions.
				</Text>
			</div>

			<div className="rounded-2xl border border-navy/5 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-cream/5 dark:bg-navy/30 md:p-6">
				<DeveloperContent
					categories={categories}
					subjects={subjects}
					documentTypes={documentTypes}
				/>
			</div>
		</main>
	);
}
