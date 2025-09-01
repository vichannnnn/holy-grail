import { Title, Button, Text, IconButton } from "@shared/ui/components";
import { DarkModeButton } from "@/lib/features/Header/DarkModeButton";

export default function Home() {
	return (
		<main className="p-8">
			<Title>Welcome</Title>
			<Text className="mt-2">This is the new frontend home page.</Text>
			<div className="mt-4">
				<DarkModeButton />
			</div>
		</main>
	);
}
