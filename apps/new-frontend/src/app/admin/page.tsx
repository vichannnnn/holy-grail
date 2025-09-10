import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Administrator Panel - Holy Grail",
};

export default async function AdminPage() {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}
	if (!(user.role < RoleEnum.ADMIN)) {
		forbidden();
	}
	return <main>Admin Page</main>;
}
