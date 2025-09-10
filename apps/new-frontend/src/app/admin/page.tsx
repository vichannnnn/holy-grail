import { getUser, RoleEnum } from "@lib/auth";
import { forbidden, unauthorized } from "next/navigation";

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
