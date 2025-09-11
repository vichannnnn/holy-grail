import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import { Tabs, Text, Title } from "@shared/ui/components";
import type { Metadata } from "next";

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
	return (
		<main>
			<div className="flex flex-col m-auto w-5/6 sm:w-3/4 gap-2 my-8">
				<Title className="font-bold text-2xl">Developer Panel</Title>
				<Text>
					Create or update subjects, education level (categories) and types of resources here.
					Additionally, you can update users' permissions here as well.
				</Text>
			</div>
			<Tabs
				tabs={[
					{ name: "Tab 1", content: <div>Content for Tab 1</div> },
					{ name: "Tab 2", content: <div>Content for Tab 2</div> },
					{ name: "Tab 3", content: <div>Content for Tab 3</div> },
				]}
				defaultIndex={0}
			/>
		</main>
	);
}
