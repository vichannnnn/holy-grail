import { Title, Text, FileDrop, type FileDropHandle } from "@shared/ui/components";
import { unauthorized } from "next/navigation";
import { getUser } from "@lib/auth";

export default async function UploadPage() {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}

	return (
		<main className="flex flex-col items-center mx-auto lg:w-2/3 w-5/6 ">
			<div className="flex flex-col items-center gap-2 mb-8">
				<Title order={1} className="font-bold text-center text-2xl">
					Upload Materials
				</Title>
				<Title order={2} className="text-center text-lg font-normal">
					Thanks for contributing to Holy Grail! Note that all uploads will be reviewed by the admin
					team before being published.
				</Title>
			</div>
		</main>
	);
}
