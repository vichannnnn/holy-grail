import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import { Text, Title } from "@shared/ui/components";
import type { Metadata } from "next";
import { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects } from "@/app/library/actions";
import { fetchAllUsers } from "./actions";
import { DeveloperContent } from "./_components/DeveloperContent";

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

	const [categories, documentTypes, subjects, users] = await Promise.all([
		fetchAllCategories(),
		fetchAllDocumentTypes(),
		fetchAllSubjects(),
		fetchAllUsers(),
	]);

	return (
		<main>
			<div className="flex flex-col m-auto w-5/6 sm:w-3/4 gap-2 my-8">
				<Title className="font-bold text-2xl">Developer Panel</Title>
				<Text>
					Create or update subjects, education level (categories) and types of resources here.
					Additionally, you can update users' permissions here as well.
				</Text>
			</div>
			<DeveloperContent
				categories={categories}
				subjects={subjects}
				documentTypes={documentTypes}
				users={users}
			/>
		</main>
	);
}
