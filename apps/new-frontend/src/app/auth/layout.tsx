import { getUser } from "@lib/auth/getUser";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const user = await getUser();

	if (user) redirect("/");

	return (
		<div className="flex flex-col md:flex-row w-full h-screen">
			<div className="hidden md:flex items-center justify-center md:h-screen md:w-1/2 dark:bg-zinc-700 bg-zinc-200">
				<Image src="/trimmy-grail-chan-studying.webp" alt="Logo" width={400} height={400} />
			</div>
			<div className="w-full md:w-1/2 flex justify-center items-center">{children}</div>
		</div>
	);
}
