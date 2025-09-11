import { Analytics, Hero } from "./_components";
import { getUser } from "@lib/auth/getUser";

export default async function Home() {
	const user = await getUser();
	console.log("Current user:", user);
	return (
		<main className="p-8">
			<Hero />
			<Analytics />
		</main>
	);
}
