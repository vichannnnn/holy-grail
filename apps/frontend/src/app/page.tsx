import { LandingPage } from "@layouts/LandingPage";

import { generateDefaultMetadata } from "@utils/metadata";

export const generateMetadata = generateDefaultMetadata;

export default function Home() {
	return (
		<div className="flex min-h-screen">
			<LandingPage />
		</div>
	);
}
