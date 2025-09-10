import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Developer Panel - Holy Grail",
};

export default async function DeveloperPage() {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}
	if (!(user.role < RoleEnum.DEVELOPER)) {
		forbidden();
	}
	return <main>Developer Page</main>;
}
