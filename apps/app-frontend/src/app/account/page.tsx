import { getUser } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
	const user = await getUser();

	if (!user) {
		redirect("/auth/sign-in");
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-2xl">
			<h1 className="text-3xl font-bold mb-6">Account</h1>
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
				<div className="space-y-4">
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
						<p className="font-medium">{user.email}</p>
					</div>
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
						<p className="font-medium">{user.username}</p>
					</div>
				</div>
			</div>
		</div>
	);
}