import { Title, Button, Text, IconButton } from "@shared/ui/components";
import { DarkModeButton } from "@/lib/features/Header/DarkModeButton";
import { Analytics, Hero } from "./_components";

export default function Home() {
	return (
		<main className="p-8">
			<Hero />
			<Analytics />
		</main>
	);
}
